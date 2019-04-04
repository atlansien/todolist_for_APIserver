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

VALID_ID = 1;
INVALID_ID = 9999999;

describe("TEST 「PUT/api/todo/:id」", () => {
  it("idが不正な場合はエラーになる", async () => {
    const data = { title: "test title", body: "test body" };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/todos/${INVALID_ID}`,
        statusCode: 400
      })
      .send(data);

    assert.deepEqual(response.body, {
      message: `idに該当するtodoが存在しません`
    });
  });

  it("titleを送らなかった場合エラーが返る", async () => {
    const data = { body: "test body" };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/todos/${VALID_ID}`,
        statusCode: 400
      })
      .send(data);

    assert.deepEqual(response.body, {
      message: `titleは必須です`
    });
  });

  it("bodyを送らなかった場合エラーが返る", async () => {
    const data = { title: "test title" };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/todos/${VALID_ID}`,
        statusCode: 400
      })
      .send(data);

    assert.deepEqual(response.body, {
      message: `bodyは必須です`
    });
  });

  it("不備なくデータを遅れたら成功", async () => {
    const oldTodos = await getTodos();

    const data = { title: "test title", body: "test body" };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/todos/${VALID_ID}`,
        statusCode: 200
      })
      .send(data);

    const updatedTodo = response.body;
    assert.deepEqual(updatedTodo, {
      id: VALID_ID,
      title: data.title,
      body: data.body,
      createdAt: updatedTodo.createdAt,
      updatedAt: updatedTodo.updatedAt
    });

    const currentTodo = await getTodos();

    assert.notEqual(oldTodos, currentTodo);
  });
});
