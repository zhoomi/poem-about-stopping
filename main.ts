import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const poem = `The keeper did not dive.
The crowd screamed left, screamed right.
He stayed in the middle of the goal,
feet planted, arms loose.
The ball came to him.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const chars = [...poem].length;
if (chars < 1 || chars > 280 || poem.trim().length === 0) {
  throw new Error(`poem must be 1-280 characters, got ${chars}`);
}

writeFileSync(join(outDir, "entry.txt"), poem + "\n", "utf8");

// Read back and verify the written file is exactly the poem.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== poem + "\n") {
  throw new Error("written entry.txt does not match the poem");
}

console.log(`wrote ${chars} characters to ${join(outDir, "entry.txt")}`);
