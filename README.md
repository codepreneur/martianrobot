# Martian Robots

A TypeScript simulation of robots navigating the surface of Mars.

## Problem Description

This solution simulates robots moving on a rectangular grid representing the surface of Mars. Robots execute commands (L, R, F) to navigate the grid. When a robot falls off the edge, it leaves a "scent" that prevents future robots from falling at the same location.

## Design Decisions

### Architecture

The solution follows object-oriented principles with clear separation of concerns:

- **`Grid`**: Manages the rectangular world boundaries and tracks scent positions
- **`Robot`**: Encapsulates robot state (position, orientation) and command execution logic
- **`Simulator`**: Orchestrates the simulation, processing robots sequentially
- **`parser`**: Handles input parsing with validation
- **`formatter`**: Handles output formatting

### Technology Choices

- **TypeScript**: Provides type safety and better developer experience
- **Node.js**: Simple runtime with no external dependencies for the core logic
- **Jest**: Industry-standard testing framework with excellent TypeScript support

### Key Design Patterns

1. **Immutability**: Grid bounds are immutable; robot state is returned as copies
2. **Single Responsibility**: Each class has one clear purpose
3. **Open/Closed Principle**: Command execution uses a switch statement, making it easy to add new command types in the future
4. **Fail Fast**: Input validation throws errors early with clear messages

### Extensibility

The design allows for future enhancements:
- New command types can be added to the `Command` type and `executeCommand` method
- Different grid shapes could be implemented by creating new classes implementing a `Grid` interface
- The simulation could be extended to support concurrent robots (currently sequential)

## Requirements

- Node.js 18+ (or any version supporting ES2020)
- npm or yarn

## Installation

```bash
npm install
```

## Usage

### Run with a file

```bash
npm run build
npm start sample-input.txt
```

### Run with stdin

```bash
npm run build
echo "5 3
1 1 E
RFRFRFRF" | npm start
```

### Development mode (no build required)

```bash
npm run dev sample-input.txt
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Input Format

The first line contains the upper-right coordinates of the grid (lower-left is 0,0):
```
5 3
```

Each robot is specified by two lines:
1. Initial position (x y orientation)
2. Command string

```
1 1 E
RFRFRFRF
```

### Commands

- `L`: Turn left 90 degrees
- `R`: Turn right 90 degrees
- `F`: Move forward one grid point

### Constraints

- Maximum coordinate value: 50
- Maximum command string length: 100
- Orientations: N (North), S (South), E (East), W (West)

## Output Format

For each robot, the output shows the final position and orientation:
```
1 1 E
```

If the robot falls off the grid, "LOST" is appended:
```
3 3 N LOST
```

## Example

### Input
```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

### Output
```
1 1 E
3 3 N LOST
2 3 S
```
