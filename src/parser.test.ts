import { parseInput } from './parser';

describe('parser', () => {
  it('should parse valid sample input', () => {
    const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

    const result = parseInput(input);

    expect(result.gridMaxX).toBe(5);
    expect(result.gridMaxY).toBe(3);
    expect(result.robots).toHaveLength(3);

    expect(result.robots[0]).toEqual({
      x: 1,
      y: 1,
      orientation: 'E',
      commands: 'RFRFRFRF'
    });

    expect(result.robots[1]).toEqual({
      x: 3,
      y: 2,
      orientation: 'N',
      commands: 'FRRFLLFFRRFLL'
    });

    expect(result.robots[2]).toEqual({
      x: 0,
      y: 3,
      orientation: 'W',
      commands: 'LLFFFLFLFL'
    });
  });

  it('should handle extra whitespace', () => {
    const input = `  5   3
  1   1   E
  RFRFRFRF  `;

    const result = parseInput(input);

    expect(result.gridMaxX).toBe(5);
    expect(result.gridMaxY).toBe(3);
    expect(result.robots).toHaveLength(1);
  });

  it('should throw error for missing grid bounds', () => {
    expect(() => parseInput('')).toThrow('Invalid input: missing grid bounds');
  });

  it('should throw error for invalid grid bounds', () => {
    expect(() => parseInput('abc def')).toThrow('Invalid grid bounds');
    expect(() => parseInput('-1 5')).toThrow('Invalid grid bounds');
    expect(() => parseInput('51 50')).toThrow('Invalid grid bounds');
  });

  it('should throw error for incomplete robot instruction', () => {
    const input = `5 3
1 1 E`;

    expect(() => parseInput(input)).toThrow('incomplete robot instruction');
  });

  it('should throw error for invalid position format', () => {
    const input = `5 3
1 1
RFRFRFRF`;

    expect(() => parseInput(input)).toThrow('Invalid position format');
  });

  it('should throw error for invalid coordinates', () => {
    const input = `5 3
abc def N
RFRFRFRF`;

    expect(() => parseInput(input)).toThrow('Invalid coordinates');
  });

  it('should throw error for invalid orientation', () => {
    const input = `5 3
1 1 X
RFRFRFRF`;

    expect(() => parseInput(input)).toThrow('Invalid orientation');
  });

  it('should throw error for command string too long', () => {
    const input = `5 3
1 1 E
${'F'.repeat(101)}`;

    expect(() => parseInput(input)).toThrow('Command string too long');
  });

  it('should throw error for invalid commands', () => {
    const input = `5 3
1 1 E
RFRXFRF`;

    expect(() => parseInput(input)).toThrow('Invalid commands');
  });

  it('should handle command string with only valid commands', () => {
    const input = `5 3
1 1 E
LRFLRF`;

    const result = parseInput(input);
    expect(result.robots[0].commands).toBe('LRFLRF');
  });
});
