const express = require("express");
const path = require("path");
const router = express.Router();

const memberController = require(path.join(__dirname, "..", "controllers", "members"));

// 멤버 관리 - 교사 (가입 승인 / 반 변경)
router.get("/manage/teacher/:centerNo", memberController.member_teacher_getList);
router.put("/manage/teacher/:centerNo", memberController.member_teacher_approve);
router.put("/remove/teacher", memberController.member_teacher_remove);

// 멤버 관리 - 원생 (가입 승인 / 반 변경)
router.get("/manage/kids/:centerNo", memberController.member_kid_getList);
router.put("/manage/kids/:centerNo", memberController.member_kid_approve);
router.put("/remove/kids", memberController.member_kid_remove);

// 유치원별 교사 목록 조회
router.get("/teacher/:centerNo", memberController.member_teacherList);

// 유치원별 원생 목록 조회
router.get("/kids/:centerNo", memberController.member_kidsList);

module.exports = router;
