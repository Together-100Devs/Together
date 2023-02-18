"use strict";

const validateBody = require("../../middleware/validateBody");
const {
  createEventSchema,
  MAX_RECURRENCE_PERIOD,
  EVENT_MAX_DATE,
} = require("../../models/Event");
const sample = require("./validateBodyMockData");

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
    it('should error when "initialDate" is in wrong format', () => {
      const req = mockRequest(sample.initialDateWrongFormat);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /fails to match the required pattern/
      );
      expect(next).not.toBeCalled();
    });

    it("should error when start date is in the past", () => {
      const req = mockRequest(sample.startDateInThePast);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /Event should start in the future/
      );
      expect(next).not.toBeCalled();
    });

    it("should error when 'finalDate' is not equal to 'initialDate' for nonrecurring events", () => {
      const req = mockRequest(sample.finalDateGreaterThanStartDateNonrecurr);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /finalDate should be equal to initialDate for non-recurring events/
      );
      expect(next).not.toBeCalled();
    });

    it("should error when 'finalDate' is before 'initialDate' for recurring events", () => {
      const req = mockRequest(sample.finalDateLessThanStartDateRecurr);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /finalDate must be greater than or equal to initialDate for recurring events/
      );
      expect(next).not.toBeCalled();
    });

    it(`should error when 'finalDate' is more than ${MAX_RECURRENCE_PERIOD} days from 'initialDate' for recurring events`, () => {
      const req = mockRequest(sample.exceedMaxPeriod);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /must be within/
      );
      expect(next).not.toBeCalled();
    });

    it(`should error when recurring event starts before and ends after ${EVENT_MAX_DATE}`, () => {
      const req = mockRequest(sample.startBeforeEndAfterMAX);
      const next = mockNext();
      expect(() => validateBody(createEventSchema)(req, null, next)).toThrow(
        /finalDate must be before/
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
