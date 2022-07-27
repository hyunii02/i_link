// db 연결
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'i7e102.p.ssafy.io',
  port: 3306,
  user: 'root',
  password: 'E102SSAFY!2#dd',
  database: 'ddingdong'
});

connection.connect();

module.exports = connection;