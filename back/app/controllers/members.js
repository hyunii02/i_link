const path = require("path");

const db = require(path.join(__dirname, "..", "models"));

const Users = db.users;
const Kids = db.kids;
const Op = db.Sequelize.Op; // 검색을 위한 객체

// 승인 대기중인 교사 목록
// [get]  /members/manage/teacher/:centerNo
exports.member_teacher_getList = async function (req, res) {
  const centerNo = req.params.centerNo;

  await Users.findAll({
    attributes: ["user_no", "user_type", "user_name", "user_profile_url"], // 가져올 데이터 컬럼
    where: { user_type: 2, group_no: null, center_no: centerNo },
    raw: true, // dataValues만 가져옴
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        message: "목록 조회 과정에 문제 발생",
      });
    });
};

// 유치원 등록 승인(유치원 반 배정)
// [put]  /members/manage/teacher/:centerNo
exports.member_teacher_approve = async function (req, res) {};

// 유치원에서 삭제
// [put]  /members/remove/teacher
exports.member_teacher_remove = async function (req, res) {};

// 승인 대기중인 원생 목록
// [get]  /members/manage/kids/:centerNo
exports.member_kid_getList = async function (req, res) {};

// 유치원 등록 승인(유치원 반 배정)
// [put]  /members/manage/kids/:centerNo
exports.member_kid_approve = async function (req, res) {};

// 유치원에서 삭제
// [put]  /members/remove/kids/
exports.member_kid_remove = async function (req, res) {};

// 교사 목록 조회
// [get]  /members/teacher/:centerNo?groupNo=[반번호]
exports.member_teacherList = async function (req, res) {
  const centerNo = req.params.centerNo;

  // 만약 반을 선택하면 해당 반 교사 목록만 조회
  const groupNo = req.query.groupNo ? req.query.groupNo : null;
  if (groupNo != null) console.log("반 번호: " + groupNo);

  // 검색 조건
  const condition = groupNo
    ? [{ user_type: 2 }, { center_no: centerNo }, { group_no: groupNo }]
    : [{ user_type: 2 }, { center_no: centerNo }];

  await Users.findAll({
    attributes: ["user_no", "user_type", "user_name", "user_profile_url"], // 가져올 데이터 컬럼
    where: { [Op.and]: condition },
    raw: true, // dataValues만 가져옴
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        message: "목록 조회 과정에 문제 발생",
      });
    });
};

// 원생 목록 조회
// [get]  /members/kids/:centerNo?groupNo=[반번호]
exports.member_kidsList = async function (req, res) {
  const centerNo = req.params.centerNo;

  // 만약 반을 선택하면 해당 반 원생 목록만 조회
  const groupNo = req.query.groupNo ? req.query.groupNo : null;
  if (groupNo != null) console.log("반 번호: " + groupNo);

  // 검색 조건
  const condition = groupNo
    ? [{ center_no: centerNo }, { group_no: groupNo }]
    : [{ center_no: centerNo }];

  await Kids.findAll({
    attributes: ["kid_no", "kid_name", "kid_profile_url"], // 가져올 데이터 컬럼
    where: { [Op.and]: condition },
    raw: true, // dataValues만 가져옴
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        message: "목록 조회 과정에 문제 발생",
      });
    });
};
