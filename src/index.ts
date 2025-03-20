export * from "./lib/lazy";
export * from "./lib/utils";
export * from "./lib/parser";

export async function enableHof() {
  return await import("./lib/hof");
}
