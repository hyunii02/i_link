const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("[get] 메인 페이지");
});

router.use("/user", require("./user"));
router.use("/preschool", require("./preschool"));
router.use("/class", require("./class"));

module.exports = router;