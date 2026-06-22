type ArgObject = Record<string, (...args: string[]) => void>;

export function parse(argv: string[], argObject: ArgObject) {
  const args = argv.slice(2);

  if (args.length === 0) {
    if (argObject["default"]) {
      argObject["default"]();
    }
    return;
  }

  const flags: string[] = [];
  const values: string[] = [];

  args.forEach((arg) => {
    if (arg.startsWith('-')) {
      flags.push(arg);
    } else {
      values.push(arg);
    }
  });

  const maybeArgObjectProp = flags.join(" ");
  if (flags.length === 0 && values.length > 0 && argObject["none"]) {
    argObject["none"](...values);
  } else if (maybeArgObjectProp && argObject[maybeArgObjectProp]) {
    argObject[maybeArgObjectProp](...values);
  } else {
    argObject["error"](...values);
  }
}