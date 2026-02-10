import { Position, GridBounds } from './types';

export class Grid {
  private scents: Set<string>;

  constructor(private bounds: GridBounds) {
    this.scents = new Set();
  }

  isWithinBounds(position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x <= this.bounds.maxX &&
      position.y >= 0 &&
      position.y <= this.bounds.maxY
    );
  }

  hasScent(position: Position): boolean {
    return this.scents.has(this.positionKey(position));
  }

  addScent(position: Position): void {
    this.scents.add(this.positionKey(position));
  }

  private positionKey(position: Position): string {
    return `${position.x},${position.y}`;
  }
}
