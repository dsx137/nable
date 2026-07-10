import * as assert from "node:assert/strict";
import { test } from "node:test";

import "../src/index.js";

void test("nLet passes the receiver and returns the callback result", () => {
  const receiver = { value: 4 };

  const result = receiver.nLet((value) => {
    assert.strictEqual(value, receiver);
    return value.value * 2;
  });

  assert.equal(result, 8);
});

void test("nAlso passes the receiver and returns the same receiver", () => {
  const receiver = { value: 1 };

  const result = receiver.nAlso((value) => {
    assert.strictEqual(value, receiver);
    value.value += 1;
  });

  assert.strictEqual(result, receiver);
  assert.equal(receiver.value, 2);
});

void test("nRun binds the receiver as this and returns the callback result", () => {
  const receiver = { value: 4 };

  const result = receiver.nRun(function () {
    assert.strictEqual(this, receiver);
    return this.value * 2;
  });

  assert.equal(result, 8);
});

void test("nApply binds the receiver as this and returns the same receiver", () => {
  const receiver = { value: 1 };

  const result = receiver.nApply(function () {
    assert.strictEqual(this, receiver);
    this.value += 1;
  });

  assert.strictEqual(result, receiver);
  assert.equal(receiver.value, 2);
});

void test("onEach forwards callback arguments and returns the same array", () => {
  const values = [3, 5];
  const calls: Array<[number, number, number[]]> = [];

  const result = values.onEach((value, index, array) => {
    calls.push([value, index, array]);
  });

  assert.strictEqual(result, values);
  assert.deepEqual(calls, [
    [3, 0, values],
    [5, 1, values],
  ]);
});

void test("prototype methods are non-enumerable", () => {
  const methods: ReadonlyArray<readonly [object, string]> = [
    [Object.prototype, "nLet"],
    [Object.prototype, "nAlso"],
    [Object.prototype, "nRun"],
    [Object.prototype, "nApply"],
    [Array.prototype, "onEach"],
  ];

  for (const [prototype, name] of methods) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
    assert.ok(descriptor, `${name} should be installed`);
    assert.equal(descriptor.enumerable, false, `${name} should be non-enumerable`);
  }
});
