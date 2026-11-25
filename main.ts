import { mkdirSync, writeFileSync } from "node:fs";

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
console.log(`Wrote /output/entry.txt (${charCount} characters)`);
