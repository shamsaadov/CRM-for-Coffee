require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const file = require("express-fileupload");
const cors = require("cors");
const config = require("./config");
const path = require("path");
const routes = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(file());
app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.static(path.resolve(__dirname, 'client', 'build')))

app.use(routes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(chalk.blue("Подключился к монгоДБ"));
  })
  .catch((e) => {
    console.log(
      chalk.red(
        `Ошибка подключения к базе Монго! Почитай следующее: ${e.message}`
      )
    );
  });

app.listen(process.env.PORT, () => {
  console.log(
    chalk.blue(
      `Успешное подключение к локальному серверу с портом: ${process.env.PORT}`
    )
  );
});
