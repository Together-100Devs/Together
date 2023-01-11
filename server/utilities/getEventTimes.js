/**
 * returns an array of startTime and endTime of an event
 * if the end time is before the start time it's treated
 * as the next day, e.g. start 23:30, end 1:30 next day
 * @param {string} startDate 'yyyy-mm-dd'
 * @param {string} startTime 'hh:mm'
 * @param {string} endTime 'hh:mm'
 * @returns {Array} array of Javascript timestamps
 */
const getEventTimes = (startDate, startTime, endTime) => {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${startDate}T${endTime}`);
  if (start > end) {
    end.setDate(end.getDate() + 1);
  }
  return [start.getTime(), end.getTime()];
};

module.exports = { getEventTimes };
