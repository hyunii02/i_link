const express = require("express");
const path = require("path");
const router = express.Router();

const kidsController = require(path.join(__dirname, "..", "controllers", "kids"));

// 자녀 등록
router.post("/register", kidsController.kid_regist);

// 자녀 유치원 등록
router.put("/register", kidsController.kid_center_regist);

// 반별 원생 목록 조회
router.get("/list/:groupNo", kidsController.kid_class_list);

// 원생 조회
router.get("/:kidNo", kidsController.kid_detail);

// 원생 수정
router.put("/:kidNo", kidsController.kid_update);

// 원생 삭제
router.delete("/:kidNo", kidsController.kid_remove);

module.exports = router;
