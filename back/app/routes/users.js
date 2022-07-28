const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

// 회원가입
router.post('/register', usersController.user_regist_post);

// 로그인
router.get("/login", usersController.user_login_get); // test용
router.post('/login', usersController.user_login_post);

// 로그아웃
router.get('/logout', usersController.user_logout_get);

// 회원 정보 조회
router.get('/:user_no', usersController.user_detail_get);

// 회원 정보 수정
router.put('/:user_no', usersController.user_update_put);

// 회원 탈퇴
router.delete('/:user_no', usersController.user_remove_delete);

module.exports = router;