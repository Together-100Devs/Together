"use strict";

const { deleteEvent } = require("../../controllers/events");
const { Event } = require("../../models/Event");

jest.mock("../../models/Event");
const mockedEvent = jest.mocked(Event);

describe("Event controller", () => {
  describe("deleteEvent", () => {
    let req, res;

    beforeEach(() => {
      req = {
        params: { id: "123" },
        user: { _id: "user123" },
      };
      res = {
        sendStatus: jest.fn(),
      };
      // clear mock data between tests
      jest.clearAllMocks();
    });

    test("allows moderators to delete any event", async () => {
      req.user.isModerator = true;
      const mockEvent = { _id: "123" };
      mockedEvent.findById.mockResolvedValue(mockEvent);
      mockedEvent.findByIdAndDelete.mockResolvedValue({});

      await deleteEvent(req, res);

      expect(mockedEvent.findById).toHaveBeenCalledWith("123");
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    test("allows users to delete their own events", async () => {
      req.user.isModerator = false;
      const mockEvent = { _id: "123", user: "user123" };
      mockedEvent.findOne.mockResolvedValue(mockEvent);
      mockedEvent.findByIdAndDelete.mockResolvedValue({});

      await deleteEvent(req, res);

      expect(mockedEvent.findOne).toHaveBeenCalledWith({
        _id: "123",
        user: "user123",
      });
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    test("returns 404 when event is not found", async () => {
      req.user.isModerator = false;
      mockedEvent.findOne.mockResolvedValue(null);

      await expect(deleteEvent(req, res)).rejects.toThrow();
    });
  });
});
