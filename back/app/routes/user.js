const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// 회원가입
router.post("/register", userController.user_regist);

// 로그인
router.get("/login", userController.user_login_get); // test용
router.post("/login", userController.user_login_post);

// 로그아웃
router.get("/logout", userController.user_logout);

// 회원 정보 조회
router.get("/:no", userController.user_detail);

// 회원 정보 수정
router.put("/:no", userController.user_update);

// 회원 탈퇴
router.delete("/:no", userController.user_remove);

module.exports = router;