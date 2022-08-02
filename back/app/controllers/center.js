const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Centers = db.centers;

const Op = db.Sequelize.Op; // 검색을 위한 객체


// 유치원 등록
// [post] /centers/register
exports.center_regist = function (req, res) {

  // *** Content-Type: application/json
  
  // 유치원
  const center = {
    center_name: req.body.centerName,
    center_addr: req.body.centerAddr ? req.body.centerAddr : null,
    center_tel: req.body.centerTel ? req.body.centerTel : null,
    master_no: req.body.userNo // front에서 input type: hidden
  }

  Centers.create(center)
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
// [get]  /centers/list
exports.center_list = async function (req, res) { 
  
  const keyword = req.query.keyword; // 나중 검색을 위한 변수
  if (keyword != null) console.log("검색 키워드: " + keyword);
  
  // 검색 조건
  // TODO: 주소 검색 ... 조건 설정
  const condition = keyword ? { center_name: { [Op.like]: `%${keyword}%` } } : null;

  await Centers.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "목록 조회 과정에 문제 발생"
      });
    });
}


// 유치원 상세 조회
// [get]  /centers/:center_no
exports.center_detail = async function (req, res) { 
  
  const centerNo = req.params.center_no;
  const center = await Centers.findByPk(centerNo);

  if (center === null) { // 데이터 없음
    console.log("해당 유치원을 찾을 수 없습니다.");
  } else { // 검색 성공
    console.log(center);
    res.send(center);
  }
}


// 유치원 정보 수정
// [put]  /centers/:center_no
exports.center_update = async function (req, res) { 

  const centerNo = req.params.center_no;
  
  // 유치원
  const center = {
    center_name: req.body.centerName,
    center_addr: req.body.centerAddr,
    center_tel: req.body.centerTel
    // TODO: 원장변경도?
  }

  Centers.update(center, { where: { center_no: centerNo }})
    .then(result => {
      if (result[0] === 1) { // 수정 완료
        console.log("유치원 수정 완료");
        res.redirect(`/centers/${centerNo}`); // 유치원 정보 조회 페이지
      } else { // 수정 실패
        res.send({
          message: "해당 정보를 찾을 수 없거나 데이터가 비어있음"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "유치원 수정 실패"
      });
    });
}


// 유치원 정보 삭제
// [delete] /centers/:center_no
exports.center_remove = async function (req, res) { 

  const centerNo = req.params.center_no;
  
  Centers.destroy({ where: { center_no: centerNo } })
    .then(result => {
      if (result == 1) { // 삭제 완료
        console.log("유치원 삭제 완료");
        res.redirect("/");
      } else { // 삭제 실패
        res.send({
          message: "해당 유치원을 찾을 수 없습니다."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "유치원 삭제 실패"
      });
    });
}
