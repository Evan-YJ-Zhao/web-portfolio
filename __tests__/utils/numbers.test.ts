import { getRandomIntByRange, rangeInclusive } from "@/utils/numbers";

describe("utilities number function", () => {
  describe("getRandomIntByRange", () => {
    const mathRandomMock = jest.spyOn(global.Math, "random");

    it("should return a value within the range", () => {
      const result = getRandomIntByRange(5, 10);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThan(10);
    });

    it("should return the minimum value when Math.random returns 0", () => {
      mathRandomMock.mockReturnValue(0);
      const result = getRandomIntByRange(5, 10);
      expect(result).toBe(5);
    });

    it("should return the maximum value minus 1 when Math.random is near 1", () => {
      mathRandomMock.mockReturnValue(0.9999);
      const result = getRandomIntByRange(5, 10);
      expect(result).toBe(9);
    });

    it("should return the same value for min === max", () => {
      const result = getRandomIntByRange(5, 5);
      expect(result).toBe(5);
    });

    it("should work for negative ranges", () => {
      const result = getRandomIntByRange(-10, -5);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThan(-5);
    });

    it("should return -1 if max < min", () => {
      const result = getRandomIntByRange(5, 0);
      expect(result).toBe(-1);
    });
  });

  describe("rangeInclusive", () => {
    it("should return all the numbers between start (positive) and end (positive), inclusively", () => {
      const result = rangeInclusive(5, 10);
      const expectedResult = [5, 6, 7, 8, 9, 10];
      expect(result).toEqual(expectedResult);
    });

    it("should return all the numbers between start (negative) and end (negative), inclusively", () => {
      const result = rangeInclusive(-10, -5);
      const expectedResult = [-10, -9, -8, -7, -6, -5];
      expect(result).toEqual(expectedResult);
    });

    it("should return all the numbers between start (negative) and end (positive), inclusively", () => {
      const result = rangeInclusive(-3, 2);
      const expectedResult = [-3, -2, -1, 0, 1, 2];
      expect(result).toEqual(expectedResult);
    });

    it("should return the same value in a list for start === end", () => {
      const result = rangeInclusive(5, 5);
      const expectedResult = [5];
      expect(result).toEqual(expectedResult);
    });

    it("should return an empty list for end < start", () => {
      const result = rangeInclusive(10, 5);
      const expectedResult: number[] = [];
      expect(result).toEqual(expectedResult);
    });
  });
});
