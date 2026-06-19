import { getTodayDate, getDaysInMonth, getWeekDays, getMonthName, getStartDayOfWeek } from "./date-converter.js";
import { getMonthLayout } from "./layout.js";

export function generateCurrentMonthView() {
  const { monthIndex, year, dayIndex } = getTodayDate();
  return generateMonthView(year, monthIndex, dayIndex);
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
