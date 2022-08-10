const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Groups = db.groups;

// 반 등록
// [post] /groups/register
exports.group_regist = async function (req, res) {
  // 반
  const group = {
    center_no: req.body.centerNo,
    group_name: req.body.groupName,
  };

  await Groups.create(group)
    .then((data) => {
      res.status(200).json({ message: "반 등록 완료" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "반 등록 실패" });
    });
};

// 반 목록 조회
// [get]  /groups/list/:centerNo
exports.group_list = async function (req, res) {
  const centerNo = req.params.centerNo;

  // 해당 유치원에 있는 반, 교사, 원생 테이블 조인 -> 반 정보와 교사 수, 원생 수 함께 가져옴
  let query =
    "SELECT g.group_no, g.center_no, g.group_name, IFNULL(s.kid_cnt, 0) kid_cnt, IFNULL(t.teacher_cnt, 0) teacher_cnt FROM `groups` g " +
    " LEFT JOIN  (SELECT u.group_no, COUNT(DISTINCT user_no) teacher_cnt FROM `groups` " +
    " JOIN users u WHERE user_type = 2 AND u.group_no IS NOT NULL GROUP BY group_no) t ON t.group_no = g.group_no " +
    " LEFT JOIN (SELECT k.group_no, COUNT(DISTINCT kid_no) kid_cnt FROM `groups` " +
    " JOIN kids k WHERE k.group_no IS NOT NULL GROUP BY group_no) s ON s.group_no = g.group_no " +
    ` WHERE center_no = ${centerNo}; `;

  await db.sequelize
    .query(query, {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "목록 조회 과정에 문제 발생" });
    });
};

// 반 상세 조회
// [get]  /groups/:groupNo
exports.group_detail = async function (req, res) {
  const groupNo = req.params.groupNo;
  await Groups.findByPk(groupNo)
    .then((data) => {
      if (data === null) {
        res.status(400).json({ message: "해당 정보를 찾을 수 없습니다." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "반 정보 조회 과정에 문제 발생" });
    });
};

// 반 정보 수정
// [put]  /groups/:groupNo
exports.group_update = async function (req, res) {
  const groupNo = req.params.groupNo;

  // 반
  const group = {
    group_name: req.body.groupName,
  };

  await Groups.update(group, { where: { group_no: groupNo } })
    .then((result) => {
      if (result[0] === 1) {
        res.status(200).json({ message: "반 수정 완료" });
      } else {
        res.status(400).json({ message: "해당 반을 찾을 수 없거나 데이터가 비어있음." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "반 수정 실패." });
    });
};

// 반 정보 삭제
// [delete] /groups/:groupNo
exports.group_remove = async function (req, res) {
  const groupNo = req.params.groupNo;

  await Groups.destroy({ where: { group_no: groupNo } })
    .then((result) => {
      if (result == 1) {
        res.status(200).json({ message: "반 삭제 완료." });
      } else {
        res.status(400).json({ message: "해당 반을 찾을 수 없음." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "반 삭제 실패." });
    });
};
