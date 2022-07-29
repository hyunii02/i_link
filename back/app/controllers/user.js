const db = require("../models");
const User = db.users;

// 비밀번호 암호화
const bcrypt = require("bcrypt");

// 회원가입
// [post] /user/register
exports.user_regist_post = function (req, res) {

// *** Content-Type: application/json

  // User
  const user = {
    user_type: req.body.userType,
    user_email: req.body.userEmail,
    user_pw: req.body.userPw,
    user_name: req.body.userName,
    user_phone: req.body.userPhone ? req.body.userPhone : null,
    user_profile_url: req.body.userProfileUrl ? req.body.userProfileUrl : null,
    class_no: req.body.classNo ? req.body.classNo : null,
    preschool_no: req.body.preschoolNo ? req.body.preschoolNo : null,
  }

  User.create(user)
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
// [get]  /user/login
exports.user_login_get = function (req, res) { 
  if (req.session.logined) {
    console.log("로그인 되어 있음");
    res.redirect("/");
  }
  else {
    console.log("[get] /user/login (로그인 페이지)");
    res.send("[get] /user/login (로그인 페이지)");
  }
};

// [post] /user/login
exports.user_login_post = async function (req, res) {

  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPw;

  // 입력된 이메일로 사용자 찾기
  const user = await User.findOne({ where: { user_email: userEmail } });

  if (user) { // 아이디가 있는 경우

    // 입력 비밀번호와 DB에 저장된 비밀번호 비교
    const password_valid = await bcrypt.compare(userPassword, user.user_pw);

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
};


// 로그아웃
// [get] /user/logout
exports.user_logout_get = function (req, res) { 
  console.log("[get] /user/logout (로그아웃)");

  // 쿠키 삭제
  res.clearCookie("connect.sid");

  // 세션 종료
  req.session.destroy();
  res.redirect("/");
};


// 회원 정보 조회
// [get] /user/:no
exports.user_detail_get = async function (req, res) { 

  const userNo = req.params.no;

  // pk로 사용자 정보 조회
  const user = await User.findByPk(userNo);

  if (user === null) {
    console.log("사용자를 찾을 수 없습니다.");
  } else {
    console.log(user);
    res.send(user);
  }
};


// 회원 정보 수정
// [put] /user/:no
exports.user_update_put = function (req, res, next) { 

  const userNo = req.params.no;

  // User
  const user = {
    user_type: req.body.userType,
    user_email: req.body.userEmail,
    user_pw: req.body.userPw,
    user_name: req.body.userName,
    user_phone: req.body.userPhone ? req.body.userPhone : null,
    user_profile_url: req.body.userProfileUrl ? req.body.userProfileUrl : null,
    class_no: req.body.classNo ? req.body.classNo : null,
    preschool_no: req.body.preschoolNo ? req.body.preschoolNo : null,
  }
  
  User.update(user, { where: { user_no: userNo }, individualHooks: true })
    .then(result => {
      if (result[0] === 1) { // 수정 완료
        console.log("회원 수정 완료");
        res.redirect("/user/logout"); // 재로그인
      } else { // 수정 실패
        res.send({
          message: "회원을 찾을 수 없거나 데이터가 데이터가 비어있음"
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
// [delete] /user/:no
exports.user_remove_delete = function (req, res, next) {

  const userNo = req.params.no;

  User.destroy({ where: { user_no: userNo } })
    .then(result => {
      if (result == 1) { // 삭제 완료
        console.log("회원 탈퇴 완료");
        res.redirect("/user/logout");
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