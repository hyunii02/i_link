const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("[get] 메인 페이지");
});

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
router.use("/centers", require(path.join(__dirname, "centers")));
/**
 * @swagger
 * tags:
 *    name: Groups
 *    description: 유치원-반 CRUD
 */
router.use("/groups", require(path.join(__dirname, "groups")));
/**
 * @swagger
 * tags:
 *    name: Memos
 *    description: 알림장 CRUD
 */
router.use("/memos", require(path.join(__dirname, "memos")));
/**
 * @swagger
 * tags:
 *    name: Kids
 *    description: 원생(자녀) CRUD
 */
router.use("/kids", require(path.join(__dirname, "kids")));
/**
 * @swagger
 * tags:
 *    name: Meals
 *    description: 식단 CRUD
 */
router.use("/meals", require(path.join(__dirname, "meals")));
/**
 * @swagger
 * tags:
 *    name: Members
 *    description: 멤버관리 CRUD
 */
router.use("/members", require(path.join(__dirname, "members")));

/**
 * @swagger
 * tags:
 *    name: Surveys
 *    description: 키즈 설문 CRUD
 */
router.use("/surveys", require(path.join(__dirname, "surveys")));

/**
 * @swagger
 * tags:
 *    name: Reports
 *    description: 특이사항 CRUD
 */
router.use("/reports", require(path.join(__dirname, "reports")));

/**
 * @swagger
 * tags:
 *    name: Notices
 *    description: 공지사항 CRUD
 */
router.use("/notices", require(path.join(__dirname, "notices")));
/**
 * @swagger
 * tags:
 *    name: Quiz
 *    description: 퀴즈 CRUD
 */
router.use("/quiz", require(path.join(__dirname, "quiz")));

module.exports = router;
