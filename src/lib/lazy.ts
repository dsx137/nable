export function lazy<T extends { [key: string | symbol | number]: () => unknown }>(
  initializers: T,
): { [K in keyof T]: ReturnType<T[K]> } {
  return new Proxy({} as { [K in keyof T]: ReturnType<T[K]> }, {
    get(target, prop) {
      if (!Object.hasOwn(target, prop) && Object.hasOwn(initializers, prop)) {
        target[prop as keyof T] = initializers[prop]() as ReturnType<T[keyof T]>;
      }
      return target[prop];
    },
  });
}
