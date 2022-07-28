const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = require("./models");

// Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});