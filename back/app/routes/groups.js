const express = require("express");
const path = require("path");
const router = express.Router();

const groupController = require(path.join(__dirname, "..", "controllers", "group"));

// 반 등록
router.post("/register", groupController.group_regist);

// 반 상세 조회
router.get("/:group_no", groupController.group_detail);

// 반 목록 조회
router.get("/list/:center_no", groupController.group_list);

// 반 정보 수정
router.put("/:group_no", groupController.group_update);

// 반 삭제
router.delete("/:group_no", groupController.group_remove);

module.exports = router;