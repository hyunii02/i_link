const path = require("path");
const fs = require("fs");
const multer = require("multer");

// 파일 업로드 위치
const uploadPath = path.join(__dirname, "..", "uploads", "attachment");

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
    console.log("[middleware] attachment-storage: ", file);
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  let extend = ["bat", "cmd", "com", "cpl", "dll", "exe", "jar", "js", "msi", "sys"];
  if (extend.includes(path.extname(file.originalname).substr(1))) {
    req.fileValidationError = "제한된 형식의 첨부파일입니다.";
    cb(null, false);
  } else {
    cb(null, true);
  }
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 25, // 파일 최대 크기: 25MB
  },
  fileFilter: fileFilter,
});
