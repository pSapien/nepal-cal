import { parse } from "./parse.js";
import { generateCurrentMonthView, generateCurrentYearMonthView, generateCurrentYearView } from "./core.js";

const HELP_MESSAGE = `
Usuage: ncal [options]

A command-line utility to display a formatted Nepali calendar (B.S)

Options:
  -y            Display the calendar for the entire current year
  -m [month]    Display a specific month number (1-12)
  -h --help     Show this help message

Examples:
  ncal          Shows the current month
  ncal -y       Shows the 12-month grid for the current year
`

const commands = {
  "-h": () => {
    console.log(HELP_MESSAGE.trim());
  },
  "--help": () => {
    console.log(HELP_MESSAGE.trim());
  },
  "default": () => {
    console.log(generateCurrentMonthView());
  },
  "-y": () => {
    console.log(generateCurrentYearView());
  },
  "-m": (monthIndex: any) => {
    monthIndex = Number(monthIndex);

    if (Number.isNaN(monthIndex)) {
      invalidArgsLog();
      return;
    }

    if (monthIndex <= 0 || monthIndex > 12) {
      console.log(`ncal: ${monthIndex} is neither a month number (1..12) nor a name`);
      return;
    }

    console.log(generateCurrentYearMonthView(monthIndex));
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