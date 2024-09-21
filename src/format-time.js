import capitalize from 'capitalize';
import dayjs from 'dayjs';

/**
 * Relative time format object.
 */
const rtf = new Intl.RelativeTimeFormat(undefined, {
  // localeMatcher: "best fit", // other values: "lookup"
  numeric: "auto", // other values: "auto"
  style: "long", // other values: "short" or "narrow"
});

/**
 * Weekday format.
 */
const weekdayFormat = new Intl.DateTimeFormat(undefined, {
  weekday: 'long'
});

const dateForamt = new Intl.DateTimeFormat(undefined, {
  month: 'long',
  day: 'numeric'
});

/**
 * Time format
 */
const timeFormat = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit'
});

/**
 * Formats entry date/time to display.
 *
 * @param {number} timestamp The entry timestamp.
 * @return {string} The date string.
 */
export default function formatDateTime(timestamp) {
  let date = new Date(timestamp);
  return `${formatDate(date)} ${formatTime(date)}`;
}

/**
 * Formats the date component of a Date object.
 *
 * @param {Date} date The Date object to format.
 * @return {string} The formatted date string.
 */
function formatDate(date) {
  if (isToday(date)) {
    return capitalize(rtf.format(0, 'day'));
  }
  else if(isYesterday(date)) {
    return capitalize(rtf.format(-1, 'day'));
  }
  else if (sameWeek(date)){
    return weekdayFormat.format(date);
  }
  else {
    return dateForamt.format(date);
  }
}

/**
 * Formats the time component of a Date object.
 *
 * @param {Date} date The Date object to format.
 * @return {string} The formatted time string.
 */
function formatTime(date) {
  return timeFormat.format(date);
}

/**
 * Determines if the date of a Date object is today.
 *
 * @param {Date} date The standard date object to consider.
 * @return {boolean} True if the date is today; false otherwise.
 */
function isToday(date) {
  let now = new Date();

  return now.getFullYear() === date.getFullYear() &&
         now.getMonth() === date.getMonth() &&
         now.getDate() === date.getDate();
}

/**
 * Determines if a date is yesterday relative to now.
 *
 * @param {Date} date The date object to compare.
 * @returns {boolean} True if the date is yesterday; false otherwise.
 */
function isYesterday(date) {
  let now = new Date();

  return now.getFullYear() === date.getFullYear() &&
         now.getMonth() === date.getMonth() &&
         now.getDate() === date.getDate() + 1;
}

/**
 * Determine if specified time and now are in the same week.
 *
 * @param {number} time The timestamp to compare.
 * @return {boolean} True if same week; false otherwise.
 */
function sameWeek(time) {
  return dayjs(time).startOf('week').isSame(dayjs().startOf('week'));
}
