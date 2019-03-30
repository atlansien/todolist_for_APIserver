const todos = [];

let nextId = 1;

class Todo {
    constructor({title, body}){
        this.id = nextId++,
        this.title = title,
        this.body = body,
        this.createdAt = new Date(),
        this.updatedAt = new Date()
    }
}

for (let i = 0;i < 5; i++) {
    const todo = new Todo({
        title: 'タイトル' + 1,
        body: '内容' + 1
    });
    todos.push(todo);
}

console.log(todos)

module.exports = {};