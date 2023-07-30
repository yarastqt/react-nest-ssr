export function chain<T>(fn: (a: T) => T, ...chains: Array<(a: T) => T>) {
  return chains.reduce(
    (prevFn, nextFn) => (value) => prevFn(nextFn(value)),
    fn,
  );
}
