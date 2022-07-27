const db = require("../config/db.config");
const users = require("../models/users.models");

// [get]  /users
exports.user_get = function (req, res, next) {
  console.log("[get] /users")
  const sqlSELECT = "SELECT * FROM users;";
  db.query(sqlSELECT, (error, result) => {
    if (error) console.log(error);
    else console.log(result);
  });
  res.send("[get] /users");
}

// [get]  /users/register
exports.user_regist_get = function (req, res, next) {
  console.log("[get] /users/register")
  res.send("[get] /users/register");
}

// [post] /users/register
exports.user_regist_post = function (req, res, next) {
  // const sqlINSERT = "INSERT INTO USERS(user_type, user_email, user_pw, user_name) VALUES (?, ?, ?, ?);";
  // db.query(sqlINSERT, (error, result) => {
  //   if (error) console.log(error);
  //   else console.log(result);
  // });
}


// 로그인 페이지
// [get]  /users/login
exports.user_login_get = function (req, res, next) { };

// [post] /users/login
exports.user_login_post = function (req, res, next) { };


// 로그아웃
// [get] /users/logout
exports.user_logout_get = function (req, res, next) { };


// 회원 정보 조회
// [get] /users/:user_id
exports.user_detail_get = function (req, res, next) { };


// 회원 정보 수정
// [get] /users/:user_id/edit
exports.user_update_get = function (req, res, next) { };
// [put] /users/:user_id
exports.user_update_put = function (req, res, next) { };


// 회원 정보 삭제
// [delete] /users/:user_id
exports.user_remove_delete = function (req, res, next) { };