const express = require("express");
const path = require("path");
const router = express.Router();
const auth = require(path.join(__dirname, "..", "utils", "auth"));

router.get("/", (req, res) => {
  res.send("[get] 메인 페이지");
});

// auth.verifyToken을 통해 유효한 토큰인지 검증 후, 유효하다면 다음 경로 이동 가능, 그렇지 않다면 이동 불가

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: 유저 CRUD
 */
router.use("/users", require(path.join(__dirname, "users")));

/**
 * @swagger
 * tags:
 *    name: Centers
 *    description: 유치원 CRUD
 */
router.use("/centers", auth.verifyToken, require(path.join(__dirname, "centers")));

/**
 * @swagger
 * tags:
 *    name: Groups
 *    description: 유치원-반 CRUD
 */
router.use("/groups", auth.verifyToken, require(path.join(__dirname, "groups")));

/**
 * @swagger
 * tags:
 *    name: Memos
 *    description: 알림장 CRUD
 */
router.use("/memos", auth.verifyToken, require(path.join(__dirname, "memos")));

/**
 * @swagger
 * tags:
 *    name: Kids
 *    description: 원생(자녀) CRUD
 */
router.use("/kids", auth.verifyToken, require(path.join(__dirname, "kids")));

/**
 * @swagger
 * tags:
 *    name: Meals
 *    description: 식단 CRUD
 */
router.use("/meals", auth.verifyToken, require(path.join(__dirname, "meals")));

/**
 * @swagger
 * tags:
 *    name: Members
 *    description: 멤버관리 CRUD
 */
router.use("/members", auth.verifyToken, require(path.join(__dirname, "members")));

/**
 * @swagger
 * tags:
 *    name: Surveys
 *    description: 키즈 설문 CRUD
 */
router.use("/surveys", auth.verifyToken, require(path.join(__dirname, "surveys")));

/**
 * @swagger
 * tags:
 *    name: Reports
 *    description: 특이사항 CRUD
 */
router.use("/reports", auth.verifyToken, require(path.join(__dirname, "reports")));

/**
 * @swagger
 * tags:
 *    name: Notices
 *    description: 공지사항 CRUD
 */
router.use("/notices", auth.verifyToken, require(path.join(__dirname, "notices")));

/**
 * @swagger
 * tags:
 *    name: Quiz
 *    description: 퀴즈 CRUD
 */
router.use("/quiz", auth.verifyToken, require(path.join(__dirname, "quiz")));

/**
 * @swagger
 * tags:
 *    name: Stamps
 *    description: 칭찬도장 관리
 */
router.use("/stamps", auth.verifyToken, require(path.join(__dirname, "stamps")));

module.exports = router;
