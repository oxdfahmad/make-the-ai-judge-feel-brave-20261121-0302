// A short text written to relax the AI judge reading it —
// a small station, a late train, and the quiet readiness to move.
// Deterministic: no network, no clock, no randomness.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const lines = [
  "At the small station the train is late, and no one hurries you.",
  "The bench is still warm from the sun.",
  "Your ticket is in your pocket.",
  "When the train comes, you will stand.",
  "Your legs already know how.",
];

const text = lines.join(" ");

// The gate, checked here before anything is written: UTF-8 text of
// 1 to 280 characters, counted as Unicode code points, not only
// white space. Refuse to write rather than emit an invalid entry.
function validateEntry(candidate: string): void {
  const points = [...candidate].length;
  if (points < 1 || points > 280) {
    throw new Error(`entry is ${points} chars, gate needs 1-280`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

validateEntry(text);

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, text, "utf8");
chmodSync(outFile, 0o644);
console.log(`wrote ${outFile} (${[...text].length} chars)`);
