const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Quiz = db.quiz;

// 퀴즈 등록
// [post] /quiz/register
exports.quiz_regist = async function (req, res) {
  // *** Content-Type: application/json

  // 퀴즈
  const quiz = {
    quiz_writer: req.body.quizWriter,
    group_no: req.body.groupNo, // 반별 퀴즈
    quiz_content: req.body.quizContent ? req.body.quizContent : null, // 퀴즈 질문
    quiz_sel_1: req.body.quizSel1 ? req.body.quizSel1 : null, // 선택지 1
    quiz_sel_2: req.body.quizSel2 ? req.body.quizSel2 : null, // 선택지 2
    quiz_sel_3: req.body.quizSel3 ? req.body.quizSel3 : null, // 선택지 3
    quiz_sel_4: req.body.quizSel4 ? req.body.quizSel4 : null, // 선택지 4
    quiz_ans: req.body.quizAns ? req.body.quizAns : null, // 퀴즈 답
    quiz_date: req.body.quizDate,
  };

  await Quiz.create(quiz)
    .then((data) => {
      console.log("퀴즈 등록 완료");
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        errMessage: err.message,
        message: "퀴즈 등록 실패",
      });
    });
};

// 퀴즈 목록 조회
// [get]  /quiz/list/:userNo
exports.quiz_list = async function (req, res) {
  const writerNo = req.params.userNo;

  await Quiz.findAll({
    where: { quiz_writer: writerNo },
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

// 퀴즈 상세 조회
// [get]  /quiz/:quizNo
exports.quiz_detail = async function (req, res) {
  const quizNo = req.params.quizNo;
  await Quiz.findByPk(quizNo)
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
        errMessage: err.message,
        message: "조회 과정에 문제 발생",
      });
    });
};

// 퀴즈 정보 수정
// [put]  /quiz/:quizNo
exports.quiz_update = async function (req, res) {
  const quizNo = req.params.quizNo;

  // 퀴즈
  const quiz = {
    quiz_content: req.body.quizContent ? req.body.quizContent : null, // 질문
    quiz_sel_1: req.body.quizSel1 ? req.body.quizSel1 : null, // 선택지 1
    quiz_sel_2: req.body.quizSel2 ? req.body.quizSel2 : null, // 선택지 2
    quiz_sel_3: req.body.quizSel3 ? req.body.quizSel3 : null, // 선택지 3
    quiz_sel_4: req.body.quizSel4 ? req.body.quizSel4 : null, // 선택지 4
    quiz_ans: req.body.quizAns ? req.body.quizAns : null, // 퀴즈 답
  };

  await Quiz.update(quiz, { where: { quiz_no: quizNo } })
    .then((result) => {
      if (result[0] === 1) {
        // 수정 완료
        console.log("퀴즈 수정 완료");
        res.status(200).json({
          message: "퀴즈 수정 완료",
        });
      } else {
        // 수정 실패
        res.status(400).json({
          message: "해당 퀴즈을 찾을 수 없거나 데이터가 비어있음",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errMessage: err.message,
        message: "퀴즈 수정 실패",
      });
    });
};

// 퀴즈 정보 삭제
// [delete] /quiz/:quizNo
exports.quiz_remove = async function (req, res) {
  const quizNo = req.params.quizNo;

  await Quiz.destroy({ where: { quiz_no: quizNo } })
    .then((result) => {
      if (result == 1) {
        // 삭제 완료
        res.status(200).json("퀴즈 삭제 완료");
      } else {
        // 삭제 실패
        res.status(400).json({
          message: "해당 퀴즈을 찾을 수 없습니다.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errMessage: err.message,
        message: "퀴즈 삭제 실패",
      });
    });
};
