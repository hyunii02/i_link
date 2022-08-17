const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Meals = db.meals;

const readXlsxFile = require("read-excel-file/node");

const Op = db.Sequelize.Op; // 검색을 위한 객체

// 식단 등록
// [post] /meals/register
exports.meal_regist = async function (req, res) {
  // *** Content-Type: application/json

  // 식단
  const meal = {
    center_no: req.body.centerNo, // 유치원별 식단
    snack_content: req.body.snackContent ? req.body.snackContent : null,
    meal_content: req.body.mealContent ? req.body.mealContent : null,
    meal_date: req.body.mealDate,
  };

  await Meals.create(meal)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "식단 등록 실패" });
    });
};

// 월별 식단 등록
// [post] /meals/register/all
exports.meal_regist_month = async function (req, res) {
  const centerNo = req.body.centerNo;
  try {
    if (req.file == undefined || req.file == null) {
      return res.status(400).json({ message: "excel file 업로드 하세요." });
    }
    let file = path.join(__dirname, "..", "uploads", "meals", req.file.filename);
    readXlsxFile(file).then((rows) => {
      rows.shift(); // 1열 생략
      let meals = [];
      rows.forEach((row) => {
        let meal = {
          center_no: centerNo,
          meal_date: row[0],
          meal_content: row[1],
          snack_content: row[2],
        };
        meals.push(meal);
      });
      Meals.bulkCreate(meals)
        .then(() => {
          res.status(200).json({ message: "식단 등록 성공" });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message, message: "식단 등록 실패" });
        });
    });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "식단 등록 실패" });
  }
};

// 식단 목록 조회
// [get]  /meals/list/:centerNo/:mealDate
exports.meal_list = async function (req, res) {
  //date(YYYY-MM)기준 월별 식단목록 받아오기
  const mealDate = req.params.mealDate;
  const centerNo = req.params.centerNo;

  await Meals.findAll({
    where: {
      center_no: centerNo,
      meal_date: db.sequelize.where(
        db.sequelize.fn("YEAR", db.sequelize.col("meal_date")),
        db.sequelize.fn("YEAR", mealDate),
      ),
      [Op.and]: db.sequelize.where(
        db.sequelize.fn("MONTH", db.sequelize.col("meal_date")),
        db.sequelize.fn("MONTH", mealDate),
      ),
    },
    raw: true,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "목록 조회 과정에 문제 발생",
      });
    });
};

// 식단 상세 조회
// [get]  /meals/:mealNo
exports.meal_detail = async function (req, res) {
  const mealNo = req.params.mealNo;

  await Meals.findByPk(mealNo)
    .then((data) => {
      if (data === null) {
        res.status(500).json({
          message: "해당 정보를 찾을 수 없습니다.",
        });
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "목록 조회 과정에 문제 발생" });
    });
};

// 식단 정보 수정
// [put]  /meals/:mealNo
exports.meal_update = async function (req, res) {
  const mealNo = req.params.mealNo;

  // 식단
  const meal = {
    snack_content: req.body.snackContent,
    meal_content: req.body.mealContent,
  };

  await Meals.update(meal, { where: { meal_no: mealNo } })
    .then(() => {
      res.status(200).json({ message: "정보 수정 완료" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "식단 수정 실패" });
    });
};

// 식단 정보 삭제
// [delete] /meals/:mealNo
exports.meal_remove = async function (req, res) {
  const mealNo = req.params.mealNo;

  await Meals.destroy({ where: { meal_no: mealNo } })
    .then((result) => {
      if (result == 1) {
        res.json({ message: "식단 삭제 완료" });
      } else {
        res.json({ message: "해당 식단을 찾을 수 없습니다." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message, message: "식단 삭제 실패" });
    });
};
