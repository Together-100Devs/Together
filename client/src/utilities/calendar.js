import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format';
import eachDayOfInterval from 'date-fns/eachDayOfInterval'

export const getMatchMonth = (monthToMatch, events) => {
  if (!events.length) return [];

  let allMatchedEvents = [];

  for (let event of events) {
    const matchedEvents = event.dates.filter(date => {
      const isoDate = parseISO(date.startAt);
      const monthInString = format(isoDate, 'LLLL'); // December
      return monthToMatch === monthInString
    });

    allMatchedEvents = [...allMatchedEvents, ...matchedEvents]
  }

  return allMatchedEvents;
}

export const getEventsByDayNumber = (currentDay, allEvents) => {
  if (!allEvents.length) return [];

  return allEvents.filter(event => {
    const isoDate = parseISO(event.initialDate || event.startAt);
    const day = format(isoDate, 'd'); // '2'
    return currentDay === Number(day)
  })
}

export const formatToLocalTime = date => {
  const isoDate = parseISO(date);
  return format(isoDate, 'p')
}

export const createDateInUTC = (htmlDate = '', htmlTime = '') => {
  const [year, month, day] = htmlDate.split('-');
  const [hour, minute] = htmlTime.split(':');

  // Month is 0 based so we need to subtract 1
  return new Date(Date.UTC(year, month - 1, day, hour, minute))
}

export const generateRecurringDatesArray = ({ initialDate, startTime, finalDate, endTime, title, description, location }) => {
  // Generate UTC time from HTML input (date and time).
  const startUTC = createDateInUTC(initialDate, startTime);
  const endUTC = createDateInUTC(finalDate, endTime);
  // Generate a range of dates in between initialDate & endDate (date-fns does not generate the time sadly)
  const result = eachDayOfInterval({
    start: startUTC,
    end: endUTC,
  })

  // Create recurring dates array with events information
  const dates = result.map(date => {
    const [month, day, year] = format(date, 'P').split('/')
    const htmlDateFormat = `${year}-${month}-${day}`;

    // Recreate date with time added
    const newStartDate = createDateInUTC(htmlDateFormat, startTime);
    const newEndDate = createDateInUTC(htmlDateFormat, endTime);

    return {
      title: title,
      description: description,
      startAt: newStartDate,
      endAt: newEndDate,
      location: location,
    }
  })

  return dates
}