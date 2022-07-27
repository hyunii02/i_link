const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controllers");

router.get('/', usersController.user_get);

// 회원가입
router.get('/register', usersController.user_regist_get);
router.post('/register', usersController.user_regist_post);

// 로그인
router.get('/login', usersController.user_login_get);
router.post('/login', usersController.user_login_post);

// 로그아웃
router.get('/logout', usersController.user_logout_get);

// 회원 정보 조회
router.get('/:user_id', usersController.user_detail_get);

// 회원 탈퇴
router.delete('/:user_id', usersController.user_remove_delete);

// 회원 정보 수정
router.put('/:user_id', usersController.user_update_put);
router.get('/:user_id/edit', usersController.user_update_get);

module.exports = router;