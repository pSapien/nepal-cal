import { parse } from "./parse.js";
import { generateCurrentMonthView, generateCurrentYearView } from "./core.js";

const HELP_MESSAGE = `
Usuage: ncal [options]

A command-line utility to display a formatted Nepali calendar (B.S)

Options:
  -y            Display the calendar for the entire current year
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
    generateCurrentMonthView();
  },
  "-y": () => {
    generateCurrentYearView();
  },
  "error": () => {
    console.error('Invalid Arguments');
    console.log(HELP_MESSAGE.trim());
    process.exit(1);
  },
}

export function run(argv: string[]) {
  return parse(argv, commands);
};