import { Simulator } from './Simulator';
import { SimulationInput } from './Simulator';

describe('Simulator', () => {
  it('should process the sample input correctly', () => {
    const input: SimulationInput = {
      gridMaxX: 5,
      gridMaxY: 3,
      robots: [
        { x: 1, y: 1, orientation: 'E', commands: 'RFRFRFRF' },
        { x: 3, y: 2, orientation: 'N', commands: 'FRRFLLFFRRFLL' },
        { x: 0, y: 3, orientation: 'W', commands: 'LLFFFLFLFL' }
      ]
    };

    const simulator = new Simulator();
    const results = simulator.simulate(input);

    expect(results).toHaveLength(3);

    expect(results[0]).toEqual({
      position: { x: 1, y: 1 },
      orientation: 'E',
      isLost: false
    });

    expect(results[1]).toEqual({
      position: { x: 3, y: 3 },
      orientation: 'N',
      isLost: true
    });

    expect(results[2]).toEqual({
      position: { x: 2, y: 3 },
      orientation: 'S',
      isLost: false
    });
  });

  it('should handle multiple robots with scent interactions', () => {
    const input: SimulationInput = {
      gridMaxX: 5,
      gridMaxY: 3,
      robots: [
        { x: 3, y: 2, orientation: 'N', commands: 'FRRFLLFFRRFLL' },
        { x: 3, y: 3, orientation: 'N', commands: 'F' }
      ]
    };

    const simulator = new Simulator();
    const results = simulator.simulate(input);

    expect(results[0].isLost).toBe(true);
    expect(results[1].isLost).toBe(false);
  });

  it('should process robots sequentially', () => {
    const input: SimulationInput = {
      gridMaxX: 2,
      gridMaxY: 2,
      robots: [
        { x: 2, y: 2, orientation: 'N', commands: 'F' },
        { x: 2, y: 2, orientation: 'E', commands: 'F' },
        { x: 2, y: 2, orientation: 'N', commands: 'F' }
      ]
    };

    const simulator = new Simulator();
    const results = simulator.simulate(input);

    expect(results[0].isLost).toBe(true);
    expect(results[1].isLost).toBe(false);
    expect(results[2].isLost).toBe(false);
  });
});
