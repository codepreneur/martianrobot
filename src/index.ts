import * as fs from 'fs';
import * as readline from 'readline';
import { parseInput } from './parser';
import { Simulator } from './Simulator';
import { formatOutput } from './formatter';

async function readStdin(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const lines: string[] = [];

  for await (const line of rl) {
    lines.push(line);
  }

  return lines.join('\n');
}

async function main() {
  try {
    let input: string;

    if (process.argv[2]) {
      input = fs.readFileSync(process.argv[2], 'utf-8');
    } else {
      input = await readStdin();
    }

    const simulationInput = parseInput(input);
    const simulator = new Simulator();
    const results = simulator.simulate(simulationInput);
    const output = formatOutput(results);

    console.log(output);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

main();
