const assert = require("power-assert");
const Todo = require("../../../models/Todo");

describe("Todo.create", () => {
  it("Todo.createはメソッドである", () => {
    assert.equal(typeof Todo.create, "function");
  });

  it("メソッド実行時、引数にtitleを含むプロパティ値がないとエラーになる", () => {
    const dataList = [{}, { body: "test body" }];
    dataList.forEach(data => {
      try {
        Todo.create(data);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "titleは必須です");
      }
    });
  });

  it("メソッド実行時、引数にbodyを含むプロパティ値がないとエラーになる", () => {
    try {
      Todo.create({ title: "test title" });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "bodyは必須です");
    }
  });

  it("メソッド実行時、正しい引数を渡すと新規にTodoデータを作成して、作成されたTodoを返す", () => {
    const oldTodos = Todo.findAll();
    const data = {
      title: "test title",
      body: "test body"
    };

    const createdTodo = Todo.create(data);
    assert.deepEqual(createdTodo, {
      id: createdTodo.id,
      title: createdTodo.title,
      body: createdTodo.body,
      createdAt: createdTodo.createdAt,
      updatedAt: createdTodo.updatedAt
    });

    const currentTodos = Todo.findAll();
    assert.equal(currentTodos.length, oldTodos.length + 1);
  });
});
