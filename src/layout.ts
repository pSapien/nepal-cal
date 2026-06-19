import { chunkArr, highlight } from "./utils.js";

const SPACING = " ";
const LINE_BREAK = "\n";
const DAYS_IN_WEEK = 7;

type Config = {
  year: number;
  monthName: string;
  startDayOfWeek: number;
  daysInMonth: number;
  weekDays: string[];
  highlightDay: number;
  gap: number;
};

export function getMonthLayout(config: Config) {
  const { monthName, year, weekDays, gap } = config;
  const layout = [];
  const columnGap = SPACING.repeat(gap);

  /**
   * the maximum width of a month grid
   * is the character length of the week days string
   * @example: Su Mo Tu We Th Fr Sa
   */
  const weekDaysStr = weekDays.join(columnGap);
  const maxWidth = weekDaysStr.length;

  /**
   * The header title is most likely the month year
   * @example Baishakh 2082
   */
  const headerTitle = `${monthName} ${year}`;
  const leftPadding = Math.floor((maxWidth - headerTitle.length) / 2);
  layout.push(SPACING.repeat(leftPadding) + headerTitle);

  /**
   * add the week string to the layout
   * @example  Ashadh 2083
   */
  layout.push(weekDaysStr);

  layout.push(getWeekLayout(config, columnGap));

  return layout.join(LINE_BREAK);
}

type WeekGridConfig = Pick<Config, "gap" | "startDayOfWeek" | "daysInMonth" | "highlightDay">;

function getWeekLayout(config: WeekGridConfig, columnGap: string) {
  const { startDayOfWeek, daysInMonth, highlightDay } = config;
  const emptyCells = Array(startDayOfWeek).fill(SPACING + SPACING);

  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const paddedStr = day.toString().padStart(2, SPACING);
    return day === highlightDay ? highlight(paddedStr) : paddedStr;
  });

  return chunkArr([...emptyCells, ...dayCells], DAYS_IN_WEEK)
    .map((week) => week.join(columnGap))
    .join(LINE_BREAK);
}