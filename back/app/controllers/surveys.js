const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const surveys = db.surveys;

const Op = db.Sequelize.Op; // 검색을 위한 객체

// 설문 등록
// [post] /surveys/register
exports.survey_regist = async function (req, res) {
  // *** Content-Type: application/json

  // 설문
  const survey = {
    kid_no: req.body.kidNo, // 아이별 설문
    survey_result: req.body.surveyResult ? req.body.surveyResult : null,
    survey_date: req.body.surveyDate,
  };

  await surveys.create(survey)
    .then((data) => {
      console.log("설문 등록 완료");
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "설문 등록 실패",
      });
    });
};

// 설문 목록 조회
// [get]  /surveys/list/:kidNo
exports.survey_list = async function (req, res) {
  const kidNo = req.params.kidNo;

  await surveys.findAll({
    where: {
      kid_no: kidNo
    },
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

// 설문 상세 조회
// [get]  /surveys/:surveyNo
exports.survey_detail = async function (req, res) {
  const surveyNo = req.params.surveyNo;

  await surveys.findByPk(surveyNo)
    .then((data) => {
      if (data === null) {
        res.status(500).json({
          message: "해당 정보를 찾을 수 없습니다.",
        });
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "목록 조회 과정에 문제 발생",
      });
    });
};

