const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Notices = db.notices;
const Op = db.Sequelize.Op;

// 공지사항 등록
// [get]  /notices/register
exports.notice_regist = async function (req, res) {
  try {
    const fileList = req.files ? req.files : null;
    console.log(fileList);
    const transaction = await db.sequelize.transaction(); // 트랜잭션
    let noticeNo = 0;

    const notice = {
      center_no: req.body.centerNo,
      notice_title: req.body.noticeTitle,
      notice_content: req.body.noticeContent,
    };

    // 공지사항 게시글 작성
    await Notices.create(notice, { transaction })
      .then((data) => {
        // 번호 가져오기 - 첨부파일 작성 시 사용
        noticeNo = data.notice_no;
      })
      .catch((err) => res.status(500).json({ error: err.message, message: "공지 작성 실패." }));

    const promises = [];
    for (let i = 0; i < fileList.length; i++) {
      // 쿼리 실행 후 결과 저장
      promises.push(
        db.sequelize.query(
          `INSERT INTO files(notice_no, file_name, file_size, file_type, file_location) 
          VALUES(?, ?, ?, ?, ?);`,
          {
            type: db.sequelize.QueryTypes.INSERT,
            replacements: [
              noticeNo,
              fileList[i].originalname,
              fileList[i].size,
              fileList[i].mimetype,
              "/uploads/attachment/" + fileList[i].filename,
            ],
            transaction,
          },
        ),
      );
    }

    await Promise.all(promises)
      .then(() => {
        res.status(200).json({ message: "첨부파일 등록 완료." });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message, message: "첨부파일 등록 실패." });
      });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message, message: "공지 작성 실패." });
  }
};

// 공지사항 목록 조회
// [get]  /notices/list/:centerNo
exports.notice_list = async function (req, res) {
  const centerNo = req.params.centerNo;
  const keyword = req.query.keyword; // 일단 제목만 검색

  if (keyword != null) console.log("검색 키워드: ", keyword);
  const condition = keyword
    ? { notice_title: { [Op.like]: `%${keyword}%` }, center_no: centerNo }
    : { center_no: centerNo };

  await Notices.findAll({
    where: condition,
    attributes: {
      include: [
        "notice_no",
        "center_no",
        "notice_title",
        "notice_content",
        [
          // 날짜 형식 포맷 후 전송
          db.sequelize.fn("DATE_FORMAT", db.sequelize.col("notice_date"), "%Y-%m-%d %h:%i:%s"),
          "notice_date",
        ],
        "hit",
      ],
    },
    raw: true,
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message, message: "조회 실패" }));
};

// 공지사항 조회
// [get] /notices/:noticeNo
exports.notice_detail = async function (req, res) {
  const noticeNo = req.params.noticeNo;
  await Notices.findOne({
    where: { notice_no: noticeNo },
    attributes: {
      include: [
        "notice_no",
        "center_no",
        "notice_title",
        "notice_content",
        [
          // 날짜 형식 포맷 후 전송
          db.sequelize.fn("DATE_FORMAT", db.sequelize.col("notice_date"), "%Y-%m-%d %h:%i:%s"),
          "notice_date",
        ],
        "hit",
      ],
    },
  })
    .then((notice) => {
      if (notice == null) res.status(400).json({ message: "해당 데이터가 없습니다." });
      res.status(200).json(notice);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "조회 실패" });
    });
};

// 공지사항 수정
// [put] /notices/:noticeNo
exports.notice_update = async function (req, res) {
  const noticeNo = req.params.noticeNo;
  const notice = {
    notice_title: req.body.noticeTitle,
    notice_content: req.body.noticeContent,
  };
  await Notices.update(notice, { where: { notice_no: noticeNo } })
    .then((result) => {
      if (result[0] === 1) {
        res.status(200).json({ message: "공지사항 수정 완료" });
      } else {
        res.status(400).json({ message: "해당 정보를 찾을 수 없거나 데이터가 비어있음" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "공지사항 수정 실패" });
    });
};

// 공지사항 삭제
// [delete] /notices/:noticeNo
exports.notice_remove = async function (req, res) {
  const noticeNo = req.params.noticeNo;
  await Notices.destroy({ where: { notice_no: noticeNo } })
    .then((result) => {
      if (result == 1) {
        res.status(200).json({ message: "삭제 완료" });
      } else {
        res.status(400).json({ message: "해당 정보를 찾을 수 없습니다." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "삭제 실패" });
    });
};
