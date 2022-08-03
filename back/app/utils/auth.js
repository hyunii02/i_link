require("dotenv").config();

const path = require("path");
const redisClient = require(path.join(__dirname, "..", "config", "redis"));

const jwt = require("jsonwebtoken");
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;


function verifyToken (req, res) {
  try {
    // Bearer tokenstring
    const token = req.headers.authorization.split(' ')[1];
    
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.body.userNo = decoded.userNo;
  } catch (err) {
    return res.status(401).send({
      logined: false,
      message: "유효하지 않은 세션",
      data: err
    });
  }
}


function verifyRefreshToken (req, res, next) {
  const token = req.body.token;

  if (token === null) {
    return res.status(401).send({
      logined: false,
      message: "잘못된 요청"
    }); 
  }

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    req.body.userNo = decoded.userNo;

    // 토큰이 저장되어있는지 아닌지 검사

    ////////////////////////////////////////// redis 전에 자료구조로 테스트
    // let storedRefreshToken = refreshTokens.find(x => x.userNo === decoded.userNo);

    // // 토큰이 없는 경우
    // if (storedRefreshToken === undefined) {
    //   return res.status(401).send({
    //     logined: false,
    //     message: "토큰이 저장되어 있지 않음"
    //   });
    // }

    // if (storedRefreshToken.token != token) {
    //   return res.status(401).send({
    //     logined: false,
    //     message: "토큰이 일치하지 않음"
    //   });
    // }

    redisClient.get(decoded.userNo, (err, data) => { // integer도 toString()?
      if (err) throw err;
      if (data === null) {
        return res.status(401).send({
          logined: false,
          message: "토큰이 저장되어 있지 않음"
        });
      }
      if (JSON.parse(data).token != token) {
        return res.status(401).send({
          logined: false,
          message: "토큰이 일치하지 않음"
        });
      }
    })

    next();
  } catch (err) {
    return res.status(401).send({
      logined: false,
      message: "세션이 유효하지 않습니다.",
      data: err
    });
  }
}

module.exports = {
  verifyToken, verifyRefreshToken
}