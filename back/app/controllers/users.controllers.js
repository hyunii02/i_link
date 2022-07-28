const db = require("../config/db.config");
const users = require("../models/users.models");

// 비밀번호 암호화
const bcrypt = require("bcrypt");
const saltRounds = 10;

// [get]  /users -> DB 연결 확인 위한 더미 페이지
exports.user_get = function (req, res) {
  console.log("[get] /users")
  const sqlSELECT = "SELECT * FROM users;";
  db.query(sqlSELECT, (error, result) => {
    if (error) console.log(error);
    else res.send(result);
  });
}

// 회원가입
// [get]  /users/register
exports.user_regist_get = function (req, res) {
  console.log("[get] /users/register (회원가입 페이지)")
  res.send("[get] /users/register (회원가입 페이지)");
}

// [post] /users/register
exports.user_regist_post = function (req, res) {

// *** Content-Type: application/json

  // 임시로 몇몇 값만 가져와서 테스트
  const userType = req.body.type;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userName = req.body.name;

  bcrypt.hash(userPassword, saltRounds, (err, hash) => {

    if (err) console.log(err);

    const sqlINSERT = "INSERT INTO users(user_type, user_email, user_pw, user_name) VALUES (?, ?, ?, ?);";

    db.query(sqlINSERT, [userType, userEmail, hash, userName], (error, result) => {
      if (error) console.log(error);
      else {
        console.log("회원 가입 완료");
        res.redirect("/users/login");
      }
    });

  });
}


// 로그인
// [get]  /users/login
exports.user_login_get = function (req, res) { 
  if (req.session.logined) {
    console.log("로그인 되어 있음");
    res.redirect("/");
  }
  else {
    console.log("[get] /users/login (로그인 페이지)");
    res.send("[get] /users/login (로그인 페이지)");
  }
};

// [post] /users/login
exports.user_login_post = function (req, res) {

  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const sqlSELECT = "SELECT * FROM users WHERE user_email = ?;";
  
  db.query(sqlSELECT, userEmail, (err, result) => {

    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) { // 아이디가 있는 경우
      bcrypt.compare(userPassword, result[0].user_pw, (error, response) => {
        if (response) { // 로그인 성공
          console.log("로그인 성공");

          req.session.logined = true;
          req.session.user_no = result[0].user_no;
          console.log(req.session.user_no);

          res.redirect("/");
        } else { // 로그인 실패
          res.send({ message: "비밀번호 다시 확인" });
        }
      });
    } else { // 아이디가 없는 경우
      res.send({ message: "존재하지 않는 사용자" });
    }
  });
  
};


// 로그아웃
// [get] /users/logout
exports.user_logout_get = function (req, res) { 
  console.log("[get] /users/logout (로그아웃)");

  // 쿠키 삭제
  console.log("logout - clear cookie");
  res.clearCookie('userid');
  res.clearCookie('username');

  // 세션 종료
  console.log("logout - destroy session");
  req.session.destroy();
  res.redirect("/");
};


// 회원 정보 조회
// [get] /users/:user_id
exports.user_detail_get = function (req, res) { 
  
  const userNo = req.session.user_no;
  const sqlSELECT = "SELECT user_type, user_email, user_name, user_phone, user_profile_url, class_no, preschool_no FROM users WHERE user_no = ?";
  
  db.query(sqlSELECT, userNo, (err, result) => {
    if (err) console.log(err);
    else {
      res.send(result);
    };
  });
  
};


// 회원 정보 수정
// [get] /users/:user_id/edit
exports.user_update_get = function (req, res) { 
  console.log("[get] /users/:user_id/edit (회원 정보 수정 페이지)");
  res.send("[get] /users/:user_id/edit");
};

// [put] /users/:user_id
exports.user_update_put = function (req, res, next) { 

};


// 회원 정보 삭제
// [delete] /users/:user_id
exports.user_remove_delete = function (req, res, next) { 

  const userNo = req.session.user_no;
  const sqlDELETE = "DELETE FROM users WHERE user_no = ?;";

  db.query(sqlDELETE, userNo, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("회원 탈퇴");
      res.redirect("/users/logout");
    }
  });
};