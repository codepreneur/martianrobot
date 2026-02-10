import { Grid } from './Grid';
import { Robot } from './Robot';
import { RobotState } from './types';

export interface RobotInstruction {
  x: number;
  y: number;
  orientation: 'N' | 'S' | 'E' | 'W';
  commands: string;
}

export interface SimulationInput {
  gridMaxX: number;
  gridMaxY: number;
  robots: RobotInstruction[];
}

export class Simulator {
  simulate(input: SimulationInput): RobotState[] {
    const grid = new Grid({ maxX: input.gridMaxX, maxY: input.gridMaxY });
    const results: RobotState[] = [];

    for (const instruction of input.robots) {
      const robot = new Robot(instruction.x, instruction.y, instruction.orientation);
      robot.executeCommands(instruction.commands, grid);
      results.push(robot.getState());
    }

    return results;
  }
}
