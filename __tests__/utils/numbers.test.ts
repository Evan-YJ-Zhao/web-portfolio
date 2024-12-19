import { getRandomIntByRange, rangeInclusive } from "@/utils/numbers";


describe("utilities number function", () => {
  describe("getRandomIntByRange", () => {

    const mathRandomMock = jest.spyOn(global.Math, 'random');

    it('should return a value within the range', () => {
      const result = getRandomIntByRange(5, 10);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThan(10);
    });

    it('should return the minimum value when Math.random returns 0', () => {
      mathRandomMock.mockReturnValue(0);
      const result = getRandomIntByRange(5, 10);
      expect(result).toBe(5);
    });
  
    it('should return the maximum value minus 1 when Math.random is near 1', () => {
      mathRandomMock.mockReturnValue(0.9999);
      const result = getRandomIntByRange(5, 10);
      expect(result).toBe(9);
    });

    it('should return the same value for min === max', () => {
      const result = getRandomIntByRange(5, 5);
      expect(result).toBe(5);
    });
  
    it('should work for negative ranges', () => {
      const result = getRandomIntByRange(-10, -5);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThan(-5);
    });

    it("should return -1 if max is less than min", () => {
      const result = getRandomIntByRange(5, 0);
      expect(result).toBe(-1);
    });
  });

  describe("rangeInclusive", () => {
    
  });
});