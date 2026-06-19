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

export function run(argv: string[]) {
  const args = argv.slice(2);

  if (args.includes("-h") || args.includes("--help")) {
    console.log(HELP_MESSAGE.trim());
    return;
  }

  if (args.length === 1 && args[0] === '-y') {
    generateCurrentYearView();
    return;
  }

  if (args.length) {
    console.error('Invalid Arguments');
    console.log(HELP_MESSAGE.trim());
    process.exit(1);
  }

  generateCurrentMonthView();
}
