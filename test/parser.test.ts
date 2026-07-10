import * as assert from "node:assert/strict";
import { test } from "node:test";

import { parseList, parsePair } from "../src/lib/parser.js";

void test("parsePair trims and returns a key-value tuple", () => {
  assert.deepEqual(parsePair("  key : value  "), ["key", "value"]);
});

void test("parsePair rejects input containing multiple colons", () => {
  assert.throws(() => parsePair("host:localhost:3000"), {
    name: "Error",
    message: 'Invalid pair format: "host:localhost:3000". Expected "key:value".',
  });
});

void test("parseList splits comma-separated and multiline values", () => {
  assert.deepEqual(parseList(" alpha, beta\n\n gamma,\r\n delta , "), ["alpha", "beta", "gamma", "delta"]);
  assert.deepEqual(parseList(" \n,\r\n "), []);
});
