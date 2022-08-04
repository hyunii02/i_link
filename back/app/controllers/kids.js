const path = require("path");

const db = require(path.join(__dirname, "..", "models"));

const Kids = db.kids;

// 자녀 등록
// [post] /kids/register
exports.kid_regist = async function (req, res) {
  // *** Content-Type: application/json
  // 아이
  const kid = {
    kid_name: req.body.kidName,
    kid_birth: req.body.kidBirth ? req.body.kidBirth : null,
    kid_gender: req.body.kidGender ? req.body.kidGender : null,
    kid_profile_url: req.body.kidProfileUrl ? req.body.kidProfileUrl : null,
    parents_no: req.body.userNo, // front에서 input type: hidden
  };

  await Kids.create(kid)
    .then((data) => {
      console.log("자녀 등록 완료", data.dataValues);
      res.status(200).json({
        message: "자녀 등록 완료",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "자녀 등록 실패",
      });
    });
};

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
