import { Robot } from './Robot';
import { Grid } from './Grid';

describe('Robot', () => {
  describe('turning', () => {
    it('should turn left correctly from all orientations', () => {
      const robotN = new Robot(0, 0, 'N');
      const robotE = new Robot(0, 0, 'E');
      const robotS = new Robot(0, 0, 'S');
      const robotW = new Robot(0, 0, 'W');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robotN.executeCommands('L', grid);
      robotE.executeCommands('L', grid);
      robotS.executeCommands('L', grid);
      robotW.executeCommands('L', grid);

      expect(robotN.getState().orientation).toBe('W');
      expect(robotE.getState().orientation).toBe('N');
      expect(robotS.getState().orientation).toBe('E');
      expect(robotW.getState().orientation).toBe('S');
    });

    it('should turn right correctly from all orientations', () => {
      const robotN = new Robot(0, 0, 'N');
      const robotE = new Robot(0, 0, 'E');
      const robotS = new Robot(0, 0, 'S');
      const robotW = new Robot(0, 0, 'W');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robotN.executeCommands('R', grid);
      robotE.executeCommands('R', grid);
      robotS.executeCommands('R', grid);
      robotW.executeCommands('R', grid);

      expect(robotN.getState().orientation).toBe('E');
      expect(robotE.getState().orientation).toBe('S');
      expect(robotS.getState().orientation).toBe('W');
      expect(robotW.getState().orientation).toBe('N');
    });

    it('should handle full rotations', () => {
      const robot = new Robot(0, 0, 'N');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robot.executeCommands('LLLL', grid);
      expect(robot.getState().orientation).toBe('N');

      robot.executeCommands('RRRR', grid);
      expect(robot.getState().orientation).toBe('N');
    });
  });

  describe('moving forward', () => {
    it('should move north correctly', () => {
      const robot = new Robot(0, 0, 'N');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robot.executeCommands('F', grid);

      const state = robot.getState();
      expect(state.position).toEqual({ x: 0, y: 1 });
      expect(state.isLost).toBe(false);
    });

    it('should move east correctly', () => {
      const robot = new Robot(0, 0, 'E');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robot.executeCommands('F', grid);

      const state = robot.getState();
      expect(state.position).toEqual({ x: 1, y: 0 });
      expect(state.isLost).toBe(false);
    });

    it('should move south correctly', () => {
      const robot = new Robot(0, 1, 'S');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robot.executeCommands('F', grid);

      const state = robot.getState();
      expect(state.position).toEqual({ x: 0, y: 0 });
      expect(state.isLost).toBe(false);
    });

    it('should move west correctly', () => {
      const robot = new Robot(1, 0, 'W');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robot.executeCommands('F', grid);

      const state = robot.getState();
      expect(state.position).toEqual({ x: 0, y: 0 });
      expect(state.isLost).toBe(false);
    });
  });

  describe('falling off the grid', () => {
    it('should become lost when moving off the grid', () => {
      const robot = new Robot(0, 0, 'S');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robot.executeCommands('F', grid);

      const state = robot.getState();
      expect(state.position).toEqual({ x: 0, y: 0 });
      expect(state.isLost).toBe(true);
    });

    it('should leave a scent when falling off', () => {
      const robot = new Robot(0, 0, 'S');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robot.executeCommands('F', grid);

      expect(grid.hasScent({ x: 0, y: 0 })).toBe(true);
    });

    it('should stop executing commands after becoming lost', () => {
      const robot = new Robot(0, 0, 'S');
      const grid = new Grid({ maxX: 5, maxY: 5 });

      robot.executeCommands('FFF', grid);

      const state = robot.getState();
      expect(state.position).toEqual({ x: 0, y: 0 });
      expect(state.isLost).toBe(true);
    });
  });

  describe('scent prevention', () => {
    it('should ignore move command if scent exists at current position', () => {
      const grid = new Grid({ maxX: 5, maxY: 5 });

      const robot1 = new Robot(0, 0, 'S');
      robot1.executeCommands('F', grid);
      expect(robot1.getState().isLost).toBe(true);

      const robot2 = new Robot(0, 0, 'S');
      robot2.executeCommands('F', grid);
      const state = robot2.getState();
      expect(state.position).toEqual({ x: 0, y: 0 });
      expect(state.isLost).toBe(false);
    });

    it('should allow robot to turn and move in different direction after scent prevents fall', () => {
      const grid = new Grid({ maxX: 5, maxY: 5 });

      const robot1 = new Robot(0, 0, 'S');
      robot1.executeCommands('F', grid);

      const robot2 = new Robot(0, 0, 'S');
      robot2.executeCommands('FRF', grid);
      const state = robot2.getState();
      expect(state.position).toEqual({ x: 0, y: 0 });
      expect(state.orientation).toBe('W');
      expect(state.isLost).toBe(false);
    });
  });

  describe('complex movements', () => {
    it('should handle the first sample robot correctly', () => {
      const robot = new Robot(1, 1, 'E');
      const grid = new Grid({ maxX: 5, maxY: 3 });

      robot.executeCommands('RFRFRFRF', grid);

      const state = robot.getState();
      expect(state.position).toEqual({ x: 1, y: 1 });
      expect(state.orientation).toBe('E');
      expect(state.isLost).toBe(false);
    });
  });
});
