const eachDayOfInterval = require("date-fns/eachDayOfInterval");
const format = require("date-fns/format");
const { nanoid } = require("nanoid");

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
  firstEventStart,
  firstEventEnd,
  lastEventStart,
}) => {
  const { rate, days } = recurring;

  // Array of start times
  const eventStartDates = [];
  let iter = new Date(firstEventStart);
  while (iter <= lastEventStart) {
    const utcDay = iter.getUTCDay().toString();
    // push to array if the recurring day in in the list, or if event is non-recurring
    if (days.includes(utcDay) || rate === "noRecurr") {
      eventStartDates.push(new Date(iter));
    }
    iter.setDate(iter.getDate() + 1);
  }

  // Recurring events have the same group id. This allows deleting them all at once by this id.
  const groupId = rate === "noRecurr" ? null : nanoid();

  // Create dates array with events information
  const events = eventStartDates.map(startAt => {
    let endAt = new Date(firstEventEnd);
    // The order of setting date, month, and year is important!
    endAt.setDate(startAt.getDate());
    endAt.setMonth(startAt.getMonth());
    endAt.setFullYear(startAt.getFullYear());

    if (startAt > endAt) {
      endAt.setDate(endAt.getDate() + 1);
    }

    startAt = startAt.getTime();
    endAt = endAt.getTime();

    return { title, description, location, groupId, startAt, endAt, rsvp: [] };
  });
  return events;
};

module.exports = { createEventsArray };
