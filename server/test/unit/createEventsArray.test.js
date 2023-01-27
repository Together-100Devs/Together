"use strict";

const { nanoid } = require("nanoid");
const { createEventsArray } = require("../../utilities/createEventsArray");

jest.mock("nanoid");
const mockedNanoid = jest.mocked(nanoid);

const commonFormFields = {
  title: "test",
  description: "test",
  location: "test",
  discordName: "test",
  recurring: {
    rate: "noRecurr",
    days: [],
  },
};

const commonEventFields = {
  title: "test",
  description: "test",
  location: "test",
  groupId: null,
  rsvp: [],
};

// Non-recurring event starts Jan 28, 3:00PM UTC and ends Jan 28, 4:30PM UTC
const formData1 = {
  ...commonFormFields,
  firstEventStart: Date.parse("2023-01-28T15:00:00.000+00:00"),
  firstEventEnd: Date.parse("2023-01-28T16:30:00.000+00:00"),
  lastEventStart: Date.parse("2023-01-28T15:00:00.000+00:00"),
};
const eventsArray1 = [
  {
    ...commonEventFields,
    startAt: Date.parse("2023-01-28T15:00:00.000+00:00"),
    endAt: Date.parse("2023-01-28T16:30:00.000+00:00"),
  },
];

// Non-recurring event starts Jan 28, 11:00PM UTC and ends Jan 29, 1:20AM UTC
const formData2 = {
  ...commonFormFields,
  firstEventStart: Date.parse("2023-01-28T23:00:00.000+00:00"),
  firstEventEnd: Date.parse("2023-01-28T01:20:00.000+00:00"),
  lastEventStart: Date.parse("2023-01-28T23:00:00.000+00:00"),
};
const eventsArray2 = [
  {
    ...commonEventFields,
    startAt: Date.parse("2023-01-28T23:00:00.000+00:00"),
    endAt: Date.parse("2023-01-29T01:20:00.000+00:00"),
  },
];

/**
 *  ===== WET ======
 */
// Recurring event every Tuesday UTC
// Jan 28, 11:00AM UTC - Jan 28, 1:00PM UTC
// Feb 15, 11:00AM UTC - Feb 15, 1:00PM UTC
const formData3 = {
  ...commonFormFields,
  recurring: {
    rate: "weekly",
    days: ["2"],
  },
  firstEventStart: Date.parse("2023-01-28T11:00:00.000+00:00"),
  firstEventEnd: Date.parse("2023-01-28T13:00:00.000+00:00"),
  lastEventStart: Date.parse("2023-02-15T11:00:00.000+00:00"),
};

const eventsArray3 = [
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-01-31T11:00:00.000+00:00"),
    endAt: Date.parse("2023-01-31T13:00:00.000+00:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-07T11:00:00.000+00:00"),
    endAt: Date.parse("2023-02-07T13:00:00.000+00:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-14T11:00:00.000+00:00"),
    endAt: Date.parse("2023-02-14T13:00:00.000+00:00"),
  },
];

// Recurring event every Sunday UTC
// Jan 28, 11:30PM UTC - Jan 29, 1:00AM UTC
// Feb 15, 11:30PM UTC - Feb 16, 1:00AM UTC
const formData4 = {
  ...commonFormFields,
  recurring: {
    rate: "weekly",
    days: ["0"],
  },
  firstEventStart: Date.parse("2023-01-28T23:30:00.000+00:00"),
  firstEventEnd: Date.parse("2023-01-28T01:00:00.000+00:00"),
  lastEventStart: Date.parse("2023-02-15T23:30:00.000+00:00"),
};

const eventsArray4 = [
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-01-29T23:30:00.000+00:00"),
    endAt: Date.parse("2023-01-30T01:00:00.000+00:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-05T23:30:00.000+00:00"),
    endAt: Date.parse("2023-02-06T01:00:00.000+00:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-12T23:30:00.000+00:00"),
    endAt: Date.parse("2023-02-13T01:00:00.000+00:00"),
  },
];

/**
 * ===== PST ======
 */

