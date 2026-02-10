import { Grid } from './Grid';

describe('Grid', () => {
  describe('isWithinBounds', () => {
    it('should return true for positions within bounds', () => {
      const grid = new Grid({ maxX: 5, maxY: 3 });

      expect(grid.isWithinBounds({ x: 0, y: 0 })).toBe(true);
      expect(grid.isWithinBounds({ x: 5, y: 3 })).toBe(true);
      expect(grid.isWithinBounds({ x: 2, y: 1 })).toBe(true);
    });

    it('should return false for positions outside bounds', () => {
      const grid = new Grid({ maxX: 5, maxY: 3 });

      expect(grid.isWithinBounds({ x: -1, y: 0 })).toBe(false);
      expect(grid.isWithinBounds({ x: 0, y: -1 })).toBe(false);
      expect(grid.isWithinBounds({ x: 6, y: 3 })).toBe(false);
      expect(grid.isWithinBounds({ x: 5, y: 4 })).toBe(false);
    });
  });

  describe('scent management', () => {
    it('should track scents at specific positions', () => {
      const grid = new Grid({ maxX: 5, maxY: 3 });

      expect(grid.hasScent({ x: 3, y: 3 })).toBe(false);

      grid.addScent({ x: 3, y: 3 });
      expect(grid.hasScent({ x: 3, y: 3 })).toBe(true);
    });

    it('should differentiate between different positions', () => {
      const grid = new Grid({ maxX: 5, maxY: 3 });

      grid.addScent({ x: 3, y: 3 });

      expect(grid.hasScent({ x: 3, y: 3 })).toBe(true);
      expect(grid.hasScent({ x: 3, y: 2 })).toBe(false);
      expect(grid.hasScent({ x: 2, y: 3 })).toBe(false);
    });
  });
});
