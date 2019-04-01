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
});
