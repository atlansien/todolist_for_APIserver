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
});
