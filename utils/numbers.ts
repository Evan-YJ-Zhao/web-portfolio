export function getRandomIntByRange(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min));
}

// Should only return an array of length 0 or more numbers.
export function rangeInclusive(start: number, end: number): number[] {
  let length = end - start + 1 > 0 ? end - start + 1 : 0;
  return Array.from({ length }, (_, i) => start + i);
}
