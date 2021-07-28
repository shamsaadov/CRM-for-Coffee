const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);

mongoose
  .connect(config.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

app.listen(config.PORT, () => {
  console.log(
    chalk.blue(
      `Успешное подключение к локальному серверу с портом: ${config.PORT}`
    )
  );
});
