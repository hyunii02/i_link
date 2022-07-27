const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
const PORT = process.env.PORT || 3001;

const userRouter = require('./routes/users.routes');
const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Root');
});
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});