const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Quiz = db.quiz;
const QuizImages = db.quizImages; // TODO: 얘 왜 안먹히는데
const Op = db.Sequelize.Op;

// 퀴즈 등록
// [post] /quiz/register
exports.quiz_regist = async function (req, res) {
  // *** Content-Type: application/json
  const transaction = await db.sequelize.transaction(); // 트랜잭션
  try {
    const imgList = req.files ? req.files : null;
    let quizNo = 0;
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
      quiz_date: req.body.quizDate ? req.body.quizDate : null,
    };

    await Quiz.create(quiz, { transaction })
      .then((data) => {
        quizNo = data.quiz_no;
        // res.status(200).json(data);
      })
      .catch((err) => res.status(500).json({ error: err.message, message: "퀴즈 등록 실패." }));

    if (imgList) {
      const uploadPath = "/uploads/quiz/";

      await Promise.all([
        db.sequelize.query(
          `INSERT INTO quiz_images(quiz_content_url, quiz_sel_1_url, quiz_sel_2_url, quiz_sel_3_url, quiz_sel_4_url, quiz_no) 
        VALUES(?, ?, ?, ?, ?, ?);`,
          {
            type: db.sequelize.QueryTypes.INSERT,
            replacements: [
              imgList.quizContentUrl ? uploadPath + imgList.quizContentUrl[0].filename : null,
              imgList.quizSel1Url ? uploadPath + imgList.quizSel1Url[0].filename : null,
              imgList.quizSel2Url ? uploadPath + imgList.quizSel2Url[0].filename : null,
              imgList.quizSel3Url ? uploadPath + imgList.quizSel3Url[0].filename : null,
              imgList.quizSel4Url ? uploadPath + imgList.quizSel4Url[0].filename : null,
              quizNo,
            ],
            transaction,
          },
        ),
      ])
        .then((data) => {
          console.log(data);
          res.status(200).json({ message: "퀴즈 등록 완료." });
        })
        .catch((err) => res.status(500).json({ error: err.message, message: "퀴즈 등록 실패." }));
    }
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message, message: "퀴즈 등록 실패." });
  }
};

// 퀴즈 목록 조회
// [get]  /quiz/list/:userNo
exports.quiz_list = async function (req, res) {
  const writerNo = req.params.userNo;

  let query =
    "SELECT q.*, quiz_content_url, quiz_sel_1_url, quiz_sel_2_url, quiz_sel_3_url, quiz_sel_4_url FROM quiz q LEFT JOIN quiz_images i ON q.quiz_no = i.quiz_no " +
    ` WHERE quiz_writer = ${writerNo}`;

  await db.sequelize
    .query(query, {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "목록 조회 과정에 문제 발생" });
    });

  // await Quiz.findAll({
  //   include: [{ model: QuizImages, as: "quiz_images" }],
  //   where: { quiz_writer: writerNo },
  //   raw: true,
  // })
  //   .then((data) => {
  //     res.status(200).json(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       message: err.message || "목록 조회 과정에 문제 발생",
  //     });
  //   });
};

// 오늘의 퀴즈 조회
// [get]  /quiz/today/:groupNo
exports.quiz_today = async function (req, res) {
  const groupNo = req.params.groupNo;

  let query =
    "SELECT q.*, quiz_content_url, quiz_sel_1_url, quiz_sel_2_url, quiz_sel_3_url, quiz_sel_4_url FROM quiz q LEFT JOIN quiz_images i ON q.quiz_no = i.quiz_no " +
    ` WHERE group_no = ${groupNo} AND quiz_date = DATE_FORMAT(now(), '%Y-%m-%d');`;

  await db.sequelize
    .query(query, {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "목록 조회 과정에 문제 발생" });
    });

  // await Quiz.findAll({
  //   where: {
  //     [Op.and]: [
  //       { group_no: groupNo },
  //       { quiz_date: db.sequelize.fn("DATE_FORMAT", db.sequelize.fn("NOW"), "%Y-%m-%d") },
  //     ],
  //   },
  // })
  //   .then((data) => {
  //     res.status(200).json(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       message: err.message || "목록 조회 과정에 문제 발생",
  //     });
  //   });
};

// 퀴즈 상세 조회
// [get]  /quiz/:quizNo
exports.quiz_detail = async function (req, res) {
  const quizNo = req.params.quizNo;
  let query = "SELECT * FROM quiz_images " + ` WHERE quiz_no = ${quizNo};`;
  await db.sequelize
    .query(query, {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    })
    .then((data) => {
      if (data.length > 0) {
        query =
          "SELECT q.*, quiz_content_url, quiz_sel_1_url, quiz_sel_2_url, quiz_sel_3_url, quiz_sel_4_url FROM quiz q LEFT JOIN quiz_images i ON q.quiz_no = i.quiz_no " +
          ` WHERE q.quiz_no = ${quizNo};`;
      } else {
        query = "SELECT * FROM quiz " + ` WHERE quiz_no = ${quizNo};`;
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "퀴즈 조회 과정에 문제 발생" });
    });

  await db.sequelize
    .query(query, {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "퀴즈 조회 과정에 문제 발생" });
    });

  // await Quiz.findByPk(quizNo)
  //   .then((data) => {
  //     if (data === null) {
  //       res.status(500).json({
  //         message: "해당 정보를 찾을 수 없습니다.",
  //       });
  //     } else {
  //       console.log(data);
  //       res.status(200).json(data);
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       errMessage: err.message,
  //       message: "조회 과정에 문제 발생",
  //     });
  //   });
};

