const path = require("path");
const fs = require("fs");

const db = require(path.join(__dirname, "..", "models"));

const Kids = db.kids;

// 아이 칭찬도장 찍어주기 ( + 1 )
// [put] /stamps/stamping
exports.stamp_stamping = async function (req, res) {
  const kidNo = req.body.kidNo;

  // 아이 정보 받아오기
  const kid = await Kids.findByPk(kidNo).catch((err) => {
    res.status(500).json({
      error: err.message,
      message: "아이 정보 조회 실패",
    });
  });

  await Kids.update({ kid_stamp: kid.kid_stamp + 1 }, { where: { kid_no: kidNo } })
    .then((result) => {
      // 칭찬도장 찍어주기 성공
      res.status(200).json({
        message: "칭찬도장 + 1",
      });
    })
    .catch((err) => {
      res.status(500).json({
        errMessage: err.message,
        message: "칭찬 도장 찍기 실패",
      });
    });
};

// 아이 칭찬도장 수정
// [put] /stamps/:kidNo
exports.stamp_update = async function (req, res) {
  const kidNo = req.params.kidNo;

  // request body : kidStamp

  await Kids.update({ kid_stamp: req.body.kidStamp }, { where: { kid_no: kidNo } })
    .then((result) => {
      res.status(200).json({
        message: "칭찬 도장 수정 완료",
      });
    })
    .catch((err) => {
      res.status(500).json({
        errMessage: err.message,
        message: "칭찬 도장 수정 실패",
      });
    });
};
