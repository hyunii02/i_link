const path = require("path");
const fs = require("fs");

const db = require(path.join(__dirname, "..", "models"));
const Quiz = db.quiz;
const QuizImages = db.quiz_images;
const QuizResults = db.quiz_results;
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
    };

    await Quiz.create(quiz, { transaction })
      .then((data) => {
        quizNo = data.quiz_no;
      })
      .catch((err) => res.status(500).json({ error: err.message, message: "퀴즈 등록 실패." }));

    if (Object.keys(imgList).length !== 0) {
      const uploadPath = "/uploads/quiz/";

      const quizImg = {
        quiz_content_url: imgList.quizContentUrl
          ? uploadPath + imgList.quizContentUrl[0].filename
          : null,
        quiz_sel_1_url: imgList.quizSel1Url ? uploadPath + imgList.quizSel1Url[0].filename : null,
        quiz_sel_2_url: imgList.quizSel2Url ? uploadPath + imgList.quizSel2Url[0].filename : null,
        quiz_sel_3_url: imgList.quizSel3Url ? uploadPath + imgList.quizSel3Url[0].filename : null,
        quiz_sel_4_url: imgList.quizSel4Url ? uploadPath + imgList.quizSel4Url[0].filename : null,
        quiz_no: quizNo,
      };

      await Promise.all([
        QuizImages.create(quizImg, { transaction })
          .then((data) => {
            console.log("퀴즈 사진 등록 완료");
          })
          .catch((err) => res.status(500).json({ error: err.message, message: "퀴즈 등록 실패." })),
      ]);
    }

    await transaction.commit();
    res.status(200).json({ message: "퀴즈 등록 완료." });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message, message: "퀴즈 등록 실패." });
  }
};

// 퀴즈 목록 조회
// [get]  /quiz/list/:userNo
exports.quiz_list = async function (req, res) {
  const writerNo = req.params.userNo;

  await Quiz.findAll({
    include: [{ model: QuizImages, as: "quiz_images" }],
    where: { quiz_writer: writerNo },
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

// 오늘의 퀴즈 조회
// [get]  /quiz/today/:groupNo
exports.quiz_today = async function (req, res) {
  const groupNo = req.params.groupNo;

  await Quiz.findAll({
    include: [{ model: QuizImages, as: "quiz_images" }],
    where: {
      [Op.and]: [
        { group_no: groupNo },
        { quiz_date: db.sequelize.fn("DATE_FORMAT", db.sequelize.fn("NOW"), "%Y-%m-%d") },
      ],
    },
    raw: true,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "목록 조회 과정에 문제 발생" });
    });
};

// 퀴즈 답 등록(아이)
// [post] /quiz/kids/register
exports.quiz_kid_regist = async function (req, res) {
  // 퀴즈
  const result = {
    quiz_ans: req.body.quizAns, // 퀴즈 정답
    kid_no: req.body.kidNo,
    quiz_no: req.body.quizNo,
  };

  await QuizResults.create(result)
    .then((data) => {
      console.log("퀴즈 제출 완료");
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "퀴즈 제출 실패" });
    });
};

// 퀴즈 결과 조회
// [get]  /quiz/kids/:kidNo
exports.quiz_kidList = async function (req, res) {
  const kidNo = req.params.kidNo;
  let query =
    "SELECT qi.*, r.quiz_ans kid_ans, r.kid_no FROM quiz_results r JOIN " +
    " (SELECT q.*, quiz_content_url, quiz_sel_1_url, quiz_sel_2_url, quiz_sel_3_url, quiz_sel_4_url " +
    " FROM quiz q LEFT JOIN quiz_images i ON q.quiz_no = i.quiz_no) qi ON qi.quiz_no = r.quiz_no " +
    ` WHERE kid_no = ${kidNo} ORDER BY result_no DESC;`;

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

  // await QuizResults.findAll({
  //   attributes: ["quiz_ans", "kid_no"],
  //   include: [
  //     {
  //       model: Quiz,
  //       as: "quiz_no_quiz",
  //       include: [
  //         { model: QuizImages, as: "quiz_images", attributes: { exclude: ["img_no", "quiz_no"] } },
  //       ],
  //       attributes: { exclude: ["quiz_writer", "group_no"] },
  //     },
  //   ],
  //   where: { kid_no: kidNo },
  //   order: [["result_no", "DESC"]],
  //   raw: true,
  // })
};

