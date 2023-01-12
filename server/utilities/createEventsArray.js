const eachDayOfInterval = require("date-fns/eachDayOfInterval");
const format = require("date-fns/format");
const { nanoid } = require("nanoid");
const { dateToTimestamp } = require("./dateToTimestamp");
const { getEventTimes } = require("./getEventTimes");

/**
 * Generates an array of events
 * [ { title, description, location, groupId, startAt, endAt, rsvp }, ... ]
 * If the event is not recurring the groupId is null
 */
const createEventsArray = ({
  initialDate,
  startTime,
  finalDate,
  endTime,
  recurring,
  title,
  description,
  location,
}) => {
  // If event is not recurring, generate just one event for dates array and return.
  if (recurring.rate === "noRecurr") {
    const [startAt, endAt] = getEventTimes(initialDate, startTime, endTime);
    return [
      { title, description, location, groupId: null, startAt, endAt, rsvp: [] },
    ];
  }

  // Generate a range of dates in between initialDate & endDate (date-fns does not generate the time sadly)
  const dateRange = eachDayOfInterval({
    start: dateToTimestamp(initialDate, startTime),
    end: dateToTimestamp(finalDate, endTime),
  });

  // Filter out dates that are not recurring
  const eventStartDates = dateRange.filter(date =>
    recurring.days.includes(format(date, "cccc"))
  );

  // Recurring events have the same group id. This allows deleting them all at once by this id.
  const groupId = nanoid();

  // Create recurring dates array with events information
  const events = eventStartDates.map(date => {
    const [month, day, year] = format(date, "P").split("/");
    const htmlDateFormat = `${year}-${month}-${day}`;

    // Recreate date with time added
    const [startAt, endAt] = getEventTimes(htmlDateFormat, startTime, endTime);
    return { title, description, location, groupId, startAt, endAt, rsvp: [] };
  });
  return events;
};

module.exports = { createEventsArray };