// 퀴즈 정보 수정
// [put]  /quiz/:quizNo
exports.quiz_update = async function (req, res) {
  const quizNo = req.params.quizNo;
  const transaction = await db.sequelize.transaction(); // 트랜잭션

  try {
    const imgList = req.files ? req.files : null;

    // 퀴즈
    const quiz = {
      quiz_content: req.body.quizContent ? req.body.quizContent : null, // 질문
      quiz_sel_1: req.body.quizSel1 ? req.body.quizSel1 : null, // 선택지 1
      quiz_sel_2: req.body.quizSel2 ? req.body.quizSel2 : null, // 선택지 2
      quiz_sel_3: req.body.quizSel3 ? req.body.quizSel3 : null, // 선택지 3
      quiz_sel_4: req.body.quizSel4 ? req.body.quizSel4 : null, // 선택지 4
      quiz_ans: req.body.quizAns ? req.body.quizAns : null, // 퀴즈 답
    };

    await Quiz.update(quiz, { where: { quiz_no: quizNo }, transaction })
      // .then((result) => {
      //   // 수정 완료
      //   console.log("퀴즈 수정 완료");
      //   res.status(200).json({
      //     message: "퀴즈 수정 완료",
      //   });
      // })
      .catch((err) => {
        res.status(500).json({
          errMessage: err.message,
          message: "퀴즈 수정 실패",
        });
      });

    if (imgList) {
      console.log("imgList", imgList);
      const uploadPath = "/uploads/quiz/";
      let origin = null;

      await db.sequelize
        .query("SELECT * FROM quiz_images WHERE quiz_no = ?", {
          type: db.sequelize.QueryTypes.SELECT,
          replacements: [quizNo],
        })
        .then((data) => {
          origin = data;
          console.log("origin", origin);
        })
        .catch((err) => {
          console.log(err.message);
        });

      // await QuizImages.findOne({ where: { quiz_no: quizNo }, raw: true })
      //   .then((data) => {
      //     origin = data;
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
      await Promise.all([
        db.sequelize.query(
          "UPDATE quiz_images SET quiz_content_url = ?, quiz_sel_1_url = ?, quiz_sel_2_url = ?, quiz_sel_3_url = ?, quiz_sel_4_url = ? WHERE quiz_no = ?;",
          {
            type: db.sequelize.QueryTypes.UPDATE,
            replacements: [
              imgList.contentImg
                ? uploadPath + imgList.quizContentUrl[0].filename
                : origin[0].quiz_content_url,
              imgList.quizSel1Url
                ? uploadPath + imgList.quizSel1Url[0].filename
                : origin.quiz_sel_1_url
                ? origin.quiz_sel_1_url
                : null,
              imgList.quizSel2Url
                ? uploadPath + imgList.quizSel2Url[0].filename
                : origin.quiz_sel_2_url
                ? origin.quiz_sel_2_url
                : null,
              imgList.quizSel3Url
                ? uploadPath + imgList.quizSel3Url[0].filename
                : origin.quiz_sel_3_url
                ? origin.quiz_sel_3_url
                : null,
              imgList.quizSel4Url
                ? uploadPath + imgList.quizSel4Url[0].filename
                : origin.quiz_sel_4_url
                ? origin.quiz_sel_4_url
                : null,
              quizNo,
            ],
            transaction,
          },
        ),
      ])
        .then((data) => {
          res.status(200).json({ message: "퀴즈 수정 완료." });
        })
        .catch((err) => res.status(500).json({ error: err.message, message: "퀴즈 수정 실패." }));
    }

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message, message: "퀴즈 수정 실패." });
  }
};

// 퀴즈 오늘 날짜로 지정
// [put]  /quiz/today/:quizNo
exports.quiz_date_update = async function (req, res) {
  const quizNo = req.params.quizNo;

  // 오늘 날짜로 된 퀴즈 모두 날짜 리셋
  var query =
    "update quiz set quiz_date = null " + 'where quiz_date = date_format(now(), "%Y%m%d"); ';
  await db.sequelize
    .query(query)
    .then((data) => {
      console.log("오늘의 퀴즈 리셋 완료");

      // 퀴즈날짜 오늘로 지정
      Quiz.update({ quiz_date: db.sequelize.fn("NOW") }, { where: { quiz_no: quizNo } })
        .then((result) => {
          // 수정 완료
          console.log("퀴즈 날짜 수정 완료");
          res.status(200).json({
            message: "퀴즈 날짜 수정 완료",
          });
        })
        .catch((err) => {
          res.status(500).json({
            errMessage: err.message,
            message: "퀴즈 날짜 수정 실패",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        errMessage: err.message,
        message: "오늘의 퀴즈 리셋 실패",
      });
    });
};

// 퀴즈 정보 삭제
// [delete] /quiz/:quizNo
exports.quiz_remove = async function (req, res) {
  const quizNo = req.params.quizNo;

  await Quiz.destroy({ where: { quiz_no: quizNo } })
    .then((result) => {
      db.sequelize
        .query("DELETE FROM quiz_images WHERE quiz_no = ?", {
          type: db.sequelize.QueryTypes.DELETE,
          replacements: [quizNo],
        })
        .then((data) => {
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
          console.log(err.message);
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        message: "퀴즈 삭제 실패",
      });
    });
};
