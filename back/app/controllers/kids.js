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
      console.log("아이 등록 완료", data.dataValues);
      res.status(200).json({
        message: "아이 등록 완료",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "아이 등록 실패",
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
// [get]  /kids/list/:groupNo
exports.kid_class_list = async function (req, res) {
  const groupNo = req.params.groupNo;

  await Kids.findAll({
    attributes: ["kid_no", "kid_name", "kid_profile_url"], // 가져올 데이터 컬럼
    where: { group_no: groupNo },
    raw: true,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "목록 조회 과정에 문제 발생",
      });
    });
};

// 원생 조회
// [get] /kids/:kidNo
exports.kid_detail = async function (req, res) {
  const kidNo = req.params.kidNo;
  const kid = await Kids.findByPk(kidNo).catch((err) => {
    res.status(400).json({
      errormessage: err.message,
      message: "잘못된 요청입니다.",
    });
  });

  if (kid === null) {
    res.status(400).json({
      message: "사용자를 찾을 수 없습니다.",
    });
  } else {
    // 검색 성공
    res.status(200).json(kid);
  }
};

// 원생 수정
// [put]  /kids/:kidNo
exports.kid_update = async function (req, res) {
  const kidNo = req.params.kidNo;

  // 원생
  const kid = {
    kid_birth: req.body.kidBirth,
    kid_gender: req.body.kidGender,
    kid_profile_url: req.body.kidProfileUrl ? req.body.kidProfileUrl : null,
  };

  await Kids.update(kid, { where: { kid_no: kidNo } })
    .then((result) => {
      if (result[0] === 1) {
        res.status(200).json({
          message: "정보 수정 완료",
        });
      } else {
        // 수정 실패
        res.status(400).json({
          message: "요청 실패",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errormessage: err.message,
        message: "정보 수정 실패",
      });
    });
};

// 원생 삭제
// [delete] /kids/:kidNo
exports.kid_remove = async function (req, res) {
  const kidNo = req.params.kidNo;
  await Kids.destroy({ where: { kid_no: kidNo } })
    .then((result) => {
      if (result == 1) {
        // 삭제 완료
        res.status(200).json({
          message: "아이 정보 삭제 완료",
        });
      } else {
        // 삭제 실패
        res.status(400).json({
          message: "요청 실패",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errormessage: err.message,
        message: "삭제 실패",
      });
    });
};
