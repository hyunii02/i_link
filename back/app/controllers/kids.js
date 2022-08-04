const path = require("path");

const db = require(path.join(__dirname, "..", "models"));

const Kids = db.kids;

// 자녀 등록
exports.kid_regist = function (req, res) {};

// 자녀 유치원 등록
exports.kid_center_regist = function (req, res) {};

// 반별 원생 목록 조회
exports.kid_class_list = function (req, res) {};

// 원생 조회
exports.kid_detail = function (req, res) {};

// 원생 수정
exports.kid_update = function (req, res) {};

// 원생 삭제
exports.kid_remove = function (req, res) {};
