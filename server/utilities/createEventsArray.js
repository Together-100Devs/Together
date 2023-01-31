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

  // Time on the clock when the first event starts
  const plainFirstEventStart = Temporal.PlainDateTime.from(
    parseHtmlDatetime(initialDate, startTime)
  );

  // Time on the clock when the first event ends
  const plainFirstEventEnd = Temporal.PlainDateTime.from(
    parseHtmlDatetime(initialDate, endTime)
  );

  // Time on the clock when the last event starts
  const plainLastEventStart = Temporal.PlainDateTime.from(
    parseHtmlDatetime(finalDate, startTime)
  );

  // Duration is calculated based on the time clock independent of the timezone
  // e.g. event on March 12, 1AM-2AM implies that the duration is 1 hour
  const duration =
    plainFirstEventStart.until(plainFirstEventEnd).sign === 1
      ? plainFirstEventStart.until(plainFirstEventEnd)
      : plainFirstEventStart.until(plainFirstEventEnd.add({ days: 1 }));

  // Add timezone to the plain clock times
  const zonedFirstEventStart = plainFirstEventStart.toZonedDateTime(timeZone);
  const zonedLastEventStart = plainLastEventStart.toZonedDateTime(timeZone);

  // Array of start times
  const eventStartDates = [];

  let i = 0;
  while (
    Temporal.ZonedDateTime.compare(
      zonedFirstEventStart.add({ days: i }),
      zonedLastEventStart
    ) <= 0
  ) {
    if (
      days.includes(
        zonedFirstEventStart.add({ days: i }).dayOfWeek.toString()
      ) ||
      rate === "noRecurr"
    ) {
      eventStartDates.push(zonedFirstEventStart.add({ days: i }));
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
