const assert = require("power-assert");
const Todo = require("../../../models/Todo");

describe("Todo.remove", () => {
  it("Todo.removeはメソッドである", () => {
    assert.equal(typeof Todo.remove, "function");
  });
  it("idの引数に１以上の数字が入ってない場合はエラーが出る", () => {
    const invValidIdList = [0, -1, null, {}, [], "1"];

    invValidIdList.forEach(id => {
      try {
        Todo.remove(id);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "idは必須です(1以上の数値)");
      }
    });
  });

  it("idの引数と合致したTodoがなかった場合はエラーが出る", () => {
    const INVALID_ID = 999999999;
    try {
      Todo.remove(INVALID_ID);
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "idに該当するtodoが存在しません");
    }
  });

  it("メソッド実行時、正しいidを渡すと指定したidのTodoが削除され、返される", () => {
    const oldTodos = Todo.findAll();
    const VALID_ID = 3;

    const removedTodo = Todo.remove(VALID_ID);
    assert.deepEqual(removedTodo, {
      id: VALID_ID,
      title: removedTodo.title,
      body: removedTodo.body,
      createdAt: removedTodo.createdAt,
      updatedAt: removedTodo.updatedAt
    });

    const currentTodos = Todo.findAll();
    assert.equal(oldTodos.length, currentTodos.length + 1);
  });
});