// 퀴즈 상세 조회
// [get]  /quiz/:quizNo
exports.quiz_detail = async function (req, res) {
  const quizNo = req.params.quizNo;
  let quizImg = null;
  await QuizImages.findOne({ where: { quiz_no: quizNo }, raw: true })
    .then((data) => {
      quizImg = data;
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "퀴즈 조회 과정에 문제 발생" });
    });

  const option = quizImg
    ? {
        include: [{ model: QuizImages, as: "quiz_images" }],
        where: { quiz_no: quizNo },
        raw: true,
      }
    : {
        where: { quiz_no: quizNo },
        raw: true,
      };

  await Quiz.findOne(option)
    .then((data) => {
      if (data === null) {
        res.status(400).json({ message: "해당 정보를 찾을 수 없습니다." });
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "퀴즈 조회 과정에 문제 발생" });
    });
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

    await Quiz.update(quiz, { where: { quiz_no: quizNo }, transaction }).catch((err) => {
      res.status(500).json({ error: err.message, message: "퀴즈 수정 실패" });
    });

    if (Object.keys(imgList).length !== 0) {
      console.log("imgList", imgList);
      const uploadPath = "/uploads/quiz/";
      let origin = [];
      await QuizImages.findOne({ where: { quiz_no: quizNo }, raw: true })
        .then((data) => {
          // DB에 있는 원래 값들만 가져와서 origin에 저장
          origin = Object.values(data);
          console.log("origin", origin);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message, message: "퀴즈 사진 조회 실패" });
        });

      // 수정하는 사진이 있으면 DB에 새로운 데이터 넣어주고 아니라면 원래 있던 값
      const quizImg = {
        quiz_content_url: imgList.quizContentUrl
          ? uploadPath + imgList.quizContentUrl[0].filename
          : origin[1],
        quiz_sel_1_url: imgList.quizSel1Url
          ? uploadPath + imgList.quizSel1Url[0].filename
          : origin[2],
        quiz_sel_2_url: imgList.quizSel2Url
          ? uploadPath + imgList.quizSel2Url[0].filename
          : origin[3],
        quiz_sel_3_url: imgList.quizSel3Url
          ? uploadPath + imgList.quizSel3Url[0].filename
          : origin[4],
        quiz_sel_4_url: imgList.quizSel4Url
          ? uploadPath + imgList.quizSel4Url[0].filename
          : origin[5],
      };

      origin = origin.slice(1, 6);
      const latest = Object.values(quizImg);

      await QuizImages.update(quizImg, { where: { quiz_no: quizNo }, transaction })
        .then((data) => {
          for (let i = 0; i < origin.length; i++) {
            // 원본 사진이 있고 새로 업로드한 사진과 파일이 다르면 원래 사진 삭제
            if (origin[i] && origin[i] != latest[i]) {
              if (fs.existsSync(path.join(__dirname, "..", origin[i]))) {
                try {
                  fs.unlinkSync(path.join(__dirname, "..", origin[i]));
                } catch (err) {
                  console.log(err.message);
                }
              }
            }
          }
          console.log("퀴즈 사진 수정 완료");
        })
        .catch((err) =>
          res.status(500).json({ error: err.message, message: "퀴즈 사진 수정 실패." }),
        );
    }

    await transaction.commit();
    res.status(200).json({ message: "퀴즈 수정 완료." });
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
          res.status(500).json({ error: err.message, message: "퀴즈 날짜 수정 실패" });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "오늘의 퀴즈 리셋 실패" });
    });
};

// 퀴즈 정보 삭제
// [delete] /quiz/:quizNo
exports.quiz_remove = async function (req, res) {
  const quizNo = req.params.quizNo;

  let origin = [];
  await QuizImages.findOne({ where: { quiz_no: quizNo }, raw: true })
    .then((data) => {
      // DB에 있는 원래 값들만 가져와서 origin에 저장 후 해당 경로 파일 삭제
      origin = Object.values(data);
      origin = origin.slice(1, 6);
      for (let i = 0; i < origin.length; i++) {
        if (fs.existsSync(path.join(__dirname, "..", origin[i]))) {
          try {
            fs.unlinkSync(path.join(__dirname, "..", origin[i]));
          } catch (err) {
            console.log(err.message);
          }
        }
      }
      console.log("origin", origin);
    })
    .catch((err) => {
      console.log(err.message);
    });

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
