import { generateCurrentMonthView } from "./core.js";

export function run(argv: string[]) {
  const args = argv.slice();
  generateCurrentMonthView();
}
