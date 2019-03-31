const express = require('express');
const todosRouter = require('./router/todos');
const app = express();

app.use('/api/todos', todosRouter);

module.exports = app;
