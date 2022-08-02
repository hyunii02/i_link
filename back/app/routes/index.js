const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("[get] 메인 페이지");
});

router.use("/users", require(path.join(__dirname, "users")));
router.use("/centers", require(path.join(__dirname, "centers")));
router.use("/groups", require(path.join(__dirname, "groups")));

module.exports = router;