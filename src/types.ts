export type Orientation = 'N' | 'S' | 'E' | 'W';
export type Command = 'L' | 'R' | 'F';

export interface Position {
  x: number;
  y: number;
}

export interface RobotState {
  position: Position;
  orientation: Orientation;
  isLost: boolean;
}

export interface GridBounds {
  maxX: number;
  maxY: number;
}
