export function parsePair(pair: string) {
  const parts = pair.split(":").map((it: string) => it.trim());
  if (parts.length !== 2) {
    throw new Error(`Invalid pair format: "${pair}". Expected "key:value".`);
  }
  return parts as [string, string];
}

export function parseList(list: string) {
  return list.split(/\r?\n/).flatMap((line) =>
    line
      .split(",")
      .map((it) => it.trim())
      .filter((it) => it)
  );
}
