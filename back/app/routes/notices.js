const express = require("express");
const path = require("path");
const router = express.Router();

const noticeController = require(path.join(__dirname, "..", "controllers", "notices"));

// 공지사항 등록
router.post("/register", noticeController.notice_regist);

// 공지사항 목록 조회
router.get("/list/:centerNo", noticeController.notice_list);

// 공지사항 조회
router.get("/:noticeNo", noticeController.notice_detail);

// 공지사항 수정
router.put("/:noticeNo", noticeController.notice_update);

// 공지사항 삭제
router.delete("/:noticeNo", noticeController.notice_remove);

module.exports = router;
