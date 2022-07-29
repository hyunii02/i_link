const db = require("../models");
const Preschool = db.preschool;
const Op = db.Sequelize.Op; // 검색을 위한 객체

// 유치원 등록
// [post] /preschool/register
exports.preschool_regist = function (req, res, next) {

  // *** Content-Type: application/json
  
  // 유치원
  const preschool = {
    preschool_name: req.body.name,
    preschool_addr: req.body.address ? req.body.address : null,
    preschool_tel: req.body.tel ? req.body.tel : null,
    principal_no: req.body.userNo // front에서 input type: hidden
  }

  Preschool.create(preschool)
    .then(data => {
      console.log("유치원 등록 완료");
      res.send(data); // TODO: 나중에는 유치원 관리 페이지로 이동?
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "유치원 등록 실패"
      });
    });
}


// 유치원 목록 조회
// [get]  /preschool/list
exports.preschool_list = async function (req, res) { 
  
  const keyword = req.query.keyword; // 나중 검색을 위한 변수
  if (keyword != null) console.log("검색 키워드: " + keyword);
  
  // 검색 조건
  // TODO: 주소 검색 ... 조건 설정
  const condition = keyword ? { preschool_name: { [Op.like]: `%${keyword}%` } } : null;

  await Preschool.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "목록 조회 과정에 문제 발생"
      });
    });

};


// 유치원 상세 조회
// [get]  /preschool/:no
exports.preschool_detail = async function (req, res) { 
  
  const preschoolNo = req.params.no;
  const preschool = await Preschool.findByPk(preschoolNo);

  if (preschool === null) { // 데이터 없음
    console.log("해당 유치원을 찾을 수 없습니다.");
  } else { // 검색 성공
    console.log(preschool);
    res.send(preschool);
  }

};

// 유치원 정보 수정
// [put]  /preschool/:no
exports.preschool_update = async function (req, res) { 

  const preschoolNo = req.params.no;
  
  // 유치원
  const preschool = {
    preschool_name: req.body.name,
    preschool_addr: req.body.address,
    preschool_tel: req.body.tel
    // TODO: 원장변경도?
  }

  
  Preschool.update(preschool, { where: { preschool_no: preschoolNo }})
    .then(result => {
      if (result[0] === 1) { // 수정 완료
        console.log("유치원 수정 완료");
        res.redirect(`/preschool/${preschoolNo}`); // 유치원 정보 조회 페이지
      } else { // 수정 실패
        res.send({
          message: "해당 유치원을 찾을 수 없거나 데이터가 비어있음"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "유치원 수정 실패"
      });
    });
};

// 유치원 정보 삭제
exports.preschool_remove = async function (req, res) { 
  
  const preschoolNo = req.params.no;

};
