import { getTodayDate, getDaysInMonth, getWeekDays, getMonthName, getStartDayOfWeek, getMonthDate } from "./date-converter.js";
import { getMonthLayout, getYearLayout } from "./layout.js";

export function viewCurrentMonth() {
  const today = getTodayDate();
  return getMonthLayout(getMonthConfig(today.year, today.monthIndex));
}

export function viewCurrentYearMonth(monthIndex: number) {
  const month = getMonthDate(monthIndex);
  return getMonthLayout(getMonthConfig(month.year, month.monthIndex));
}

export function viewCurrentYear() {
  return viewYear(getTodayDate().year);
}

export function viewYear(year: number) {
  const monthInfo = Array.from({ length: 12 }, (_, monthIndex) => {
    return getMonthConfig(year, monthIndex);
  });

  return getYearLayout(monthInfo);
}

function getMonthConfig(year: number, monthIndex: number) {
  const today = getTodayDate();
  const highlightDay = today.monthIndex === monthIndex && today.year === year ? today.dayIndex : -1;
  return {
    daysInMonth: getDaysInMonth(year, monthIndex),
    monthName: getMonthName(monthIndex),
    highlightDay,
    weekDays: getWeekDays(),
    startDayOfWeek: getStartDayOfWeek(year, monthIndex),
    year,
    gap: 1,
  };
}