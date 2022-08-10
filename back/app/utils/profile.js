const path = require("path");
const fs = require("fs");
const multer = require("multer");

// 파일 업로드 위치
const uploadPath = path.join(__dirname, "..", "uploads", "profile");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    !fs.existsSync(uploadPath) && fs.mkdirSync(uploadPath);
    cb(null, path.join(uploadPath));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("지원하지 않는 파일 형식"), false);
  }
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 파일 최대 크기: 10MB
  },
  fileFilter: fileFilter,
});
