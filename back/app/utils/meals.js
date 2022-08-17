const path = require("path");
const fs = require("fs");
const multer = require("multer");

// 파일 업로드 위치
const uploadPath = path.join(__dirname, "..", "uploads", "meals");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }, (err) => {
        console.log(err);
        throw err;
      });
    }
    cb(null, path.join(uploadPath));
  },
  filename: function (req, file, cb) {
    console.log("[middleware] profile-storage: ", file);
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
    cb(null, true);
  } else {
    req.fileValidationError = "excel 파일만 업로드 가능합니다.";
    cb(null, false);
  }
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 파일 최대 크기: 10MB
  },
  fileFilter: fileFilter,
});
