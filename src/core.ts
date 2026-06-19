import { getTodayDate, getDaysInMonth, getWeekDays, getMonthName, getStartDayOfWeek } from "./date-converter.js";
import { getMonthLayout, getYearLayout } from "./layout.js";

export function generateCurrentMonthView() {
  const { monthIndex, year, dayIndex } = getTodayDate();
  return generateMonthView(year, monthIndex, dayIndex);
}

export function generateCurrentYearView() {
  return generateYearView(getTodayDate().year);
}

function generateYearView(year: number) {
  const today = getTodayDate();
  const monthInfo = Array.from({ length: 12 }, (_, idx) => {
    const monthIndex = idx;
    const highlightDay = today.monthIndex === idx && today.year === year
      ? today.dayIndex
      : -1;

    return {
      daysInMonth: getDaysInMonth(year, monthIndex),
      monthName: getMonthName(monthIndex),
      highlightDay: highlightDay,
      weekDays: getWeekDays(),
      startDayOfWeek: getStartDayOfWeek(year, monthIndex),
      year,
      gap: 1,
    };
  });

  console.log(getYearLayout(monthInfo));
}

function generateMonthView(year: number, monthIndex: number, dayIndex: number) {
  const monthLayout = getMonthLayout({
    daysInMonth: getDaysInMonth(year, monthIndex),
    monthName: getMonthName(monthIndex),
    highlightDay: dayIndex,
    weekDays: getWeekDays(),
    startDayOfWeek: getStartDayOfWeek(year, monthIndex),
    year,
    gap: 1,
  });

  console.log(monthLayout);
}
