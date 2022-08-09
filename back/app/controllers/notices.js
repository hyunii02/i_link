const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Notices = db.notices;
const Op = db.Sequelize.Op;

// 공지사항 등록
// [get]  /notices/register
exports.notice_regist = async function (req, res) {};

// 공지사항 목록 조회
// [get]  /notices/list/:centerNo
exports.notice_list = async function (req, res) {};

// 공지사항 조회
// [get] /notices/:noticeNo
exports.notice_detail = async function (req, res) {};

// 공지사항 수정
// [put] /notices/:noticeNo
exports.notice_update = async function (req, res) {};

// 공지사항 삭제
// [delete] /notices/:noticeNo
exports.notice_remove = async function (req, res) {};
