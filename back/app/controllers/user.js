const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Users = db.users;

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
exports.user_regist = function (req, res) {

// *** Content-Type: application/json

  // User
  const user = {
    user_type: req.body.userType,
    user_email: req.body.userEmail,
    user_pw: req.body.userPw,
    user_name: req.body.userName,
    user_phone: req.body.userPhone ? req.body.userPhone : null,
    user_profile_url: req.body.userProfileUrl ? req.body.userProfileUrl : null,
    group_no: req.body.groupNo ? req.body.groupNo : null,
    center_no: req.body.centerNo ? req.body.centerNo : null,
  }

  Users.create(user)
    .then(data => {
      console.log("회원가입 완료");
      res.send(data);
    })
    .catch(err => {
      res.status(400).json({
        errormessage: err.message,
        message: "회원 가입 실패."
      });
    });
}


// 로그인
// [get]  /users/login
exports.user_login_get = function (req, res) { 
    res.send("[get] /user/login (로그인 페이지)");
}


// [post] /users/login
exports.user_login_post = async function (req, res) {

  const userEmail = req.body.userEmail;
  const userPw = req.body.userPw;

  // 입력된 이메일로 사용자 찾기
  const user = await Users.findOne({ where: { user_email: userEmail } })
                      .catch(err => {
                        res.status(400).json({
                          errormessage: err.message,
                          message: "잘못된 요청입니다."
                        });
                      });

  if (user) { // 아이디가 있는 경우

    // 입력 비밀번호와 DB에 저장된 비밀번호 비교
    const password_valid = await bcrypt.compare(userPw, user.user_pw);

    if (password_valid) { // 로그인 성공

      user.user_pw = "";
      const access_token = jwt.sign({ userNo: user.user_no }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_TIME });
      const refresh_token = GenerateRefreshToken(user.user_no);

      req.session.logined = true; // 로그인 상태
      req.session.user = {
        userNo: user.user_no,
        userName: user.user_name,
        userType: user.user_type,
      }

      console.log("로그인 유저 번호: " + req.session.user.userNo);
      return res.status(200).json({
        logined: true,
        message: "로그인 성공",
        data: { user, access_token, refresh_token }
      });
      

    }
    else { // 로그인 실패
      res.status(400).json({ message: "비밀번호 오류" }); 
    }
  }
  else { // 아이디가 없는 경우
    res.status(400).json({ message: "아이디 없음" });
  }
}


exports.verify_token = function (req, res) {
  return res.json({ logined: true, message: "로그인 되어 있음" });
}


exports.refresh_token = function (req, res) {
  const user = req.body.user;
  const access_token = jwt.sign({ userNo: user.userNo, }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_TIME });
  const refresh_token = GenerateRefreshToken(user.userNo);

  return res.json({
    logined: true,
    message: "로그인 성공",
    data: { user, access_token, refresh_token }
  });
      
}


function GenerateRefreshToken(userNo) {
  const refresh_token = jwt.sign({ userNo: userNo,}, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_TIME });
      
  redisClient.get(userNo.toString(), (err, data) => {
    if (err) throw err;
    redisClient.set(userNo, JSON.stringify({ token: refresh_token }));
  });

  return refresh_token;
}


// 로그아웃
// [get] /users/logout
exports.user_logout = async function (req, res) { 
  console.log("[get] /users/logout (로그아웃)");

  // 쿠키 삭제
  res.clearCookie("connect.sid");

  // 세션 종료
  req.session.destroy();

  const userNo = req.body.userNo;

  await redisClient.del(userNo.toString())
    .then(() => {
      console.log("토큰 삭제");
    })
    .catch((err) => {
      console.log(err);
    });
  return res.json({ logined: false, message: "로그아웃" });
};


// 회원 정보 조회
// [get] /users/:user_no
exports.user_detail = async function (req, res) { 

  const userNo = req.params.user_no;

  // pk로 사용자 정보 조회
  const user = await Users.findByPk(userNo)
    .catch(err => {
    res.status(400).json({
      errormessage: err.message,
      message: "잘못된 요청입니다."
    });
  });

  if (user === null) {
    console.log("사용자를 찾을 수 없습니다.");
  } else {
    user.user_pw = ""; // 사용자 패스워드는 가져오지 않음
    console.log(user);
    res.send(user);
  }
};


// 회원 정보 수정
// [put] /users/:user_no
exports.user_update = async function (req, res) { 

  const userNo = req.params.user_no;

  // User
  const user = {
    user_type: req.body.userType,
    user_email: req.body.userEmail,
    user_pw: req.body.userPw,
    user_name: req.body.userName,
    user_phone: req.body.userPhone ? req.body.userPhone : null,
    user_profile_url: req.body.userProfileUrl ? req.body.userProfileUrl : null,
    group_no: req.body.groupNo ? req.body.groupNo : null,
    center_no: req.body.centerNo ? req.body.centerNo : null,
  }
  
  await Users.update(user, { where: { user_no: userNo }, individualHooks: true })
    .then(result => {
      if (result[0] === 1) { // 수정 완료
        console.log("회원 수정 완료");
        res.redirect("/users/logout"); // 재로그인
      } else { // 수정 실패
        res.send({
          message: "회원을 찾을 수 없거나 데이터가 비어있음"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        errormessage: err.message,
        message: "회원 수정 실패."
      });
    });
};


// 회원 정보 삭제
// [delete] /users/:user_no
exports.user_remove = async function (req, res) {

  const userNo = req.params.user_no;

  await Users.destroy({ where: { user_no: userNo } })
    .then(result => {
      if (result == 1) { // 삭제 완료
        console.log("회원 탈퇴 완료");
        res.redirect("/users/logout");
      } else { // 삭제 실패
        res.send({
          message: "해당 회원을 찾을 수 없습니다."
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        errormessage: err.message,
        message: "회원 탈퇴 실패."
      });
    });
}