import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format';

export const getMatchMonth = (monthToMatch, events) => {
  if (!events.length) return [];

  return events.map(event => {
    let events = new Array(event)
    events.push(...event.dates)
    return events
  }).flat().filter(event => {
    const isoDate = parseISO(event.initialDate || event.startAt);
    const monthInString = format(isoDate, 'LLLL'); // December
    return monthToMatch === monthInString
  })
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