const validateObjectId = require("../middleware/validateObjectId");

// Request is an object that contains 'params' object
const mockRequest = params => ({ params });
// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   return res;
// };
const mockNext = () => jest.fn();

test("invalid mongoose ObjectId of '1' should throw an error", () => {
  const req = mockRequest({ id: '1' });
  const next = mockNext();
  expect(() => validateObjectId(req, null, next)).toThrow("Not found");
  expect(next).not.toHaveBeenCalled();
});

test("valid mongoose ObjectId of 63c722239b1a9104e164d728 should call next()", () => {
  const req = mockRequest({ id: "63c722239b1a9104e164d728" });
  const next = mockNext();
  // validateObjectId(req, null, next);
  expect(() => validateObjectId(req, null, next)).not.toThrow("Not found");
  expect(next).toHaveBeenCalled();
});
