var DataTypes = require("sequelize").DataTypes;
var _albums = require("./albums");
var _centers = require("./centers");
var _files = require("./files");
var _groups = require("./groups");
var _kids = require("./kids");
var _meals = require("./meals");
var _memos = require("./memos");
var _notices = require("./notices");
var _quiz = require("./quiz");
var _quiz_results = require("./quiz_results");
var _report_types = require("./report_types");
var _reports = require("./reports");
var _surveys = require("./surveys");
var _user_types = require("./user_types");
var _users = require("./users");

function initModels(sequelize) {
  var albums = _albums(sequelize, DataTypes);
  var centers = _centers(sequelize, DataTypes);
  var files = _files(sequelize, DataTypes);
  var groups = _groups(sequelize, DataTypes);
  var kids = _kids(sequelize, DataTypes);
  var meals = _meals(sequelize, DataTypes);
  var memos = _memos(sequelize, DataTypes);
  var notices = _notices(sequelize, DataTypes);
  var quiz = _quiz(sequelize, DataTypes);
  var quiz_results = _quiz_results(sequelize, DataTypes);
  var report_types = _report_types(sequelize, DataTypes);
  var reports = _reports(sequelize, DataTypes);
  var surveys = _surveys(sequelize, DataTypes);
  var user_types = _user_types(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  groups.belongsTo(centers, { as: "center_no_center", foreignKey: "center_no" });
  centers.hasMany(groups, { as: "groups", foreignKey: "center_no" });
  kids.belongsTo(centers, { as: "center_no_center", foreignKey: "center_no" });
  centers.hasMany(kids, { as: "kids", foreignKey: "center_no" });
  meals.belongsTo(centers, { as: "center_no_center", foreignKey: "center_no" });
  centers.hasMany(meals, { as: "meals", foreignKey: "center_no" });
  notices.belongsTo(centers, { as: "center_no_center", foreignKey: "center_no" });
  centers.hasMany(notices, { as: "notices", foreignKey: "center_no" });
  users.belongsTo(centers, { as: "center_no_center", foreignKey: "center_no" });
  centers.hasMany(users, { as: "users", foreignKey: "center_no" });
  albums.belongsTo(groups, { as: "group_no_group", foreignKey: "group_no" });
  groups.hasMany(albums, { as: "albums", foreignKey: "group_no" });
  kids.belongsTo(groups, { as: "group_no_group", foreignKey: "group_no" });
  groups.hasMany(kids, { as: "kids", foreignKey: "group_no" });
  memos.belongsTo(groups, { as: "group_no_group", foreignKey: "group_no" });
  groups.hasMany(memos, { as: "memos", foreignKey: "group_no" });
  quiz.belongsTo(groups, { as: "group_no_group", foreignKey: "group_no" });
  groups.hasMany(quiz, { as: "quizzes", foreignKey: "group_no" });
  users.belongsTo(groups, { as: "group_no_group", foreignKey: "group_no" });
  groups.hasMany(users, { as: "users", foreignKey: "group_no" });
  quiz_results.belongsTo(kids, { as: "kid_no_kid", foreignKey: "kid_no" });
  kids.hasMany(quiz_results, { as: "quiz_results", foreignKey: "kid_no" });
  reports.belongsTo(kids, { as: "kid_no_kid", foreignKey: "kid_no" });
  kids.hasMany(reports, { as: "reports", foreignKey: "kid_no" });
  surveys.belongsTo(kids, { as: "kid_no_kid", foreignKey: "kid_no" });
  kids.hasMany(surveys, { as: "surveys", foreignKey: "kid_no" });
  files.belongsTo(notices, { as: "notice_no_notice", foreignKey: "notice_no" });
  notices.hasMany(files, { as: "files", foreignKey: "notice_no" });
  quiz_results.belongsTo(quiz, { as: "quiz_no_quiz", foreignKey: "quiz_no" });
  quiz.hasMany(quiz_results, { as: "quiz_results", foreignKey: "quiz_no" });
  reports.belongsTo(report_types, { as: "report_type_report_type", foreignKey: "report_type" });
  report_types.hasMany(reports, { as: "reports", foreignKey: "report_type" });
  users.belongsTo(user_types, { as: "user_type_user_type", foreignKey: "user_type" });
  user_types.hasMany(users, { as: "users", foreignKey: "user_type" });
  centers.belongsTo(users, { as: "master_no_user", foreignKey: "master_no" });
  users.hasMany(centers, { as: "centers", foreignKey: "master_no" });
  kids.belongsTo(users, { as: "parents_no_user", foreignKey: "parents_no" });
  users.hasMany(kids, { as: "kids", foreignKey: "parents_no" });
  quiz.belongsTo(users, { as: "quiz_writer_user", foreignKey: "quiz_writer" });
  users.hasMany(quiz, { as: "quizzes", foreignKey: "quiz_writer" });
  reports.belongsTo(users, { as: "report_writer_user", foreignKey: "report_writer" });
  users.hasMany(reports, { as: "reports", foreignKey: "report_writer" });

  return {
    albums,
    centers,
    files,
    groups,
    kids,
    meals,
    memos,
    notices,
    quiz,
    quiz_results,
    report_types,
    reports,
    surveys,
    user_types,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
