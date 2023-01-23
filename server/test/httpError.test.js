const httpError = require("../utilities/httpError");

test("httpError is defined", () => {
  expect(httpError).toBeDefined();
});

test('httpError(400, "test") should return an Error with status: 400 and message: "test"', () => {
  const res = httpError(400, "test");
  expect(res).toBeInstanceOf(Error);
  expect(res.status).toBe(400);
  expect(res.message).toBe("test");
});

test('httpError(401) should return an Error with status: 401 and message: "Unauthorized"', () => {
  const res = httpError(401);
  expect(res).toBeInstanceOf(Error);
  expect(res.status).toBe(401);
  expect(res.message).toBe("Unauthorized");
});
