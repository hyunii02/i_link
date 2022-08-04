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
// [put] /kids/register
exports.kid_center_regist = async function (req, res) {
  const kidNo = req.body.kidNo;

  // 검색해서 나온 유치원 번호
  const centerNo = req.body.centerNo;

  await Kids.update({ center_no: centerNo }, { where: { kid_no: kidNo } })
    .then((result) => {
      if (result[0] === 1) {
        // 유치원 등록 완료
        res.status(200).json({ message: "유치원 등록 완료, 승인 대기 상태" });
        // 승인 구분: 원생의 유치원은 등록되어 있으나 반이 등록되어 있지 않다면 승인 대기 상태임.
      } else {
        // 유치원 등록 실패
        res.status(400).json({
          message: "요청 오류 발생",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "유치원 등록 실패",
      });
    });
};

// 반별 원생 목록 조회
exports.kid_class_list = function (req, res) {};

// 원생 조회
exports.kid_detail = function (req, res) {};

// 원생 수정
exports.kid_update = function (req, res) {};

// 원생 삭제
exports.kid_remove = function (req, res) {};
