const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("[get] 메인 페이지");
});

router.use("/user", require("./user"));

module.exports = router;