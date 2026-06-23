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

export function getYearLayout(configs: Config[]) {
  const monthLayouts = configs.map(c => getMonthLayout(c).split(LINE_BREAK));

  let weeks = '';
  while (monthLayouts.length) {
    const firstMonth = monthLayouts.shift()!;
    const secondMonth = monthLayouts.shift()!;
    const thirdMonth = monthLayouts.shift()!;

    for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
      const spacingBetween = SPACING.repeat(4);

      weeks += firstMonth.shift();
      weeks += spacingBetween;
      weeks += secondMonth.shift();
      weeks += spacingBetween;
      weeks += thirdMonth.shift();
      weeks += LINE_BREAK;
    }

    weeks += LINE_BREAK;
  }

  return weeks;
}

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
  const padding = Math.floor((maxWidth - headerTitle.length) / 2);
  layout.push(SPACING.repeat(padding) + headerTitle + SPACING.repeat(padding));

  /**
   * add the week string to the layout
   * @example  Ashadh 2083
   */
  layout.push(weekDaysStr);

  layout.push(getWeekLayout(config, columnGap));

  return layout.join(LINE_BREAK);
}

type WeekGridConfig = Pick<Config, "gap" | "startDayOfWeek" | "daysInMonth" | "highlightDay">;

function fillEmptyCell(count: number) {
  return Array(count).fill(SPACING + SPACING);
}

function getWeekLayout(config: WeekGridConfig, columnGap: string) {
  const { startDayOfWeek, daysInMonth, highlightDay } = config;

  const startCells = fillEmptyCell(startDayOfWeek);
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const paddedStr = day.toString().padStart(2, SPACING);
    return day === highlightDay ? highlight(paddedStr) : paddedStr;
  });

  const weekLines = chunkArr([...startCells, ...dayCells], DAYS_IN_WEEK).map((week) => {
    const lastWeek = DAYS_IN_WEEK - week.length;
    const lastWeekEmptyCells = fillEmptyCell(lastWeek);
    return [...week, ...lastWeekEmptyCells].join(columnGap);
  });

  const MAX_WEEKS = 6;
  const diff = MAX_WEEKS - weekLines.length;
  if (diff) {
    const emptyWeeks = Array({ length: diff }).map(() => {
      const emptyDays = Array.from({ length: DAYS_IN_WEEK }, () => SPACING.repeat(2));
      return emptyDays.join(columnGap);
    });
    weekLines.push(...emptyWeeks);
  }

  return weekLines.join(LINE_BREAK);
};

export function getMonthsHelpLayout(monthNames: string[], monthAliases: Record<string, number>) {
  const aliasByIndexes = new Map<number, Set<string>>();
  for (const [alias, monthIndex] of Object.entries(monthAliases)) {
    const prev = aliasByIndexes.get(monthIndex) ?? new Set();
    prev.add(alias);
    aliasByIndexes.set(monthIndex, prev);
  }

  const maxMonthName = Math.max(...monthNames.map(m => m.length));

  const monthsAliases = monthNames.map((monthName, monthIndex) => {
    const aliasesSet = aliasByIndexes.get(monthIndex);
    if (!aliasesSet) return null;

    const aliases = Array.from(aliasesSet);
    const monthSerial = `${monthIndex + 1}.`;

    return [
      monthSerial.padEnd(3, SPACING),
      monthName.padEnd(maxMonthName, SPACING),
      `(Aliases: ${aliases.join(', ')})`,
    ].join(SPACING + SPACING)
  })
  .filter(v => v !== null);

  return [
    LINE_BREAK,
    'Supported Month Names & Aliases' + LINE_BREAK,
    monthsAliases.join(LINE_BREAK),
  ].join(LINE_BREAK);
}