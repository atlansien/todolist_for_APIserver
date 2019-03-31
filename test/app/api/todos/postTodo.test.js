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

describe("test 「POST /api/todos」", () => {
  it("titleを送らなかった場合400エラーが返る", async () => {
    const postData = { body: "test body" };

    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 400
      })
      .send(postData);

    assert.deepEqual(response.body, {
      message: "titleは必須です"
    });
  });

  it("bodyを送らなかった場合400エラーが返る", async () => {
    const postData = { title: "test title" };

    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 400
      })
      .send(postData);

    assert.deepEqual(response.body, {
      message: "bodyは必須です"
    });
  });

  it("title,bodyを送ったら成功する", async () => {
    const oldTodos = await getTodos();
    const postData = { title: "test title", body: "test body" };

    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/todos",
        statusCode: 200
      })
      .send(postData);

    const todos = response.body;
    assert.deepEqual(todos, {
      id: todos.id,
      title: todos.title,
      body: todos.body,
      createdAt: todos.createdAt,
      updatedAt: todos.updatedAt
    });

    const currentTodos = await getTodos();
    assert.equal(oldTodos.length + 1, currentTodos.length);
  });
});
