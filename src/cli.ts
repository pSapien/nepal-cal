import { generateCurrentMonthView, generateCurrentYearView } from "./core.js";

export function run(argv: string[]) {
  const args = argv.slice(2);

  if (args.length > 1) {
    console.error();
  }


  if (args.length === 1 && args[0] === '-y') {
    return generateCurrentYearView();
  }

  generateCurrentMonthView();
}
