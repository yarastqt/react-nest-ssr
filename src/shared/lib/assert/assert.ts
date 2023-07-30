export class AssertError extends Error {}

export function assert(
  condition: unknown,
  message?: string,
): asserts condition {
  if (!condition) {
    throw new AssertError(message || 'Assert condition error');
  }
}
