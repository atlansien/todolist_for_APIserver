const express = require("express");
const router = express.Router();
const controller = require("../controllers/todos");

router
  .route("/")
  .get(controller.getTodos)
  .post(controller.postTodos);

module.exports = router;
