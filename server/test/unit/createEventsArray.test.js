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

const nonRecurring = [
  {
    description: "starts and ends on the same UTC day",
    input: {
      ...commonFormFields,
      firstEventStart: Date.parse("2023-01-28T15:00:00.000+00:00"),
      firstEventEnd: Date.parse("2023-01-28T16:30:00.000+00:00"),
      lastEventStart: Date.parse("2023-01-28T15:00:00.000+00:00"),
    },
    output: [
      {
        ...commonEventFields,
        startAt: Date.parse("2023-01-28T15:00:00.000+00:00"),
        endAt: Date.parse("2023-01-28T16:30:00.000+00:00"),
      },
    ],
  },
  {
    description: "starts before midnight, ends after midnight UTC",
    input: {
      ...commonFormFields,
      firstEventStart: Date.parse("2023-01-28T23:00:00.000+00:00"),
      firstEventEnd: Date.parse("2023-01-28T01:20:00.000+00:00"),
      lastEventStart: Date.parse("2023-01-28T23:00:00.000+00:00"),
    },
    output: [
      {
        ...commonEventFields,
        startAt: Date.parse("2023-01-28T23:00:00.000+00:00"),
        endAt: Date.parse("2023-01-29T01:20:00.000+00:00"),
      },
    ],
  },
];

const recurringWET = [
  {
    description: "starts and ends on the same UTC day",
    input: {
      ...commonFormFields,
      recurring: {
        rate: "weekly",
        days: ["2"],
      },
      firstEventStart: Date.parse("2023-01-28T11:00:00.000+00:00"),
      firstEventEnd: Date.parse("2023-01-28T13:00:00.000+00:00"),
      lastEventStart: Date.parse("2023-02-15T11:00:00.000+00:00"),
    },
    output: [
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
    ],
  },
  {
    description: "starts before midnight, ends after midnight UTC",
    input: {
      ...commonFormFields,
      recurring: {
        rate: "weekly",
        days: ["0"],
      },
      firstEventStart: Date.parse("2023-01-28T23:30:00.000+00:00"),
      firstEventEnd: Date.parse("2023-01-28T01:00:00.000+00:00"),
      lastEventStart: Date.parse("2023-02-15T23:30:00.000+00:00"),
    },
    output: [
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
    ],
  },
];

const recurringPST = [
  {
    description: "starts before, ends before midnight UTC",
    input: {
      ...commonFormFields,
      recurring: {
        rate: "weekly",
        days: ["2"],
      },
      firstEventStart: Date.parse("2023-01-28T11:00:00.000-08:00"),
      firstEventEnd: Date.parse("2023-01-28T13:00:00.000-08:00"),
      lastEventStart: Date.parse("2023-02-15T11:00:00.000-08:00"),
    },
    output: [
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
    ],
  },
  {
    description: "starts before, ends after midnight UTC",
    input: {
      ...commonFormFields,
      recurring: {
        rate: "weekly",
        days: ["0"],
      },
      firstEventStart: Date.parse("2023-01-28T14:00:00.000-08:00"),
      firstEventEnd: Date.parse("2023-01-28T18:00:00.000-08:00"),
      lastEventStart: Date.parse("2023-02-15T14:00:00.000-08:00"),
    },
    output: [
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
    ],
  },
  {
    description: "starts after, ends after midnight UTC",
    input: {
      ...commonFormFields,
      recurring: {
        rate: "weekly",
        days: ["1"], // Event start next day in UTC
      },
      firstEventStart: Date.parse("2023-01-28T16:00:00.000-08:00"),
      firstEventEnd: Date.parse("2023-01-28T18:00:00.000-08:00"),
      lastEventStart: Date.parse("2023-02-15T16:00:00.000-08:00"),
    },
    output: [
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
    ],
  },
];

const recurringJST = [
  {
    description: "starts after, ends after midnight UTC",
    input: {
      ...commonFormFields,
      recurring: {
        rate: "weekly",
        days: ["6"],
      },
      firstEventStart: Date.parse("2023-01-28T11:00:00.000+09:00"),
      firstEventEnd: Date.parse("2023-01-28T13:00:00.000+09:00"),
      lastEventStart: Date.parse("2023-02-15T11:00:00.000+09:00"),
    },
    output: [
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-01-28T11:00:00.000+09:00"),
        endAt: Date.parse("2023-01-28T13:00:00.000+09:00"),
      },
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-02-04T11:00:00.000+09:00"),
        endAt: Date.parse("2023-02-04T13:00:00.000+09:00"),
      },
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-02-11T11:00:00.000+09:00"),
        endAt: Date.parse("2023-02-11T13:00:00.000+09:00"),
      },
    ],
  },
  {
    description: "starts before, ends after midnight UTC",
    input: {
      ...commonFormFields,
      recurring: {
        rate: "weekly",
        days: ["5"], // Repeat on Saturdays JST, Fridays UTC
      },
      firstEventStart: Date.parse("2023-02-04T08:00:00.000+09:00"),
      firstEventEnd: Date.parse("2023-02-04T10:00:00.000+09:00"),
      lastEventStart: Date.parse("2023-02-20T08:00:00.000+09:00"),
    },
    output: [
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-02-04T08:00:00.000+09:00"),
        endAt: Date.parse("2023-02-04T10:00:00.000+09:00"),
      },
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-02-11T08:00:00.000+09:00"),
        endAt: Date.parse("2023-02-11T10:00:00.000+09:00"),
      },
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-02-18T08:00:00.000+09:00"),
        endAt: Date.parse("2023-02-18T10:00:00.000+09:00"),
      },
    ],
  },
  {
    description: "starts before, ends before midnight UTC",
    input: {
      ...commonFormFields,
      recurring: {
        rate: "weekly",
        days: ["5"], // Repeat on Saturdays JST, Fridays UTC
      },
      firstEventStart: Date.parse("2023-02-04T02:00:00.000+09:00"),
      firstEventEnd: Date.parse("2023-02-04T04:00:00.000+09:00"),
      lastEventStart: Date.parse("2023-02-20T02:00:00.000+09:00"),
    },
    output: [
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-02-04T02:00:00.000+09:00"),
        endAt: Date.parse("2023-02-04T04:00:00.000+09:00"),
      },
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-02-11T02:00:00.000+09:00"),
        endAt: Date.parse("2023-02-11T04:00:00.000+09:00"),
      },
      {
        ...commonEventFields,
        groupId: "1234",
        startAt: Date.parse("2023-02-18T02:00:00.000+09:00"),
        endAt: Date.parse("2023-02-18T04:00:00.000+09:00"),
      },
    ],
  },
];

describe("createEventsArray", () => {
  describe("non-recurring events", () => {
    test.each(nonRecurring)("$description", ({ input, output }) => {
      const res = createEventsArray(input);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(1);
      expect(res).toEqual(output);
    });
  });

  describe("recurring events created in Western European Time (WET)", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it.each(recurringWET)("$description", ({ input, output }) => {
      mockedNanoid.mockReturnValueOnce("1234");
      const res = createEventsArray(input);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(output);
    });
  });

  describe("recurring events created in Pacific Standard Time (PST)", () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it.each(recurringPST)("$description", ({ input, output }) => {
      mockedNanoid.mockReturnValueOnce("1234");
      const res = createEventsArray(input);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(output);
    });
  });

  describe("recurring events created in Japan Standard Time (JST)", () => {
    afterAll(() => {
      jest.resetAllMocks();
    });

    it.each(recurringJST)("$description", ({ input, output }) => {
      mockedNanoid.mockReturnValueOnce("1234");
      const res = createEventsArray(input);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(output);
    });
  });
});
