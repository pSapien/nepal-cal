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

const MONTH_ALIASES: Record<string, number> = {
  baisakh: 0, baishakh: 0, bai: 0,
  jestha: 1, jeth: 1, je: 1, jet: 1,
  ashadh: 2, asar: 2, ashad: 2, asad: 2, ash: 2, as: 2,
  shrawan: 3, saun: 3, shravan: 3, shr: 3,
  bhadra: 4, bhadau: 4, bhad: 4,
  ashwin: 5, ashoj: 5, asoj: 5,
  kartik: 6, karthik: 6, kar: 6,
  mangsir: 7, mansir: 7, manghsir: 7, 
  poush: 8, pus: 8, poosh: 8, push: 8,
  magh: 9, mag: 9,
  falgun: 10, fagun: 10, phalgun: 10, fal: 10,
  chaitra: 11, chait: 11, chai: 11,
};

export function getMonthIndexByAliasName(input: string) {
  const normalized = input.trim().toLowerCase();
  if (normalized in MONTH_ALIASES) {
    return MONTH_ALIASES[normalized] + 1;
  }

  for (const [alias, monthIndex] of Object.entries(MONTH_ALIASES)) {
    if (alias.startsWith(normalized)) {
      return monthIndex + 1;
    }
  }

  return null;
}

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
