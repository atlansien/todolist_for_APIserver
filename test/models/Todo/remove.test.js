const assert = require("power-assert");
const Todo = require("../../../models/Todo");

describe("Todo.remove", () => {
  it("Todo.removeはメソッドである", () => {
    assert.equal(typeof Todo.remove, "function");
  });
});
