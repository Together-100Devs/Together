"use strict";

const { nanoid } = require("nanoid");
const { Temporal } = require("@js-temporal/polyfill");

/**
 * @param {string} date 'yyyy-mm-dd'
 * @param {string} time 'hh:mm'
 * @returns {Object} { year, month, day, hour, minute }
 */
function parseHtmlDatetime(date, time) {
  // 'yyyy-mm-dd' and 'hh:mm'
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  return { year, month, day, hour, minute };
}

/**
 * Generates an array of events
 * [ { title, description, location, groupId, startAt, endAt, rsvp }, ... ]
 * If the event is not recurring the groupId is null
 */
const createEventsArray = ({
  recurring,
  title,
  description,
  location,
  initialDate,
  finalDate,
  startTime,
  endTime,
  timeZone,
}) => {
  const { rate, days } = recurring;

  const firstStart = Temporal.PlainDateTime.from(
    parseHtmlDatetime(initialDate, startTime)
  ).toZonedDateTime(timeZone);

  const lastStart = Temporal.PlainDateTime.from(
    parseHtmlDatetime(finalDate, startTime)
  ).toZonedDateTime(timeZone);

  let firstEnd = Temporal.PlainDateTime.from(
    parseHtmlDatetime(initialDate, endTime)
  ).toZonedDateTime(timeZone);

  const diff = firstStart.until(firstEnd);
  const duration = diff.sign <= 0 ? diff.add({ days: 1 }) : diff;

  // Array of start times
  const eventStartDates = [];

  let i = 0;
  while (
    Temporal.ZonedDateTime.compare(firstStart.add({ days: i }), lastStart) <= 0
  ) {
    if (
      days.includes(firstStart.add({ days: i }).dayOfWeek.toString()) ||
      rate === "noRecurr"
    ) {
      eventStartDates.push(firstStart.add({ days: i }));
    }
    i += 1;
  }

  // Recurring events have the same group id. This allows deleting them all at once by this id.
  const groupId = rate === "noRecurr" ? null : nanoid();

  // Create dates array with events information
  const events = eventStartDates.map(date => {
    const startAt = date.epochMilliseconds;
    const endAt = date.add(duration).epochMilliseconds;
    return { title, description, location, groupId, startAt, endAt, rsvp: [] };
  });
  return events;
};

module.exports = { createEventsArray };
