import { parseISO, format, eachDayOfInterval } from "date-fns";
import { nanoid } from "nanoid";

export const getMatchMonthAndYear = (monthToMatch, yearToMatch, events) => {
  if (!events.length) return [];

  const allMatchedEvents = events.filter(event => {
    const isoDate = parseISO(event.startAt);
    const monthInString = format(isoDate, 'LLLL'); // December
    const year = isoDate.getFullYear();
    return monthToMatch === monthInString && year === yearToMatch
  })
  return allMatchedEvents;
}

export const getEventsByDayNumber = (currentDay, allEvents) => {
  if (!allEvents.length) return [];

  return allEvents.filter(event => {
    const isoDate = parseISO(event.startAt);
    const day = format(isoDate, 'd'); // '2'
    return currentDay === Number(day)
  })
}

export const formatToLocalTime = date => {
  const isoDate = parseISO(date);
  return format(isoDate, 'p')
}

export const convertLocalDateToUTC = (htmlDate = '', htmlTime = '') => {
  const [year, month, day] = htmlDate.split('-');
  const [hour, minute] = htmlTime.split(':');

  // Create local time with form input
  const localDate = new Date(year, month - 1, day, hour, minute);

  // Convert local date to UTC date format
  return Date.UTC(localDate.getUTCFullYear(), localDate.getUTCMonth(),
    localDate.getUTCDate(), localDate.getUTCHours(),
    localDate.getUTCMinutes(), localDate.getUTCSeconds());
}

//happens on event submit
export const generateRecurringDatesArray = ({ initialDate, startTime, finalDate, endTime, title, description, location, recurring }) => {

  // If event is not recurring, generate just one event for dates array and return.
  if (recurring.rate === 'noRecurr') {
    return [{
      groupId: null,
      startAt: convertLocalDateToUTC(initialDate, startTime),
      endAt: convertLocalDateToUTC(finalDate, endTime),
    }]
  }

  // Generate UTC time from HTML input (date and time).
  const startUTC = convertLocalDateToUTC(initialDate, startTime);
  const endUTC = convertLocalDateToUTC(finalDate, endTime);

  // Generate a range of dates in between initialDate & endDate (date-fns does not generate the time sadly)
  const initialDatesToFinalDates = eachDayOfInterval({
    start: startUTC,
    end: endUTC,
  })

  // Filter out dates that are not recurring
  const result = initialDatesToFinalDates.filter(date => {
    return recurring.days.some(day => day === format(date, 'cccc'))
  })

  // Recurring events have the same group id. This allows deleting them all at once by this id.
  const groupId = nanoid();

  // Create recurring dates array with events information
  const dates = result.map(date => {
    const [month, day, year] = format(date, 'P').split('/')
    const htmlDateFormat = `${year}-${month}-${day}`;

    // Recreate date with time added
    const newStartDate = convertLocalDateToUTC(htmlDateFormat, startTime);
    const newEndDate = convertLocalDateToUTC(htmlDateFormat, endTime);

    return {
      groupId,
      startAt: newStartDate,
      endAt: newEndDate,
    }
  })
  return dates
}