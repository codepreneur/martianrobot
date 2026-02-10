import { SimulationInput, RobotInstruction } from './Simulator';
import { Orientation } from './types';

export function parseInput(input: string): SimulationInput {
  let lines = input.split('\n').map(line => line.trim());

  // Remove trailing empty lines
  while (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop();
  }

  if (lines.length < 1 || lines[0] === '') {
    throw new Error('Invalid input: missing grid bounds');
  }

  const [maxX, maxY] = lines[0].split(/\s+/).map(Number);

  if (isNaN(maxX) || isNaN(maxY) || maxX < 0 || maxY < 0 || maxX > 50 || maxY > 50) {
    throw new Error('Invalid grid bounds');
  }

  const robots: RobotInstruction[] = [];

  for (let i = 1; i < lines.length; i += 2) {
    if (i + 1 >= lines.length) {
      throw new Error(`Invalid input: incomplete robot instruction at line ${i + 1}`);
    }

    const positionLine = lines[i].split(/\s+/);
    if (positionLine.length !== 3) {
      throw new Error(`Invalid position format at line ${i + 1}`);
    }

    const x = Number(positionLine[0]);
    const y = Number(positionLine[1]);
    const orientation = positionLine[2] as Orientation;

    if (isNaN(x) || isNaN(y)) {
      throw new Error(`Invalid coordinates at line ${i + 1}`);
    }

    if (!['N', 'S', 'E', 'W'].includes(orientation)) {
      throw new Error(`Invalid orientation at line ${i + 1}`);
    }

    const commands = lines[i + 1];

    if (commands.length > 100) {
      throw new Error(`Command string too long at line ${i + 2}`);
    }

    if (!/^[LRF]*$/.test(commands)) {
      throw new Error(`Invalid commands at line ${i + 2}`);
    }

    robots.push({ x, y, orientation, commands });
  }

  return { gridMaxX: maxX, gridMaxY: maxY, robots };
}
