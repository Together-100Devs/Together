const validateObjectId = require("../../middleware/validateObjectId");

// Request is an object that contains 'params' object
const mockRequest = params => ({ params });
// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   return res;
// };
const mockNext = () => jest.fn();

describe("validateObjectId", () => {
  it("should throw an error if mongoose ObjectId is invalid", () => {
    const req = mockRequest({ id: "1" });
    const next = mockNext();
    expect(() => validateObjectId(req, null, next)).toThrow("Not found");
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() if mongoose ObjectId is valid", () => {
    const req = mockRequest({ id: "63c722239b1a9104e164d728" });
    const next = mockNext();
    expect(() => validateObjectId(req, null, next)).not.toThrow("Not found");
    expect(next).toHaveBeenCalled();
  });
});
