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

router.use("/kids", require(path.join(__dirname, "kids")));

module.exports = router;
