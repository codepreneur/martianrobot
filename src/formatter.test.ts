import { formatOutput } from './formatter';
import { RobotState } from './types';

describe('formatter', () => {
  it('should format robot state without LOST', () => {
    const results: RobotState[] = [
      {
        position: { x: 1, y: 1 },
        orientation: 'E',
        isLost: false
      }
    ];

    expect(formatOutput(results)).toBe('1 1 E');
  });

  it('should format robot state with LOST', () => {
    const results: RobotState[] = [
      {
        position: { x: 3, y: 3 },
        orientation: 'N',
        isLost: true
      }
    ];

    expect(formatOutput(results)).toBe('3 3 N LOST');
  });

  it('should format multiple robot states', () => {
    const results: RobotState[] = [
      {
        position: { x: 1, y: 1 },
        orientation: 'E',
        isLost: false
      },
      {
        position: { x: 3, y: 3 },
        orientation: 'N',
        isLost: true
      },
      {
        position: { x: 2, y: 3 },
        orientation: 'S',
        isLost: false
      }
    ];

    const expected = `1 1 E
3 3 N LOST
2 3 S`;

    expect(formatOutput(results)).toBe(expected);
  });
});
