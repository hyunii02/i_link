const db = require("../config/db.config");
const users = require("../models/users.models");

// [get]  /users -> DB 연결 확인 위한 더미 페이지
exports.user_get = function (req, res, next) {
  console.log("[get] /users")
  const sqlSELECT = "SELECT * FROM users;";
  db.query(sqlSELECT, (error, result) => {
    if (error) console.log(error);
    else res.send(result);
  });
}

// [get]  /users/register
exports.user_regist_get = function (req, res, next) {
  console.log("[get] /users/register (회원가입 페이지)")
  res.send("[get] /users/register (회원가입 페이지)");
}

// [post] /users/register
exports.user_regist_post = function (req, res) {

  const userType = req.body.type;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userName = req.body.name;

  const sqlINSERT = "INSERT INTO users(user_type, user_email, user_pw, user_name) VALUES (?, ?, ?, ?);";

  db.query(sqlINSERT, [userType, userEmail, userPassword, userName], (error, result) => {
    if (error) console.log(error);

  });
}


// 로그인 페이지
// [get]  /users/login
exports.user_login_get = function (req, res) { 
  console.log("[get] /users/login (로그인 페이지)");
  res.send("[get] /users/login (로그인 페이지)");
};

// [post] /users/login
exports.user_login_post = function (req, res) {

  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const sqlSELECT = "SELECT * FROM users WHERE user_email = ? and user_pw = ?;";
  
  db.query(sqlSELECT, [userEmail, userPassword], (err, result) => {

  });
  
};


// 로그아웃
// [get] /users/logout
exports.user_logout_get = function (req, res) { 
  console.log("[get] /users/logout (로그아웃)");
  res.redirect('/');
};


// 회원 정보 조회
// [get] /users/:user_id
exports.user_detail_get = function (req, res) { 
  
  const userNo = 3; // 나중에 세션이나 뭐 가져올 값
  const sqlSELECT = "SELECT user_type, user_email, user_name, user_phone, user_profile_url, class_no, preschool_no FROM users WHERE user_no = ?";
  
  db.query(sqlSELECT, [userNo], (err, result) => {
    if (err) console.log(err);
    else {
      console.log("회원 번호: " + userNo);
      res.send(result);
    };
  });
  
};


// 회원 정보 수정
// [get] /users/:user_id/edit
exports.user_update_get = function (req, res, next) { 
  console.log("[get] /users/logout (회원 정보 수정 페이지)");
  res.send("[get] /users/logout");
};
// [put] /users/:user_id
exports.user_update_put = function (req, res, next) { };


// 회원 정보 삭제
// [delete] /users/:user_id
exports.user_remove_delete = function (req, res, next) { };