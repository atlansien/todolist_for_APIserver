const assert = require("power-assert");
const requestHelper = require("../../../../helper/requestHelper");

const getTodos = async () => {
  const response = await requestHelper.request({
    method: "get",
    endPoint: "/api/todos",
    statusCode: 200
  });
  return response.body;
};

const VALID_ID = 1;
const INVALID_ID = 999999;

describe("TEST 「DELETE /api/todos」", () => {
  it("メソッド実行時、idに適切な引数が入っていなかった場合エラーがでる", async () => {
    const response = await requestHelper.request({
      method: "delete",
      endPoint: `/api/todos/${INVALID_ID}`,
      statusCode: 400
    });

    assert.deepEqual(response.body, {
      message: "idに該当するtodoが存在しません"
    });
  });
  it("適切なIDを送った場合成功する", async () => {
    const oldTodos = await getTodos();

    const response = await requestHelper.request({
      method: "delete",
      endPoint: `/api/todos/${VALID_ID}`,
      statusCode: 200
    });

    const deletedTodo = response.body;
    assert.deepEqual(deletedTodo, {
      id: VALID_ID,
      title: deletedTodo.title,
      body: deletedTodo.body,
      createdAt: deletedTodo.createdAt,
      updatedAt: deletedTodo.updatedAt
    });

    const currentTodos = await getTodos();

    assert.equal(oldTodos.length, currentTodos.length + 1);

    assert.deepEqual(deletedTodo, oldTodos[0]);

    assert.notDeepEqual(deletedTodo, currentTodos[0]);
  });
});
