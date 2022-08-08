const express = require("express");
const path = require("path");
const router = express.Router();

const reportController = require(path.join(__dirname, "..", "controllers", "reports"));

// 특이사항 등록
router.post("/register", reportController.report_regist);

// 특이사항 반별 목록 조회
router.get("/groups/:groupNo", reportController.report_groupList);

// 특이사항 개인 목록 조회
router.get("/list/:kidNo", reportController.report_kidList);

// 특이사항 조회
router.get("/:reportNo", reportController.report_detail);

// 특이사항 수정
router.put("/:reportNo", reportController.report_update);

// 특이사항 삭제
router.delete("/:reportNo", reportController.report_remove);

module.exports = router;