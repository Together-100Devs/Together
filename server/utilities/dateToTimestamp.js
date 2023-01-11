/**
 * Convert date and time from a form to Javascript timestamp
 * @param {string} date 'yyyy-mm-dd'
 * @param {string} time 'hh:mm'
 * @returns {Date}
 */
const dateToTimestamp = (date, time) => new Date(`${date}T${time}`).getTime();

module.exports = { dateToTimestamp };
