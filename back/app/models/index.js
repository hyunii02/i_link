const path = require("path");

const dbConfig = require(path.join(__dirname, "..", "config", "db"));
const initModels = require(path.join(__dirname, "init-models"));

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

const models = initModels(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = models.users;
db.centers = models.centers;
db.groups = models.groups;
db.memos = models.memos;

module.exports = db;