// Recurring event every Tuesday PST
// Jan 28, 11:00AM PST - Jan 28, 1:00PM PST
// Feb 15, 11:00AM PST - Feb 15, 1:00PM PST
const formData5 = {
  ...commonFormFields,
  recurring: {
    rate: "weekly",
    days: ["2"],
  },
  firstEventStart: Date.parse("2023-01-28T11:00:00.000-08:00"),
  firstEventEnd: Date.parse("2023-01-28T13:00:00.000-08:00"),
  lastEventStart: Date.parse("2023-02-15T11:00:00.000-08:00"),
};

const eventsArray5 = [
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-01-31T11:00:00.000-08:00"),
    endAt: Date.parse("2023-01-31T13:00:00.000-08:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-07T11:00:00.000-08:00"),
    endAt: Date.parse("2023-02-07T13:00:00.000-08:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-14T11:00:00.000-08:00"),
    endAt: Date.parse("2023-02-14T13:00:00.000-08:00"),
  },
];

// start before end after midnight utc
const formData6 = {
  ...commonFormFields,
  recurring: {
    rate: "weekly",
    days: ["0"],
  },
  firstEventStart: Date.parse("2023-01-28T14:00:00.000-08:00"),
  firstEventEnd: Date.parse("2023-01-28T18:00:00.000-08:00"),
  lastEventStart: Date.parse("2023-02-15T14:00:00.000-08:00"),
};

const eventsArray6 = [
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-01-29T14:00:00.000-08:00"),
    endAt: Date.parse("2023-01-29T18:00:00.000-08:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-05T14:00:00.000-08:00"),
    endAt: Date.parse("2023-02-05T18:00:00.000-08:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-12T14:00:00.000-08:00"),
    endAt: Date.parse("2023-02-12T18:00:00.000-08:00"),
  },
];

// start before end after midnight utc
const formData7 = {
  ...commonFormFields,
  recurring: {
    rate: "weekly",
    days: ["1"], // Event start next day in UTC
  },
  firstEventStart: Date.parse("2023-01-28T16:00:00.000-08:00"),
  firstEventEnd: Date.parse("2023-01-28T18:00:00.000-08:00"),
  lastEventStart: Date.parse("2023-02-15T16:00:00.000-08:00"),
};

const eventsArray7 = [
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-01-29T16:00:00.000-08:00"),
    endAt: Date.parse("2023-01-29T18:00:00.000-08:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-05T16:00:00.000-08:00"),
    endAt: Date.parse("2023-02-05T18:00:00.000-08:00"),
  },
  {
    ...commonEventFields,
    groupId: "1234",
    startAt: Date.parse("2023-02-12T16:00:00.000-08:00"),
    endAt: Date.parse("2023-02-12T18:00:00.000-08:00"),
  },
];

describe("createEventsArray", () => {
  describe("non-recurring events", () => {
    it("should create a non-recurring event that starts and ends on the same UTC day", () => {
      const res = createEventsArray(formData1);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(1);
      expect(res).toEqual(eventsArray1);
    });

    it("should create a non-recurring event that starts before midnight UTC and ends after midnight UTC", () => {
      const res = createEventsArray(formData2);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(1);
      expect(res).toEqual(eventsArray2);
    });
  });

  describe("recurring events created in Western European Time (WET)", () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it("should create a recurring event that starts and ends on the same date", () => {
      mockedNanoid.mockReturnValueOnce("1234");
      const res = createEventsArray(formData3);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(eventsArray3);
    });

    it("should create a recurring event that starts before midnight UTC and ends after midnight UTC", () => {
      mockedNanoid.mockReturnValueOnce("1234");
      const res = createEventsArray(formData4);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(eventsArray4);
    });
  });

  describe("recurring events created in Pacific Standard Time (PST)", () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it("should create a recurring event that starts and ends on the same date UTC", () => {
      mockedNanoid.mockReturnValueOnce("1234");
      const res = createEventsArray(formData5);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(eventsArray5);
    });

    it("should create a recurring event that starts before midnight UTC and ends after midnight UTC", () => {
      mockedNanoid.mockReturnValueOnce("1234");
      const res = createEventsArray(formData6);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(eventsArray6);
    });

    it("should create a recurring event that starts after midnight UTC and ends after midnight UTC", () => {
      mockedNanoid.mockReturnValueOnce("1234");
      const res = createEventsArray(formData7);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(eventsArray7);
    });
  });
});
