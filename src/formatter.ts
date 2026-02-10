import { RobotState } from './types';

export function formatOutput(results: RobotState[]): string {
  return results
    .map(result => {
      const { position, orientation, isLost } = result;
      const base = `${position.x} ${position.y} ${orientation}`;
      return isLost ? `${base} LOST` : base;
    })
    .join('\n');
}
