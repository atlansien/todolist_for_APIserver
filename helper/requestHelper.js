const requestHelper = require("supertest");

module.exports = {
  request: ({ method, endPoint, statusCode }) => {
    return requestHelper(app)
      [method](endPoint)
      .set("Accept", "application/json")
      .expect("Content-Type", /application\/json/)
      .expect(statusCode);
  }
};
