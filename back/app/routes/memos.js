const express = require("express");
const path = require("path");
const router = express.Router();

const memosController = require(path.join(__dirname, "..", "controllers", "memos"));

// 알림장 작성
router.post("/register", memosController.memo_regist);

// 알림장 목록 조회
router.get("/:memo_no", memosController.memo_detail);

// 알림장 조회
router.get("/list/:group_no", memosController.memo_list);

// 알림장 수정
router.put("/:memo_no", memosController.memo_update);

// 알림장 삭제
router.delete("/:memo_no", memosController.memo_remove);

module.exports = router;
