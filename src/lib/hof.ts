declare global {
  interface Object {
    nLet<T, R>(this: T, fn: (it: T) => R): R;
    nAlso<T>(this: T, fn: (it: T) => void): T;
    nRun<T, R>(this: T, fn: (this: T) => R): R;
    nApply<T>(this: T, fn: (this: T) => void): T;
  }
}
Object.defineProperty(Object.prototype, "nLet", {
  value<T, R>(this: T, fn: (it: T) => R): R {
    return fn(this);
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Object.prototype, "nAlso", {
  value<T>(this: T, fn: (it: T) => void): T {
    fn(this);
    return this;
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Object.prototype, "nRun", {
  value<T, R>(this: T, fn: () => R): R {
    return fn.call(this);
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Object.prototype, "nApply", {
  value<T>(this: T, fn: () => void): T {
    fn.call(this);
    return this;
  },
  writable: true,
  configurable: true,
});

export {};
