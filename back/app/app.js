const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const cookieParser = require("cookie-parser");
const session = require("express-session");

// const db = require(path.join(__dirname, "models"));

// Routes
const router = require(path.join(__dirname, "routes"));

const app = express();

let isDisableKeepAlive = false;

app.use((req, res, next) => {
  if (isDisableKeepAlive) {
    res.set("Connection", "close");
  }
  next();
});

app.use(
  cors({
    origin: "*",
    methods: ["*"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
      httpOnly: true,
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Config 파일과 연결

const { swaggerUi, specs } = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// 테이블 생성 or 수정 필요 시에만 주석 해제 후 실행
// db.sequelize.sync({ force: true }); // force: 테이블 컬럼 수정

app.use("/", router);

app.listen(PORT, () => {
  process.send("ready");
  console.log(`server is running on PORT ${PORT}`);
});

process.on("SIGINT", () => {
  isDisableKeepAlive = true;
  app.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
