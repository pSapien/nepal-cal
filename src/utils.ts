export function chunkArr<T>(array: T[], size: number): T[][] {
  const result = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

export function highlight(char: string | number) {
  return `\x1b[7m${char}\x1b[0m`;
}