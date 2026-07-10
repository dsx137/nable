import * as assert from "node:assert/strict";
import { test } from "node:test";

import { getError, isEmpty, isIn, isNil, isNilOrEmpty, trimObject } from "../src/lib/utils.js";

void test("isNil recognizes only null and undefined", () => {
  assert.equal(isNil(null), true);
  assert.equal(isNil(undefined), true);
  assert.equal(isNil(""), false);
  assert.equal(isNil(0), false);
  assert.equal(isNil(false), false);
});

void test("isEmpty recognizes empty and whitespace-only strings", () => {
  assert.equal(isEmpty(""), true);
  assert.equal(isEmpty(" \t\n"), true);
  assert.equal(isEmpty(" value "), false);
});

void test("isNilOrEmpty combines nil and empty-string checks", () => {
  assert.equal(isNilOrEmpty(null), true);
  assert.equal(isNilOrEmpty(undefined), true);
  assert.equal(isNilOrEmpty(" \r\n"), true);
  assert.equal(isNilOrEmpty("value"), false);
  assert.equal(isNilOrEmpty(0), false);
  assert.equal(isNilOrEmpty(false), false);
  assert.equal(isNilOrEmpty([]), false);
});

void test("isIn uses SameValueZero membership semantics", () => {
  const member = { id: 1 };

  assert.equal(isIn([Number.NaN], Number.NaN), true);
  assert.equal(isIn([0], -0), true);
  assert.equal(isIn([member], member), true);
  assert.equal(isIn([member], { id: 1 }), false);
  assert.equal(isIn(["alpha", "beta"] as const, "gamma"), false);
});

void test("getError returns an Error message", () => {
  assert.equal(getError(new Error("failed")), "failed");
});

void test("getError normalizes a non-string Error message", () => {
  const error = new Error();
  Object.defineProperty(error, "message", { value: 42 });

  assert.equal(getError(error), "42");
});

void test("getError handles an Error with a throwing message getter", () => {
  const error = new Error();
  Object.defineProperty(error, "message", {
    get() {
      throw new Error("broken message");
    },
  });

  assert.equal(getError(error), "Unknown error");
});

void test("getError preserves JSON formatting for strings", () => {
  assert.equal(getError("failed"), '"failed"');
});

void test("getError returns a string for undefined", () => {
  assert.equal(getError(undefined), "undefined");
});

void test("getError returns a string for symbols", () => {
  assert.equal(typeof getError(Symbol("failed")), "string");
});

void test("getError returns a string for bigints", () => {
  assert.equal(typeof getError(42n), "string");
});

void test("getError returns a string for circular values", () => {
  const circular: { self?: object } = {};
  circular.self = circular;

  assert.equal(typeof getError(circular), "string");
});

void test("trimObject removes nil and empty fields recursively without traversing arrays", () => {
  const input = {
    kept: " value ",
    empty: "",
    whitespace: " \t",
    nil: null,
    missing: undefined,
    zero: 0,
    disabled: false,
    nested: {
      kept: "nested",
      empty: " ",
      nil: null,
    },
    emptyObject: {
      empty: "",
    },
    values: ["", null, " kept "],
  };

  const result = trimObject(input);

  assert.deepEqual(result, {
    kept: " value ",
    zero: 0,
    disabled: false,
    nested: {
      kept: "nested",
    },
    emptyObject: {},
    values: ["", null, " kept "],
  });
  assert.strictEqual(result.values, input.values);
  assert.equal(input.nested.empty, " ");
});
