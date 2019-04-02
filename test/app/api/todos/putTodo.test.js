const assert = require("power-assert");

const requestHelper = require("../../../../helper/requestHelper");

const getTodo = async () => {
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
});
