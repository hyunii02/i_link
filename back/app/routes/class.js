const express = require("express");
const router = express.Router();

const classController = require("../controllers/class");

// 반 등록
router.post("/register", classController.class_regist);

// 반 상세 조회
router.get("/:class_no", classController.class_detail);

// 반 목록 조회
router.get("/list/:preschool_no", classController.class_list);

// 반 정보 수정
router.put("/:class_no", classController.class_update);

// 반 삭제
router.delete("/:class_no", classController.class_remove);

module.exports = router;