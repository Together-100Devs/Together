import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format';

export const getMatchMonth = (monthToMatch, events) => {
  if (!events.length) return [];

  return events.filter(event => {
    const isoDate = parseISO(event.startDate);
    const monthInString = format(isoDate, 'LLLL'); // December
    return monthToMatch === monthInString
  })
}

export const getEventsByDayNumber = (currentDay, allEvents) => {
  if (!allEvents.length) return [];

  return allEvents.filter(event => {
    const isoDate = parseISO(event.startDate);
    const day = format(isoDate, 'd'); // '2'
    return currentDay === day
  })
}

export const formatToLocalTime = date => {
  const isoDate = parseISO(date);
  return format(isoDate, 'p')
}