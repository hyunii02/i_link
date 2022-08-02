const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Users = db.users;

// 비밀번호 암호화
const bcrypt = require("bcrypt");

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
      res.status(500).send({
        message: err.message || "회원가입 실패"
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
  const user = await Users.findOne({ where: { user_email: userEmail } });

  if (user) { // 아이디가 있는 경우

    // 입력 비밀번호와 DB에 저장된 비밀번호 비교
    const password_valid = await bcrypt.compare(userPw, user.user_pw);

    if (password_valid) { // 로그인 성공
      req.session.logined = true; // 로그인 상태
      req.session.userNo = user.user_no; // 로그인 유저

      console.log("로그인 유저 번호: " + req.session.userNo);
      res.redirect("/");
    }
    else { // 로그인 실패
      res.send({ message: "비밀번호 오류" });
    }
  }
  else { // 아이디가 없는 경우
    res.send({ message: "존재하지 않는 사용자" });
  }
}


// 로그아웃
// [get] /users/logout
exports.user_logout = function (req, res) { 
  console.log("[get] /users/logout (로그아웃)");

  // 쿠키 삭제
  res.clearCookie("connect.sid");

  // 세션 종료
  req.session.destroy();
  res.redirect("/");
};


// 회원 정보 조회
// [get] /users/:user_no
exports.user_detail = async function (req, res) { 

  const userNo = req.params.user_no;

  // pk로 사용자 정보 조회
  const user = await Users.findByPk(userNo);

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
  
  Users.update(user, { where: { user_no: userNo }, individualHooks: true })
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
      res.status(500).send({
        message: "회원 수정 실패"
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
      res.status(500).send({
        message: "회원 탈퇴 실패"
      });
    });
}