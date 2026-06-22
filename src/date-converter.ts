import NepaliDate, { dateConfigMap } from "nepali-date-converter";

const MONTH_NAMES = [
  "Baisakh",
  "Jestha",
  "Ashadh",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

export function getTodayDate() {
  const nepalidate = new NepaliDate();
  return {
    dayIndex: nepalidate.getDate(),
    monthIndex: nepalidate.getMonth(),
    year: nepalidate.getYear(),
  };
}

export function getMonthDate(monthIndex: number) {
  const today = new NepaliDate();
  const month = new NepaliDate(`${today.getYear()}-${monthIndex}-01`);

  return {
    dayIndex: month.getDate(),
    monthIndex: month.getMonth(),
    year: month.getYear(),
  }
}

export function getDaysInMonth(year: number, monthIndex: number) {
  const datesMap = new Map();
  Object.keys(dateConfigMap).forEach((yearKey) => {
    const monthsObj = dateConfigMap[yearKey];
    datesMap.set(yearKey,Object.values(monthsObj));
  }); 

  const yearMonthArr = datesMap.get(year.toString());
  if (!yearMonthArr) throw new Error(`Year of ${year} not supported`);

  const daysInMonth = yearMonthArr[monthIndex];
  if (daysInMonth === undefined) throw new Error("Days in month is undefined");

  return daysInMonth;
}

export function getMonthName(monthIndex: number) {
  return MONTH_NAMES[monthIndex];
}

export function getWeekDays() {
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
}

export function getStartDayOfWeek(year: number, monthIndex: number) {
  const date = new NepaliDate(`${year}-${monthIndex + 1}-01`);
  return date.getDay();
}
