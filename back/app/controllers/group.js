const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Groups = db.groups;


// 반 등록
// [post] /groups/register
exports.group_regist = async function (req, res) {

  // *** Content-Type: application/json
  
  // 반
  const group = {
    center_no: req.body.centerNo, // front에서 input readonly값?
    group_name: req.body.groupName
  }

  await Groups.create(group)
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
// [get]  /groups/list/:center_no
exports.group_list = async function (req, res) { 

  const centerNo = req.params.center_no;

  await Groups.findAll( {where:{ center_no: centerNo }})
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
// [get]  /groups/:group_no
exports.group_detail = async function (req, res) { 
  
  const groupNo = req.params.group_no;
  const group = await Groups.findByPk(groupNo);

  if (group === null) { // 데이터 없음
    console.log("해당 정보를 찾을 수 없습니다.");
  } else { // 검색 성공
    console.log(group);
    res.send(group);
  }

}


// 반 정보 수정
// [put]  /groups/:group_no
exports.group_update = async function (req, res) { 

  const groupNo = req.params.group_no;
  
  // 반
  const group = {
    group_name: req.body.groupName
  }

  await Groups.update(group, { where: { group_no: groupNo }})
    .then(result => {
      if (result[0] === 1) { // 수정 완료
        console.log("반 수정 완료");
        res.redirect(`/groups/${groupNo}`); // 반 정보 조회 페이지
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
// [delete] /groups/:group_no
exports.group_remove = async function (req, res) { 

  const groupNo = req.params.group_no;
  
  await Groups.destroy({ where: { group_no: groupNo } })
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