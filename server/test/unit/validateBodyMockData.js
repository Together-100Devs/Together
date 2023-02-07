"use strict";

const { Temporal } = require("@js-temporal/polyfill");

const {
  STRING_MAX_LENGTH,
  MAX_RECURRENCE_PERIOD,
  EVENT_MAX_DATE,
} = require("../../models/Event");

const dateNow = Temporal.Now.plainDateISO();
const dateYesterday = dateNow.subtract({ days: 1 });
const dateTomorrow = dateNow.add({ days: 1 });
const dateIn5Days = dateNow.add({ days: 5 });
const dateAfterMaxPeriod = dateNow.add({ days: MAX_RECURRENCE_PERIOD + 1 });
const dateBeforeMax = Temporal.PlainDate.from(EVENT_MAX_DATE).subtract({
  days: 2,
});
const dateAfterMax = Temporal.PlainDate.from(EVENT_MAX_DATE).add({
  days: 2,
});

const timeNow = Temporal.Now.plainTimeISO().round({
  smallestUnit: "minute",
  roundingMode: "ceil",
});
const timeIn1hour = timeNow.subtract({ hours: 1 });

const validFormDataNonRecurr = {
  title: "test",
  description: "test",
  location: "test",
  discordName: "test",
  recurring: {
    rate: "noRecurr",
    days: [],
  },
  initialDate: dateNow.toString(),
  startTime: timeNow.toString().slice(0, 5),
  finalDate: dateNow.toString(),
  endTime: timeIn1hour.toString().slice(0, 5),
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

const validFormDataRecurr = {
  title: "test",
  description: "test",
  location: "test",
  discordName: "test",
  recurring: {
    rate: "weekly",
    days: ["1", "2", "3", "4", "5", "6", "7"],
  },
  initialDate: dateNow.toString(),
  startTime: timeNow.toString().slice(0, 5),
  finalDate: dateIn5Days.toString(),
  endTime: timeIn1hour.toString().slice(0, 5),
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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

const initialDateWrongFormat = {
  ...validFormDataNonRecurr,
  initialDate: "2023/11/30",
};

const startDateInThePast = {
  ...validFormDataRecurr,
  initialDate: dateYesterday.toString(),
};

const finalDateLessThanStartDateRecurr = {
  ...validFormDataRecurr,
  initialDate: dateIn5Days.toString(),
  finalDate: dateTomorrow.toString(),
};

const finalDateGreaterThanStartDateNonrecurr = {
  ...validFormDataNonRecurr,
  finalDate: dateTomorrow.toString(),
};

const exceedMaxPeriod = {
  ...validFormDataRecurr,
  finalDate: dateAfterMaxPeriod.toString(),
};

const startBeforeEndAfterMAX = {
  ...validFormDataRecurr,
  initialDate: dateBeforeMax.toString(),
  finalDate: dateAfterMax.toString(),
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
  initialDateWrongFormat,
  startDateInThePast,
  finalDateGreaterThanStartDateNonrecurr,
  exceedMaxPeriod,
  finalDateLessThanStartDateRecurr,
  startBeforeEndAfterMAX,
  alienProp,
  invalidRate,
  invalidNonRecurDays,
  invalidDayName,
};
