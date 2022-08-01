const db = require("../models");
const Class = db.class;

// 반 등록
// [post] /class/register
exports.class_regist = async function (req, res, next) {

  // *** Content-Type: application/json
  
  // 반
  const classroom = {
    preschool_no: req.body.preschoolNo, // front에서 input readonly값?
    class_name: req.body.className
  }

  await Class.create(classroom)
    .then(data => {
      console.log("반 등록 완료");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "반 등록 실패"
      });
    });
}


// 반 목록 조회
// [get]  /class/list/:preschoool_no
exports.class_list = async function (req, res) { 

  const preschool_no = req.params.preschool_no;

  await Class.findAll( {where:{ preschool_no: preschool_no }})
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


// 반 상세 조회
// [get]  /class/:class_no
exports.class_detail = async function (req, res) { 
  
  const classNo = req.params.class_no;
  const classroom = await Class.findByPk(classNo);

  if (classroom === null) { // 데이터 없음
    console.log("해당 반을 찾을 수 없습니다.");
  } else { // 검색 성공
    console.log(classroom);
    res.send(classroom);
  }

}


// 반 정보 수정
// [put]  /class/:class_no
exports.class_update = async function (req, res) { 

  const classNo = req.params.class_no;
  
  // 반
  const classroom = {
    class_name: req.body.className
  }

  await Class.update(classroom, { where: { class_no: classNo }})
    .then(result => {
      if (result[0] === 1) { // 수정 완료
        console.log("반 수정 완료");
        res.redirect(`/class/${classNo}`); // 반 정보 조회 페이지
      } else { // 수정 실패
        res.send({
          message: "해당 반을 찾을 수 없거나 데이터가 비어있음"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "반 수정 실패"
      });
    });
}


// 반 정보 삭제
// [delete] /class/:class_no
exports.class_remove = async function (req, res) { 

  const classNo = req.params.class_no;
  
  await Class.destroy({ where: { class_no: classNo } })
    .then(result => {
      if (result == 1) { // 삭제 완료
        res.send("반 삭제 완료");
      } else { // 삭제 실패
        res.send({
          message: "해당 반을 찾을 수 없습니다."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "반 삭제 실패"
      });
    });
}