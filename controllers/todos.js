const Todo = require("../models/Todo");

module.exports = {
  getTodos: (req, res) => {
    const storedTodos = Todo.findAll();

    res.status(200).json(storedTodos);
  },

  postTodo: (req, res) => {
    try {
      const { title, body } = req.body;
      const createdTodo = Todo.create({ title, body });

      res.status(200).json(createdTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  putTodo: (req, res) => {
    const id = req.params.id;
    const parseId = parseInt(id, 10);
    const { title, body } = req.body;

    try {
      const updatedTodo = Todo.update({
        id: parseId,
        title,
        body
      });

      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
