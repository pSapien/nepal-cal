import { parse } from "./parse.js";
import {
  viewCurrentMonth,
  viewCurrentYearMonth,
  viewCurrentYear,
  viewYear,
  viewCurrentYearMonthByName,
  viewMonthsHelp,
} from "./core.js";

const HELP_MESSAGE = `
Usuage: ncal [options]

A command-line utility to display a formatted Nepali calendar (B.S)

Options:
  -y            Display the calendar for the entire current year
  -m [month]    Display a specific month number (1-12)
  -y [year]     Display a specific year (2000...2999) or name (e.g., asar)
  -h --help     Show this help message

Examples:
  ncal          Shows the current month
  ncal -y       Shows the 12-month grid for the current year
  ncal -y 2085  Shows the 12-month grid for the year BS 2085
  ncal -m 2     Shows Jestha (Month 2) of the current year
  ncal -m asoj  Shows Ashwin (Month 6) using a colloquial name
`

const commands = {
  "-h": () => {
    console.log(HELP_MESSAGE.trim());
  },
  "--help": () => {
    console.log(HELP_MESSAGE.trim());
  },
  "default": () => {
    console.log(viewCurrentMonth());
  },
  "-y": (year: any) => {
    if (year) {
      year = Number(year);

      if (Number.isNaN(year)) {
        invalidArgsLog();
        return;
      }

      if (year < 2000 || year > 2999) {
        console.log(`ncal: supported years include (2000..2999), received ${year}`);
        return;
      }

      console.log(viewYear(year));
      return
    }
  
    console.log(viewCurrentYear());
  },
  "-m": (monthIndexOrName: any) => {
    const userMonthIndexOrName = Number(monthIndexOrName);

    if (Number.isNaN(userMonthIndexOrName)) {
      const monthName = monthIndexOrName;
      const view = viewCurrentYearMonthByName(monthName);

      if (!view) {
        invalidArgsLog();
        console.log(viewMonthsHelp());
        return;
      }

      console.log(view);
      return;
    }

    const monthIndex = userMonthIndexOrName;
    if (monthIndex <= 0 || monthIndex > 12) {
      console.log(`ncal: ${monthIndex} is neither a month number (1..12) nor a name`);
      return;
    }

    console.log(viewCurrentYearMonth(monthIndex));
  },
  "error": () => {
    invalidArgsLog();
    process.exit(1);
  },
}

function invalidArgsLog() {
  console.error('Invalid Arguments');
  console.log(HELP_MESSAGE.trim());
}

export function run(argv: string[]) {
  return parse(argv, commands);
};