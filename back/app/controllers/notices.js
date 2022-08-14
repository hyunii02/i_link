const path = require("path");
const fs = require("fs");

const db = require(path.join(__dirname, "..", "models"));
const Notices = db.notices;
const Files = db.files;

// 공지사항 등록
// [get]  /notices/register
exports.notice_regist = async function (req, res) {
  const transaction = await db.sequelize.transaction(); // 트랜잭션
  try {
    const fileList = req.files ? req.files : null;

    const promises = [];

    const notice = {
      center_no: req.body.centerNo,
      notice_title: req.body.noticeTitle,
      notice_content: req.body.noticeContent,
    };
    let noticeNo = 0;

    // 공지사항 게시글 작성
    await Notices.create(notice, { transaction })
      .then((data) => {
        // 번호 가져오기 - 첨부파일 작성 시 사용
        noticeNo = data.notice_no;
      })
      .catch((err) => res.status(500).json({ error: err.message, message: "공지 작성 실패." }));

    if (Object.keys(fileList).length !== 0) {
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
          console.log("공지 첨부 등록 완료");
        })
        .catch((err) => {
          res.status(500).json({ error: err.message, message: "공지 첨부 등록 실패." });
        });
    }
    await transaction.commit();
    res.status(201).json({ message: "공지사항 등록 완료." });
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

  if (keyword) console.log("검색 키워드: ", keyword);

  const condition = keyword
    ? `WHERE notice_title LIKE '%${keyword}%' AND center_no = ${centerNo} `
    : `WHERE center_no = ${centerNo} `;

  let query =
    "SELECT n.notice_no, n.notice_title, DATE_FORMAT(n.notice_date,'%Y-%m-%d %H:%i:%s') notice_date , ( " +
    " SELECT EXISTS (SELECT file_no FROM files f WHERE f. notice_no = n.notice_no)) attachment " +
    ` FROM notices n ${condition} ` +
    " ORDER BY notice_no DESC; ";

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
};

// 공지사항 조회
// [get] /notices/:noticeNo
exports.notice_detail = async function (req, res) {
  const noticeNo = req.params.noticeNo;

  await Notices.findOne({
    where: { notice_no: noticeNo },
    attributes: {
      include: [
        // 날짜 형식 포맷 후 전송
        [
          db.sequelize.fn("DATE_FORMAT", db.sequelize.col("notice_date"), "%Y-%m-%d %H:%i:%s"),
          "notice_date",
        ],
      ],
      exclude: ["center_no", "hit"],
    },
    include: [
      {
        model: Files,
        as: "files",
        attributes: ["file_no", "file_name", "file_location"],
      },
    ],
  })
    .then((notice) => {
      if (notice == null) res.status(400).json({ message: "해당 데이터가 없습니다." });
      res.status(200).json(notice);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "공지사항 조회 실패" });
    });
};

// 공지사항 수정
// [put] /notices/:noticeNo
exports.notice_update = async function (req, res) {
  const noticeNo = req.params.noticeNo;
  const fileList = req.files ? req.files : null;
  const transaction = await db.sequelize.transaction(); // 트랜잭션
  let originFileList = null;

  try {
    const notice = {
      notice_title: req.body.noticeTitle,
      notice_content: req.body.noticeContent,
    };

    await Notices.update(notice, { where: { notice_no: noticeNo }, transaction });

    if (fileList) {
      const promises = [];

      await Files.findAll({ where: { notice_no: noticeNo }, raw: true })
        .then((data) => {
          originFileList = data;
          console.log(data);
        })
        .catch((err) => console.log({ error: err.message, message: "파일 조회 실패." }));

      await db.sequelize
        .query(`DELETE FROM files WHERE notice_no = ?;`, {
          type: db.sequelize.QueryTypes.DELETE,
          replacements: [noticeNo],
        })
        .catch((err) => console.log({ error: err.message, message: "파일 삭제 실패." }));

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
        // 공지 수정 처리 후 서버에 저장되어 있던 파일 삭제
        .then(() => {
          if (originFileList.length > 0) {
            for (let i = 0; i < originFileList.length; i++) {
              if (fs.existsSync(path.join(__dirname, "..", originFileList[i].file_location))) {
                try {
                  fs.unlinkSync(path.join(__dirname, "..", originFileList[i].file_location));
                } catch (err) {
                  console.log(err.message);
                }
              }
            }
          }
          console.log("공지사항 첨부파일 수정 완료");
        })
        .catch((err) => {
          res.status(500).json({ error: err.message, message: "공지사항 첨부파일 수정 실패" });
        });
    }
    await transaction.commit();
    res.status(201).json({ message: "공지사항 수정 완료" });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message, message: "공지사항 수정 실패" });
  }
};

// 공지사항 삭제
// [delete] /notices/:noticeNo
exports.notice_remove = async function (req, res) {
  const noticeNo = req.params.noticeNo;
  let originFileList = null;

  await Files.findAll({ where: { notice_no: noticeNo }, raw: true })
    .then((data) => {
      originFileList = data;
      console.log(data);
    })
    .catch((err) => console.log({ error: err.message, message: "파일 조회 실패." }));

  await Promise.all([
    Notices.destroy({ where: { notice_no: noticeNo } }),
    Files.destroy({ where: { notice_no: noticeNo } }),
  ])
    .then((result) => {
      // 삭제 완료 시
      if (result[0] == 1) {
        // 첨부된 파일이 존재했다면
        if (originFileList.length > 0) {
          for (let i = 0; i < originFileList.length; i++) {
            // 해당 파일 서버에서 삭제
            if (fs.existsSync(path.join(__dirname, "..", originFileList[i].file_location))) {
              try {
                fs.unlinkSync(path.join(__dirname, "..", originFileList[i].file_location));
              } catch (err) {
                console.log(err.message);
              }
            }
          }
        }
        res.status(200).json({ message: "공지사항 삭제 완료." });
      } else {
        res.status(400).json({ message: "해당 데이터를 찾을 수 없음." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "공지사항 삭제 실패" });
    });
};
