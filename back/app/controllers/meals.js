const path = require("path");

const db = require(path.join(__dirname, "..", "models"));
const Meals = db.meals;

const Op = db.Sequelize.Op; // 검색을 위한 객체

// 식단 등록
// [post] /meals/register
exports.meal_regist = async function (req, res) {
  // *** Content-Type: application/json

  // 식단
  const meal = {
    center_no: req.body.centerNo, // 유치원별 식단
    meal_type: req.body.mealType,
    meal_content: req.body.mealContent,
    meal_date: req.body.mealDate,
  };

  await Meals.create(meal)
    .then((data) => {
      console.log("식단 등록 완료");
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "식단 등록 실패",
      });
    });
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
  const meal = await Meals.findByPk(mealNo);

  if (meal === null) {
    // 데이터 없음
    console.log("해당 정보를 찾을 수 없습니다.");
    res.status(500).json({
      message: err.message || "목록 조회 과정에 문제 발생",
    });
  } else {
    // 검색 성공
    console.log(meal);
    res.status(200).json(meal);
  }
};

// 식단 정보 수정
// [put]  /meals/:mealNo
exports.meal_update = async function (req, res) {
  const mealNo = req.params.mealNo;

  // 식단
  const meal = {
    meal_type: req.body.mealType,
    meal_content: req.body.mealContent,
    meal_date: req.body.mealDate,
  };

  await Meals.update(meal, { where: { meal_no: mealNo } })
    .then((result) => {
      if (result[0] === 1) {
        // 수정 완료
        console.log("식단 수정 완료");
        res.status(200).json({
          message: "정보 수정 완료",
        });
      } else {
        // 수정 실패
        res.json({
          message: "해당 식단을 찾을 수 없거나 데이터가 비어있음",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "식단 수정 실패",
      });
    });
};

// 식단 정보 삭제
// [delete] /meals/:mealNo
exports.meal_remove = async function (req, res) {
  const mealNo = req.params.mealNo;

  await Meals.destroy({ where: { meal_no: mealNo } })
    .then((result) => {
      if (result == 1) {
        // 삭제 완료
        res.json({
          message: "식단 삭제 완료",
        });
      } else {
        // 삭제 실패
        res.json({
          message: "해당 식단을 찾을 수 없습니다.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "식단 삭제 실패",
      });
    });
};
