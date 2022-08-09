require("dotenv").config();

const path = require("path");
const redisClient = require(path.join(__dirname, "..", "config", "redis"));

const jwt = require("jsonwebtoken");
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// 토큰 검증
function verifyToken(req, res, next) {
  try {
    // Bearer [access-token]
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    console.log(decoded);
    req.body.user = {
      userNo: decoded.userNo,
      userName: decoded.userName,
      userType: decoded.userType,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      logined: false,
      message: "유효하지 않은 세션",
      data: err,
    });
  }
}

// 갱신 토큰 검증
function verifyRefreshToken(req, res, next) {
  const token = req.body.token;
  if (token === null || token === "" || token === undefined) {
    return res.status(401).json({
      logined: false,
      message: "잘못된 요청",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    console.log(decoded);
    redisClient.get(decoded.user_no.toString(), (err, data) => {
      if (err) {
        // throw err;
        console.log("fff", err.message);
        return res.status(500).json({
          message: "DB에서 토큰 가져오기 실패",
        });
      }
      if (data === null) {
        return res.status(401).json({
          logined: false,
          message: "토큰이 저장되어 있지 않음",
        });
      }
      if (JSON.parse(data).token != token) {
        return res.status(403).json({
          logined: false,
          message: "토큰이 일치하지 않음",
        });
      }
    });
    next();
  } catch (err) {
    // redis에 갱신 토큰 없음
    return res.status(401).json({
      logined: false,
      message: "토큰 만료",
      data: err.message,
    });
  }
}

module.exports = {
  verifyToken,
  verifyRefreshToken,
};
