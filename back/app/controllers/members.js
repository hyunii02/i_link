const path = require("path");

const db = require(path.join(__dirname, "..", "models"));

const Users = db.users;
const Kids = db.kids;
const Op = db.Sequelize.Op; // 검색을 위한 객체

// 승인 대기중인 교사 목록
// [get]  /members/manage/teacher/:centerNo
exports.member_teacher_getList = async function (req, res) {};

// 유치원 등록 승인(유치원 반 배정)
// [put]  /members/manage/teacher/:centerNo
exports.member_teacher_approve = async function (req, res) {};

// 유치원에서 삭제
// [put]  /members/remove/teacher
exports.member_teacher_remove = async function (req, res) {};

// 승인 대기중인 원생 목록
// [get]  /members/manage/kids/:centerNo
exports.member_kid_getList = async function (req, res) {};

// 유치원 등록 승인(유치원 반 배정)
// [put]  /members/manage/kids/:centerNo
exports.member_kid_approve = async function (req, res) {};

// 유치원에서 삭제
// [put]  /members/remove/kids/
exports.member_kid_remove = async function (req, res) {};

// 교사 목록 조회
// [get]  /members/teacher/:centerNo?groupNo=[반번호]
exports.member_teacherList = async function (req, res) {};

// 원생 목록 조회
// [get]  /members/kids/:centerNo?groupNo=[반번호]
exports.member_kidsList = async function (req, res) {};
