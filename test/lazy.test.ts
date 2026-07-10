import * as assert from "node:assert/strict";
import { test } from "node:test";

import { lazy } from "../src/lib/lazy.js";

void test("lazy defers initialization and caches the result", () => {
  let calls = 0;
  const resource = { id: 1 };
  const value = lazy({
    resource: () => {
      calls += 1;
      return resource;
    },
  });

  assert.equal(calls, 0);
  assert.strictEqual(value.resource, resource);
  assert.strictEqual(value.resource, resource);
  assert.equal(calls, 1);
});

void test("lazy supports symbol keys", () => {
  const key = Symbol("resource");
  let calls = 0;
  const value = lazy({
    [key]: () => {
      calls += 1;
      return "ready";
    },
  });

  assert.equal(value[key], "ready");
  assert.equal(value[key], "ready");
  assert.equal(calls, 1);
});

void test("lazy caches an undefined result", () => {
  let calls = 0;
  const value = lazy({
    missing: () => {
      calls += 1;
      return undefined;
    },
  });

  assert.equal(value.missing, undefined);
  assert.equal(value.missing, undefined);
  assert.equal(calls, 1);
});

void test("lazy retries an initializer after it throws", () => {
  let attempts = 0;
  const value = lazy({
    unstable: () => {
      attempts += 1;
      throw new Error(`failure ${attempts}`);
    },
  });

  assert.throws(() => value.unstable, /failure 1/);
  assert.throws(() => value.unstable, /failure 2/);
  assert.equal(attempts, 2);
});

void test("lazy initializes names inherited by the proxy target", () => {
  let calls = 0;
  const value = lazy({
    toString: () => {
      calls += 1;
      return 42;
    },
  });

  assert.equal(value.toString, 42);
  assert.equal(value.toString, 42);
  assert.equal(calls, 1);
});
