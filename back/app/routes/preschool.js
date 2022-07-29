const express = require("express");
const router = express.Router();

const preschoolController = require("../controllers/preschool");

// 유치원 등록
router.post("/register", preschoolController.preschool_regist);

// 유치원 목록 조회
router.get("/list", preschoolController.preschool_list);

// 유치원 상세 조회
router.get("/:no", preschoolController.preschool_detail);

// 유치원 정보 수정
router.put("/:no", preschoolController.preschool_update);

// 유치원 정보 삭제
router.delete("/:no", preschoolController.preschool_remove);

module.exports = router;