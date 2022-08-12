const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Centers = db.centers;
const Users = db.users;
const Op = db.Sequelize.Op; // 검색을 위한 객체

// 유치원 등록
// [post] /centers/register
exports.center_regist = async function (req, res) {
  // 유치원
  const center = {
    center_name: req.body.centerName,
    center_addr: req.body.centerAddr ? req.body.centerAddr : null,
    center_tel: req.body.centerTel ? req.body.centerTel : null,
    master_no: req.body.userNo,
  };

  await Centers.create(center)
    .then((data) => {
      //유치원 등록 성공 시 원장 소속 변경
      Users.update({ center_no: data.center_no }, { where: { user_no: req.body.userNo } })
        .then((result) => {
          if (result[0] === 1) {
            // 소속 유치원 정보 수정 완료
            res.status(200).json({
              message: "유치원 등록 후 소속 유치원 정보 수정 완료",
            });
          } else {
            // 소속 유치원 정보 수정 실패
            res.status(400).json({
              message: "유치원 등록 후 소속 유치원 정보 수정 요청 오류 발생",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            errMessage: err.message,
            message: "유치원 등록 후 소속 유치원 정보 수정 실패",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "유치원 등록 실패" });
    });
};

// 유치원 목록 조회
// [get]  /centers/list
exports.center_list = async function (req, res) {
  const keyword = req.query.keyword; // 나중 검색을 위한 변수
  if (keyword != null) console.log("검색 키워드: " + keyword);

  // 검색 조건
  // TODO: 주소 검색 ... 조건 설정
  const condition = keyword ? { center_name: { [Op.like]: `%${keyword}%` } } : null;

  await Centers.findAll({ where: condition, raw: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "목록 조회 과정에 문제 발생" });
    });
};

// 유치원 상세 조회
// [get]  /centers/:centerNo
exports.center_detail = async function (req, res) {
  const centerNo = req.params.centerNo;

  await Centers.findByPk(centerNo)
    .then((data) => {
      if (data === null) {
        res.status(400).json({ message: "해당 정보를 찾을 수 없습니다." });
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "목록 조회 과정에 문제 발생" });
    });
};

// 유치원 정보 수정
// [put]  /centers/:centerNo
exports.center_update = async function (req, res) {
  const centerNo = req.params.centerNo;

  // 유치원
  const center = {
    center_name: req.body.centerName,
    center_addr: req.body.centerAddr,
    center_tel: req.body.centerTel,
  };

  await Centers.update(center, { where: { center_no: centerNo } })
    .then((result) => {
      if (result[0] === 1) {
        res.status(200).json({ message: "유치원 수정 완료" }); // 유치원 정보 조회 페이지
      } else {
        res.status(400).json({ message: "해당 정보를 찾을 수 없거나 데이터가 비어있음" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "유치원 수정 실패" });
    });
};

// 유치원 정보 삭제
// [delete] /centers/:centerNo
exports.center_remove = async function (req, res) {
  const centerNo = req.params.centerNo;

  await Centers.destroy({ where: { center_no: centerNo } })
    .then((result) => {
      if (result == 1) {
        res.status(200).json({ message: "유치원 삭제 완료" });
      } else {
        res.status(400).json({ message: "해당 유치원을 찾을 수 없습니다." });
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, message: "유치원 삭제 실패" });
    });
};
