const express = require('express');
const todosRouter = require('./router/todos');
const app = express();
const PORT = 8080;

app.use('api/todos', todosRouter);

app.listen(PORT, () =>{
    console.log(`EXample app listening on Port ${PORT}`)
});