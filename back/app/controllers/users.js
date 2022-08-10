const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Users = db.users;
const Kids = db.kids;

// 비밀번호 암호화
const bcrypt = require("bcrypt");

// JWT 토큰
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_TIME = process.env.JWT_ACCESS_TIME;
const JWT_REFRESH_TIME = process.env.JWT_REFRESH_TIME;

// redis
const redisClient = require(path.join(__dirname, "..", "config", "redis"));

// 회원가입
// [post] /users/register
exports.user_regist = async function (req, res) {
  // User
  const user = {
    user_type: req.body.userType,
    user_email: req.body.userEmail,
    user_pw: req.body.userPw,
    user_name: req.body.userName,
    user_phone: req.body.userPhone ? req.body.userPhone : null,
    user_profile_url: req.body.userProfileUrl ? req.body.userProfileUrl : null,
  };

  await Users.create(user)
    .then((data) => {
      res.status(200).json({ message: "회원가입 완료" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "회원 가입 실패." });
    });
};

// 로그인
// [post] /users/login
exports.user_login = async function (req, res) {
  const userEmail = req.body.userEmail;
  const userPw = req.body.userPw;

  // 입력된 이메일로 사용자 찾기
  let user = await Users.findOne({ where: { user_email: userEmail } }).catch((err) => {
    res.status(500).json({ error: err.message, message: "잘못된 요청입니다." });
  });

  // 아이디가 있는 경우
  if (user) {
    // 입력 비밀번호와 DB에 저장된 비밀번호 비교
    const password_valid = await bcrypt.compare(userPw, user.user_pw).catch((err) => {
      res.status(500).json({ error: err.message, message: "비밀번호 비교 과정 중 문제 발생" });
    });

    // 로그인 성공
    if (password_valid) {
      user.user_pw = "";

      const access_token = jwt.sign(user.toJSON(), JWT_ACCESS_SECRET, {
        expiresIn: JWT_ACCESS_TIME,
      });
      const refresh_token = jwt.sign(user.toJSON(), JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_TIME,
      });

      // 헤더에 jwt 토큰 전송
      res.setHeader("Authorization", "Bearer " + access_token);

      // 갱신 토큰 redis에 저장
      redisClient.set(user.user_no.toString(), JSON.stringify({ token: refresh_token }));
      redisClient.expire(user.user_no.toString(), 604800); // 604800초 (7일) 후 redis에서 자동 삭제

      return res.status(200).json({
        logined: true,
        message: "로그인 성공",
        data: { user, token: { access_token, refresh_token } },
      });
    } else {
      // 비밀번호 틀린 경우
      res.status(500).json({ logined: false, message: "비밀번호 오류" });
    }
  } else {
    // 아이디가 없는 경우
    res.status(500).json({ logined: false, message: "아이디 없음" });
  }
};

// 토큰 검증(test) // TODO: 경로 설정 고민
// [get]  /users
exports.verify_token = function (req, res) {
  // *** front에서 Header에 입력할 값 ***
  // Authorization: Bearer [access token]
  return res.json({ logined: true, message: "로그인 되어 있음" });
};

// 토큰 갱신
// [post] /users/token
exports.refresh_token = function (req, res) {
  const user = req.body.user;

  console.log("토큰 갱신 사용자", user);
  const access_token = jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_TIME });
  const refresh_token = jwt.sign(user, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_TIME,
  });

  // 헤더에 jwt 토큰 전송
  res.setHeader("Authorization", "Bearer " + access_token);

  // 갱신 토큰 redis에 저장
  redisClient.set(user.user_no.toString(), JSON.stringify({ token: refresh_token }));
  redisClient.expire(user.user_no.toString(), 604800); // redis 키 TTL 갱신

  return res.status(200).json({
    logined: true,
    message: "로그인 성공",
    data: { user, token: { access_token, refresh_token } },
  });
};

// 로그아웃
// [get] /users/logout
// TODO: blacklist 관리 - logout 유저 관리
exports.user_logout = function (req, res) {
  console.log("[get] /users/logout (로그아웃)");

  // TODO: 토큰정보 지울때? ?
  // res.removeHeader("set-cookie");
  // res.removeHeader("Authorization");

  // 토큰 헤더에 작성했는지 확인 로그
  const header = req.headers.authorization;
  console.log("Header: ", header);

  return res.status(200).json({ logined: false, message: "로그아웃" });
};

// 회원 정보 조회
// [get] /users/:userNo
exports.user_detail = async function (req, res) {
  const userNo = req.params.userNo;

  // pk로 사용자 정보 조회
  await Users.findByPk(userNo, { attributes: { exclude: ["user_pw", "group_no", "center_no"] } })
    .then((data) => {
      if (data === null) {
        res.status(400).json({ message: "해당 사용자를 찾을 수 없습니다." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "사용자 정보 조회 과정에 문제 발생" });
    });
};

// 회원 정보 수정
// [put] /users/:userNo
exports.user_update = async function (req, res) {
  const userNo = req.params.userNo;
  const currentPw = req.body.currentPw;

  let user = await Users.findOne({ where: { user_no: userNo } }).catch((err) => {
    res.status(500).json({ error: err.message, message: "잘못된 요청입니다." });
  });

  // 아이디가 있는 경우
  if (user) {
    // 비밀번호가 일치하는지 확인
    const password_valid = await bcrypt.compare(currentPw, user.user_pw).catch((err) => {
      res.status(500).json({ error: err.message, message: "비밀번호 비교과정 중 문제 발생" });
    });
    // 비밀번호가 일치하는 경우
    if (password_valid) {
      const userPw = req.body.userPw;
      // 비밀번호도 변경한다면
      if (userPw) {
        user = {
          user_name: req.body.userName,
          user_pw: userPw,
          user_phone: req.body.userPhone ? req.body.userPhone : null,
          user_profile_url: req.body.userProfileUrl ? req.body.userProfileUrl : null,
        };
      }
      // 비밀번호는 변경 안함
      else {
        user = {
          user_name: req.body.userName,
          user_phone: req.body.userPhone ? req.body.userPhone : null,
          user_profile_url: req.body.userProfileUrl ? req.body.userProfileUrl : null,
        };
      }
      // 정보 수정
      await Users.update(user, { where: { user_no: userNo }, individualHooks: true })
        .then((result) => {
          if (result[0] === 1) {
            res.status(200).json({ message: "회원 정보 수정 완료." });
          } else {
            res.status(400).json({ message: "해당 회원을 찾을 수 없거나 데이터가 비어있음." });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message, message: "회원 정보 수정 실패." });
        });
    } else {
      res.status(400).json({ message: "비밀번호 입력 오류." });
    }
  } else {
    res.status(400).json({ message: "사용자를 찾을 수 없습니다." });
  }
};

// 회원 정보 삭제
// [delete] /users/:userNo
exports.user_remove = async function (req, res) {
  const userNo = req.params.userNo;

  await Users.destroy({ where: { user_no: userNo } })
    .then((result) => {
      if (result == 1) {
        res.status(200).json({ logined: false, message: "회원 탈퇴 완료" });
      } else {
        res.status(400).json({ message: "해당 회원을 찾을 수 없음." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "회원 탈퇴 실패." });
    });
};
