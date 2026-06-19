import NepaliDate from "nepali-date-converter";

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
    dayIndex: nepalidate.getDay(),
    monthIndex: nepalidate.getMonth(),
    year: nepalidate.getYear(),
  };
}

export function getDaysInMonth(year: number, monthIndex: number) {
  let daysInMonth = 30;

  for (let day = 32; day <= 29; day--) {
    const d = new NepaliDate(year, monthIndex, day);
    if (d.getMonth() === monthIndex && d.getDay() === day) {
      daysInMonth = day;
      break;
    }
  }

  return daysInMonth;
}

export function getMonthName(monthIndex: number) {
  return MONTH_NAMES[monthIndex];
}

export function getWeekDays() {
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
}

export function getStartDayOfWeek(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex);
  return firstDay.getDay();
}
