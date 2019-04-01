const assert = require("power-assert");
const Todo = require("../../../models/Todo");

describe("Todo.create", () => {
  it("Todo.createはメソッドである", () => {
    assert.equal(typeof Todo.create, "function");
  });

  it("idに適切で無い引数(数字以外や1以下の数字)がある場合はエラーになる", () => {
    const wrongid = [[], {}, 0, -1];

    wrongid.forEach(id => {
      try {
        Todo.update(id);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "idは必須です(1以上の数値)");
      }
    });
  });
});
