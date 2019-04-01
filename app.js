const express = require("express");
const bodyParser = require("body-parser");
const todosRouter = require("./router/todos");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/todos", todosRouter);

module.exports = app;
