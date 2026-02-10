import { Position, Orientation, Command, RobotState } from './types';
import { Grid } from './Grid';

export class Robot {
  private position: Position;
  private orientation: Orientation;
  private isLost: boolean = false;

  private static readonly ORIENTATIONS: Orientation[] = ['N', 'E', 'S', 'W'];

  private static readonly DIRECTION_VECTORS: Record<Orientation, Position> = {
    N: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    S: { x: 0, y: -1 },
    W: { x: -1, y: 0 }
  };

  constructor(x: number, y: number, orientation: Orientation) {
    this.position = { x, y };
    this.orientation = orientation;
  }

  executeCommands(commands: string, grid: Grid): void {
    for (const command of commands) {
      if (this.isLost) break;
      this.executeCommand(command as Command, grid);
    }
  }

  private executeCommand(command: Command, grid: Grid): void {
    switch (command) {
      case 'L':
        this.turnLeft();
        break;
      case 'R':
        this.turnRight();
        break;
      case 'F':
        this.moveForward(grid);
        break;
    }
  }

  private turnLeft(): void {
    const currentIndex = Robot.ORIENTATIONS.indexOf(this.orientation);
    this.orientation = Robot.ORIENTATIONS[(currentIndex + 3) % 4];
  }

  private turnRight(): void {
    const currentIndex = Robot.ORIENTATIONS.indexOf(this.orientation);
    this.orientation = Robot.ORIENTATIONS[(currentIndex + 1) % 4];
  }

  private moveForward(grid: Grid): void {
    const vector = Robot.DIRECTION_VECTORS[this.orientation];
    const newPosition: Position = {
      x: this.position.x + vector.x,
      y: this.position.y + vector.y
    };

    if (!grid.isWithinBounds(newPosition)) {
      if (!grid.hasScent(this.position)) {
        grid.addScent(this.position);
        this.isLost = true;
      }
    } else {
      this.position = newPosition;
    }
  }

  getState(): RobotState {
    return {
      position: { ...this.position },
      orientation: this.orientation,
      isLost: this.isLost
    };
  }
}
