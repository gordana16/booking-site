import titleize from "titleize";
import moment from "moment";

export const toUpperCase = value => (value ? titleize(value) : "");
export const getRangeOfDates = (firstDay, lastDay, dateFormat = "Y/MM/DD") => {
  const daysArr = [];
  let offDay = moment(firstDay, dateFormat);
  const mLastDay = moment(lastDay, dateFormat);
  while (offDay <= mLastDay) {
    daysArr.push(offDay.format(dateFormat));
    offDay.add(1, "day");
  }
  return daysArr;
};

//input date is string
export const dateToUTC = (sDate, dateFormat = "Y/MM/DD") => {
  return moment.utc(sDate, dateFormat).format();
};

export const pretifyDate = date => moment(date).format("MMM Do YY");
