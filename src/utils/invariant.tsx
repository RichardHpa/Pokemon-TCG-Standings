export function invariant(value: unknown, message: string = 'Invariant violation'): asserts value {
  if (value) {
    return;
  }

  throw new Error(message);
}
