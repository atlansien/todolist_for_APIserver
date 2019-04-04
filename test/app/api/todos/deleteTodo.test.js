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
});
