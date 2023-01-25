const maxEvents = require("../../middleware/maxEvents");
const { Event } = require("../../models/Event");

const mockRequest = user => ({ user });
const mockNext = () => jest.fn();

const mockEventDistinct = returnValue =>
  (Event.distinct = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(returnValue),
  }));

const mockEventCountDocuments = returnValue =>
  (Event.countDocuments = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(returnValue),
  }));

describe("maxEvents", () => {
  afterEach(() => {
    jest.restoreAllMocks(); // not sure if it's necessary here
  });

  it("should call next if the number of events doesn't exceed maximum allowed", async () => {
    // mongoose id can be anything in this case as mock doesn't query the db
    const req = mockRequest({ _id: "1" });
    const next = mockNext();

    // ["1", "2"].length + 2 < 5
    mockEventDistinct(["1", "2"]);
    mockEventCountDocuments(2);

    await maxEvents(req, null, next);

    expect(Event.distinct).toHaveBeenCalled();
    expect(Event.countDocuments).toHaveBeenCalled();
    expect(next).toBeCalled();
  });

  it(`should error if the number of events exceeds maximum allowed`, async () => {
    const req = mockRequest({ _id: "1" });
    const next = mockNext();

    // ["a"].length + 5 >= 5
    mockEventDistinct(["a"]);
    mockEventCountDocuments(5);

    await expect(() => maxEvents(req, null, next)).rejects.toThrow(
      /Exceeded maximum allowed events per user/
    );
    expect(Event.countDocuments).toHaveBeenCalled();
    expect(Event.distinct).toHaveBeenCalled();
    expect(next).not.toBeCalled();
  });
});
