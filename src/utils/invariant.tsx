export function invariant(value: unknown): asserts value {
  if (value) {
    return;
  }

  throw new Error('Invariant violation');
}
