const httpError = require("../../utilities/httpError");

describe("httpError", () => {
  it('should return a custom error with message: "test"', () => {
    const res = httpError(400, "test");
    expect(res).toBeInstanceOf(Error);
    expect(res.status).toBe(400);
    expect(res.message).toBe("test");
  });

  it("should return a custom error with default message", () => {
    const res = httpError(401);
    expect(res).toBeInstanceOf(Error);
    expect(res.status).toBe(401);
    expect(res.message).toBe("Unauthorized");
  });
});
