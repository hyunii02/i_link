const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Reports = db.reports;
const Kids = db.kids;
const Op = db.Sequelize.Op;

// 특이사항 등록
// [post] /reports/register
exports.report_regist = async function (req, res) {
  const report = {
    kid_no: req.body.kidNo,
    report_writer: req.body.userNo,
    report_type: req.body.reportType,
    report_content: req.body.reportContent,
  };
  await Reports.create(report)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message, message: "특이사항 작성 실패" }));
};

// 특이사항 반별 목록 조회
// [get]  /reports/groups/:groupNo
exports.report_groupList = async function (req, res) {
  const groupNo = req.params.groupNo;

  await Reports.findAll({
    raw: true,
    include: [
      { model: Kids, as: "kid_no_kid", attributes: ["group_no"], where: { group_no: groupNo } },
    ],
    attributes: {
      include: [
        [
          // 날짜 형식 포맷 후 전송
          db.sequelize.fn("DATE_FORMAT", db.sequelize.col("report_date"), "%Y-%m-%d %r"),
          "report_date",
        ],
      ],
    },
  })
    .then((data) => {
      const reports = data.map((value) => {
        return {
          report_no: value.report_no,
          kid_no: value.kid_no,
          report_writer: value.report_writer,
          report_type: value.report_type,
          report_content: value.report_content,
          report_date: value.report_date,
        };
      });
      res.status(200).json(reports);
    })
    .catch((err) => res.status(500).json({ error: err.message, message: "조회 실패" }));
};

// 특이사항 개인 목록 조회
// [get]  /reports/list/:kidNo
exports.report_kidList = async function (req, res) {
  const kidNo = req.params.kidNo;
  await Reports.findAll({
    where: { kid_no: kidNo },
    attributes: {
      include: [
        [
          // 날짜 형식 포맷 후 전송
          db.sequelize.fn("DATE_FORMAT", db.sequelize.col("report_date"), "%Y-%m-%d %r"),
          "report_date",
        ],
      ],
    },
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

// 특이사항 조회
// [get]  /reports/:reportNo
exports.report_detail = async function (req, res) {
  const reportNo = req.params.reportNo;
  const report = await Reports.findByPk(reportNo).catch((err) => {
    res.status(500).json({
      error: err.message,
      message: "조회 실패",
    });
  });

  // 데이터 없음
  if (report === null) {
    res.status(400).json({ message: "해당 데이터가 없습니다." });
  } else {
    res.status(200).json(report);
  }
};

// 특이사항 수정
// [put]  /reports/:reportNo
exports.report_update = async function (req, res) {
  const reportNo = req.params.reportNo;

  const report = {
    report_type: req.body.reportType,
    report_content: req.body.reportContent,
  };

  await Reports.update(report, { where: { report_no: reportNo } })
    .then(() => {
      res.status(200).json({ message: "전달사항 수정 완료" });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
        message: "전달사항 수정 실패",
      });
    });
};

// 특이사항 삭제
// [delete]  /reports/:reportNo
exports.report_remove = async function (req, res) {
  const reportNo = req.params.reportNo;

  await Reports.destroy({ where: { report_no: reportNo } })
    .then((result) => {
      if (result == 1) {
        res.status(200).json({ message: "삭제 완료" });
      } else {
        res.status(400).json({ message: "해당 정보를 찾을 수 없습니다." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
        message: "삭제 실패",
      });
    });
};
