const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const cookieParser = require("cookie-parser");
const session = require("express-session");

// Routes
const indexRouter = require('./routes/index.routes');
const userRouter = require('./routes/users.routes');

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cookieParser());
app.use(session({
  key: "user",
  secret: "Secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});