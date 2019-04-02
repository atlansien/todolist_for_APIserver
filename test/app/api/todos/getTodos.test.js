const assert = require("power-assert");
const requestHelper = require("../../../../helper/requestHelper");

describe("test 「GET/api/todos」", () => {
  it("totosリストがjson形式としてresponse.bodyで返ってきている", async () => {
    const response = await requestHelper.request({
      method: "get",
      endPoint: "/api/todos",
      statusCode: 200
    });

    const todos = response.body;
    assert.equal(Array.isArray(todos), true);
    todos.forEach(todos => {
      assert.equal(typeof todos.id, "number");
      assert.equal(typeof todos.title, "string");
      assert.equal(typeof todos.body, "string");
      assert.equal(typeof todos.createdAt, "string");
      assert.equal(typeof todos.updatedAt, "string");
    });
  });
});
