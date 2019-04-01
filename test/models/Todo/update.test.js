const assert = require("power-assert");
const Todo = require("../../../models/Todo");

describe("Todo.create", () => {
  it("Todo.createはメソッドである", () => {
    assert.equal(typeof Todo.create, "function");
  });

  it("メソッド実行時、idの引数にに適切で無いプロパティ値(数字以外や1以下の数字)がある場合はエラーになる", () => {
    const invalidIds = [[], {}, 0, -1];

    invalidIds.forEach(id => {
      try {
        Todo.update(id);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "idは必須です(1以上の数値)");
      }
    });
  });

  it("メソッド実行時、引数にtitleを含むプロパティ値がないとエラーになる", () => {
    const dateList = { id: 1, body: "test body" };

    try {
      Todo.update(dateList);
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "titleは必須です");
    }
  });

  it("メソッド実行時、引数にbodyを含むプロパティ値が無いとエラーになる,", () => {
    const dateList = { id: 1, title: "test title" };

    try {
      Todo.update(dateList);
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "bodyは必須です");
    }
  });

  it("メソッド実行時、idのプロパティ値と合致したtodoが無いとエラーになる", () => {
    const INVALID_ID = 999999999;
    const dateList = { id: INVALID_ID, title: "test title", body: "test body" };

    try {
      Todo.update(dateList);
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "idに該当するtodoが存在しません");
    }
  });

  it("メソッド実行時、適切なデータを渡すとidと合致したtodoのtitle、body、updateAtを更新して、更新されたデータを返す", () => {
    const VALID_ID = 1;
    const dateList = {
      id: VALID_ID,
      title: "test title",
      body: "test body"
    };

    const updatedTodo = Todo.update(dateList);
    assert.deepEqual(updatedTodo, {
      id: updatedTodo.id,
      title: updatedTodo.title,
      body: updatedTodo.body,
      createdAt: updatedTodo.createdAt,
      updatedAt: updatedTodo.updatedAt
    });

    const currentTodo = Todo.findAll();
    assert.deepEqual(currentTodo[0], updatedTodo);
    assert.equal(updatedTodo.updatedAt > updatedTodo.createdAt, true);
  });
});
