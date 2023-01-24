const validateBody = require("../../middleware/validateBody");
const {
  createEventSchema,
  MAX_RECURRENCE_PERIOD,
  EVENT_MAX_DATE,
} = require("../../models/Event");
const sample = require("./sampleRequests");

const mockRequest = body => ({ body });
const mockNext = () => jest.fn();

describe("validateBody", () => {
  describe("req.body object has no errors", () => {
    it("should call next for valid nonrecurring event", () => {
      const req = mockRequest(sample.validFormDataNonRecurr);
      const next = mockNext();
      validateBody(createEventSchema)(req, null, next);
      expect(next).toBeCalled();
    });

    it("should call next for valid recurring event", () => {
      const req = mockRequest(sample.validFormDataRecurr);
      const next = mockNext();
      validateBody(createEventSchema)(req, null, next);
      expect(next).toBeCalled();
    });
  });

  describe("req.body object shape", () => {
    it("should error when a field is missing", () => {
      const req = mockRequest(sample.missingTitle);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        '"title" is required'
      );
      expect(next).not.toBeCalled();
    });

    it("should error when there's an alien field", () => {
      const req = mockRequest(sample.alienProp);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /is not allowed/
      );
      expect(next).not.toBeCalled();
    });
  });

  describe("string fields", () => {
    it("should error when title is empty", () => {
      const req = mockRequest(sample.emptyTitle);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        '"title" is not allowed to be empty'
      );
      expect(next).not.toBeCalled();
    });

    it("should error when title is too long", () => {
      const req = mockRequest(sample.titleToLong);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /length must be less than or equal to/
      );
      expect(next).not.toBeCalled();
    });
  });

  describe("date fields", () => {
    it('should error when "firstEventStart" is in wrong format', () => {
      const req = mockRequest(sample.firstEventStartWrongFormat);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        '"firstEventStart" must be in timestamp or number of milliseconds format'
      );
      expect(next).not.toBeCalled();
    });

    it("should error when start date is in the past", () => {
      const req = mockRequest(sample.startDateInThePast);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        '"firstEventStart" must be greater than or equal to "now"'
      );
      expect(next).not.toBeCalled();
    });

    it("should error when 'firstEventEnd' equals to 'firstEventStart'", () => {
      const req = mockRequest(sample.startEqualsEnd);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        '"firstEventEnd" must be greater than "ref:firstEventStart"'
      );
      expect(next).not.toBeCalled();
    });

    it("should error when 'lastEventStart' is not equal to 'firstEventStart' for nonrecurring events", () => {
      const req = mockRequest(sample.lastGreaterThanFirstNonRecurr);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        '"lastEventStart" must be [ref:firstEventStart]'
      );
      expect(next).not.toBeCalled();
    });

    it("should error when 'lastEventStart' is less than 'firstEventStart' for recurring events", () => {
      const req = mockRequest(sample.lastLessThanFirstRecurr);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        '"lastEventStart" must be greater than or equal to "ref:firstEventStart"'
      );
      expect(next).not.toBeCalled();
    });

    it(`should error when 'lastEventStart' is more than ${MAX_RECURRENCE_PERIOD} days from 'firstEventStart' for recurring events`, () => {
      const req = mockRequest(sample.exceedMaxPeriod);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        `"lastEventStart" must be within ${MAX_RECURRENCE_PERIOD} days of "ref:firstEventStart"`
      );
      expect(next).not.toBeCalled();
    });

    it(`should error when recurring event starts before and ends after ${EVENT_MAX_DATE}`, () => {
      const req = mockRequest(sample.startBeforeEndAfter);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        `"lastEventStart" must be less than "${new Date(
          EVENT_MAX_DATE
        ).toISOString()}"`
      );
      expect(next).not.toBeCalled();
    });

    it(`should error when recurring event starts and ends after ${EVENT_MAX_DATE}`, () => {
      const req = mockRequest(sample.startAfterEndAfter);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        `"lastEventStart" must be less than "${new Date(
          EVENT_MAX_DATE
        ).toISOString()}"`
      );
      expect(next).not.toBeCalled();
    });
  });

  describe("'recurring' field", () => {
    it('should error when rucurring rate is not "noRecurr" or "weekly"', () => {
      const req = mockRequest(sample.invalidRate);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /must be one of/
      );
      expect(next).not.toBeCalled();
    });

    it('should error when rate if "noRecurr" and days is not empty', () => {
      const req = mockRequest(sample.invalidNonRecurDays);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /must contain 0 items/
      );
      expect(next).not.toBeCalled();
    });

    it("should error when day of the week is invalid", () => {
      const req = mockRequest(sample.invalidDayName);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /must be one of/
      );
      expect(next).not.toBeCalled();
    });
  });
});
