const ONE_SEC_MILL_SEC = 1000;
const ONE_MIN_MILL_SEC = 1000 * 60;
const ONE_HOUR_MILL_SEC = 1000 * 60 * 60;
const ONE_DAY_MILL_SEC = 1000 * 60 * 60 * 24;
const ONE_WEEK_MILL_SEC = 1000 * 60 * 60 * 24 * 7;
const ONE_MONTH_MILL_SEC = 1000 * 60 * 60 * 24 * 30;
const ONE_YEAR_MILL_SEC = 1000 * 60 * 60 * 24 * 365;

const seconds = (millSecs) => {
  const secs = millSecs / ONE_SEC_MILL_SEC;
  return Math.floor(secs);
};

const minutes = (millSecs) => {
  const mins = millSecs / ONE_MIN_MILL_SEC;
  return Math.floor(mins);
};

const hours = (millSecs) => {
  const hrs = millSecs / ONE_HOUR_MILL_SEC;
  return Math.floor(hrs);
};

const days = (millSecs) => {
  const dys = millSecs / ONE_DAY_MILL_SEC;
  return Math.floor(dys);
};

const weeks = (millSecs) => {
  const wks = millSecs / ONE_WEEK_MILL_SEC;
  return Math.floor(wks);
};

const months = (millSecs) => {
  const mths = millSecs / ONE_MONTH_MILL_SEC;
  return Math.floor(mths);
};

const years = (millSecs) => {
  const yrs = millSecs / ONE_YEAR_MILL_SEC;
  return Math.floor(yrs);
};

export const elapsedTime = (dateInput) => {
  const date = new Date(dateInput * 1000);
  date.setSeconds(0, 0); // Set seconds and milliseconds to zero

  const candidateDateMillSec = date.getTime();
  const currentDateMillSec = new Date(Date.now()).getTime();

  // const candidateDateMillSec = date.getTime();
  // const currentDateMillSec = new Date(dateInput * 1000).getTime();

  const millSecDiff = removeMinusCharPrefix(
    currentDateMillSec - candidateDateMillSec
  );

  if (millSecDiff < ONE_MIN_MILL_SEC || seconds(millSecDiff) === 0) {
    return "a few seconds ago";
  }

  if (millSecDiff < ONE_HOUR_MILL_SEC) {
    if (minutes(millSecDiff) === 1) return "1 minute ago";
    return `${minutes(millSecDiff)} minutes ago`;
  }

  if (millSecDiff < ONE_DAY_MILL_SEC) {
    if (hours(millSecDiff) === 1) return "1 hour ago";
    return `${hours(millSecDiff)} hours ago`;
  }

  if (millSecDiff < ONE_WEEK_MILL_SEC) {
    if (days(millSecDiff) === 1) return "1 day ago";
    return `${days(millSecDiff)} days ago`;
  }

  if (millSecDiff < ONE_MONTH_MILL_SEC) {
    if (weeks(millSecDiff) === 1) return "1 week ago";
    return `${weeks(millSecDiff)} weeks ago`;
  }

  if (millSecDiff < ONE_YEAR_MILL_SEC) {
    if (months(millSecDiff) === 1) return "1 month ago";
    return `${months(millSecDiff)} months ago`;
  }

  if (millSecDiff >= ONE_YEAR_MILL_SEC) {
    if (years(millSecDiff) === 1) return "1 year ago";
    return `${years(millSecDiff)} years ago`;
  }
};

const removeMinusCharPrefix = (inputNumber) => {
  let numberString = inputNumber.toString();

  if (numberString.startsWith("-")) {
    numberString = numberString.slice(1);
  }

  return parseInt(numberString);
};
