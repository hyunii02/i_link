const express = require("express");
const path = require("path");
const router = express.Router();

const auth = require(path.join(__dirname, "..", "utils", "auth"));
const userController = require(path.join(__dirname, "..", "controllers", "user"));

// 토큰 검증 test
router.get("/", userController.verify_token);

// 토큰 업데이트 test
router.post("/token", auth.verifyRefreshToken, userController.refresh_token);

// 회원가입
router.post("/register", userController.user_regist);

// 로그인
router.get("/login", userController.user_login_get); // test용
router.post("/login", userController.user_login_post);

// 로그아웃
router.get("/logout", userController.user_logout);

// 회원 정보 조회
router.get("/:user_no", userController.user_detail);

// 회원 정보 수정
router.put("/:user_no", userController.user_update);

// 회원 탈퇴
router.delete("/:user_no", userController.user_remove);

module.exports = router;