const express = require("express");
const path = require("path");
const router = express.Router();

const centerController = require(path.join(__dirname, "..", "controllers", "center"));

// 유치원 등록
router.post("/register", centerController.center_regist);

// 유치원 목록 조회
router.get("/list", centerController.center_list);

// 유치원 상세 조회
router.get("/:center_no", centerController.center_detail);

// 유치원 정보 수정
router.put("/:center_no", centerController.center_update);

// 유치원 정보 삭제
router.delete("/:center_no", centerController.center_remove);

module.exports = router;