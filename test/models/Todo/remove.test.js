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
});
