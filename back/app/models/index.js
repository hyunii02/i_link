const dbConfig = require("../config/db");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.preschool = require("./preschool")(sequelize, Sequelize);

// associate
db.users.hasOne(db.preschool, { foreignKey: "principal_no", sourceKey: "user_no" }); // 1명의 원장은 1개의 유치원을 가진다

module.exports = db;