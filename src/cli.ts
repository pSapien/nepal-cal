import { program } from "commander";
import { generateCurrentMonthView } from "./core.js";

export function run(argv: string[]) {
  program
    .name("ncal")
    .description("A CLI utility to display the Nepali Calendar")
    .version("0.0.1")
    .action(() => {
      generateCurrentMonthView();
    });

  program.parse(argv);
}
