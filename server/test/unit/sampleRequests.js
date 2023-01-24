const {
  STRING_MAX_LENGTH,
  MAX_RECURRENCE_PERIOD,
  EVENT_MAX_DATE,
} = require("../../models/Event");

const now = new Date();

const earlier1hour = new Date(now).setHours(now.getHours() - 1);
const inOneHour = new Date(now).setHours(now.getHours() + 1);
const inTwoHours = new Date(now).setHours(now.getHours() + 2);
const in73hours = new Date(now).setHours(now.getHours() + 73);
const inThreeHours = new Date(now).setHours(now.getHours() + 3);
const inMaxAllowed = new Date(now).setDate(
  now.getDate() + MAX_RECURRENCE_PERIOD + 1
);

const max = new Date(EVENT_MAX_DATE);
const beforeMax48hours = new Date(max).setHours(max.getHours() - 48);
const beforeMax46hours = new Date(max).setHours(max.getHours() - 46);
const afterMax46hours = new Date(max).setHours(max.getHours() + 46);
const afterMax48hours = new Date(max).setHours(max.getHours() + 48);

const validFormDataNonRecurr = {
  title: "test",
  description: "test",
  location: "test",
  discordName: "test",
  recurring: {
    rate: "noRecurr",
    days: [],
  },
  firstEventStart: inOneHour,
  firstEventEnd: inTwoHours,
  lastEventStart: inOneHour,
};

const validFormDataRecurr = {
  title: "test",
  description: "test",
  location: "test",
  discordName: "test",
  recurring: {
    rate: "weekly",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  firstEventStart: inOneHour,
  firstEventEnd: inTwoHours,
  lastEventStart: in73hours,
};

const missingTitle = {
  ...validFormDataNonRecurr,
};
delete missingTitle["title"];

const emptyTitle = { ...validFormDataNonRecurr, title: "" };

const titleToLong = {
  ...validFormDataNonRecurr,
  title: "f".repeat(STRING_MAX_LENGTH + 1),
};

const firstEventStartWrongFormat = {
  ...validFormDataNonRecurr,
  firstEventStart: "2023-11-30",
};

const startDateInThePast = {
  ...validFormDataRecurr,
  firstEventStart: earlier1hour,
};

const startEqualsEnd = {
  ...validFormDataNonRecurr,
  firstEventEnd: inOneHour,
};

const lastLessThanFirstRecurr = {
  ...validFormDataRecurr,
  firstEventStart: inTwoHours,
  firstEventEnd: inThreeHours,
  lastEventStart: inOneHour,
};

const lastGreaterThanFirstNonRecurr = {
  ...validFormDataNonRecurr,
  lastEventStart: inTwoHours,
};

const exceedMaxPeriod = {
  ...validFormDataRecurr,
  lastEventStart: inMaxAllowed,
};

const startBeforeEndAfter = {
  ...validFormDataRecurr,
  firstEventStart: beforeMax48hours,
  firstEventEnd: beforeMax46hours,
  lastEventStart: afterMax48hours,
};

const startAfterEndAfter = {
  ...validFormDataRecurr,
  firstEventStart: afterMax46hours,
  firstEventEnd: afterMax48hours,
  lastEventStart: afterMax46hours,
};

const alienProp = { ...validFormDataNonRecurr, a: 1 };

const invalidRate = {
  ...validFormDataNonRecurr,
  recurring: { rate: "invalid value", days: [] },
};

const invalidNonRecurDays = {
  ...validFormDataNonRecurr,
  recurring: { rate: "noRecurr", days: ["Monday"] },
};

const invalidDayName = {
  ...validFormDataRecurr,
  recurring: { rate: "weekly", days: ["January!"] },
};

module.exports = {
  validFormDataNonRecurr,
  validFormDataRecurr,
  missingTitle,
  emptyTitle,
  titleToLong,
  firstEventStartWrongFormat,
  startDateInThePast,
  startEqualsEnd,
  lastGreaterThanFirstNonRecurr,
  exceedMaxPeriod,
  lastLessThanFirstRecurr,
  startBeforeEndAfter,
  startAfterEndAfter,
  alienProp,
  invalidRate,
  invalidNonRecurDays,
  invalidDayName,
};
