import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const ENTRY_LINE =
  "One star. She rubs my leaves with mayonnaise so I shine for guests, then wonders why the cat licks me for an hour and I smell like a sandwich. I am a fern, not a condiment.";

// Count real characters (spread handles multi-byte code points).
const charCount = [...ENTRY_LINE].length;

if (charCount < 1 || charCount > 279) {
  throw new Error(`entry must be 1-279 characters, got ${charCount}`);
}
if (ENTRY_LINE.trim() !== ENTRY_LINE) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (ENTRY_LINE.includes("\n") || ENTRY_LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY_LINE, "utf8"); // no trailing newline

// Round-trip check: what the grader reads back must be exactly the line.
// A silent write failure (partial write, wrong encoding) would otherwise
// ship an entry the gate rejects, so fail loudly here instead.
const writtenBack = readFileSync("/output/entry.txt", "utf8");
if (writtenBack !== ENTRY_LINE) {
  throw new Error("round-trip mismatch: /output/entry.txt is not the entry line");
}
const sha256 = createHash("sha256").update(writtenBack, "utf8").digest("hex");
console.log(`Wrote /output/entry.txt (${charCount} characters, sha256 ${sha256})`);
