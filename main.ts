// Front-page entry for Sunday 22 November 2026.
//
// The program ships the rendered page beside it: it copies entry.png
// into the output directory and refuses to finish unless the copy is
// byte-for-byte the file it started from. Node 22, standard library
// only; no network, no dependencies.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function fail(message) {
  throw new Error(`entry.png verification failed: ${message}`);
}

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destPath = join(outDir, "entry.png");

const original = readFileSync(sourcePath);
if (!original.subarray(0, 8).equals(PNG_MAGIC)) {
  fail("source file does not start with the PNG magic bytes");
}
if (original.length > 1048576) {
  fail(`source file is ${original.length} bytes, over the 1 MiB cap`);
}
// The IHDR chunk follows the 8-byte magic: 4-byte length, "IHDR", then
// width and height as big-endian 32-bit values. The page is drawn at
// exactly 1024x1024, so anything else means the wrong image shipped.
const ihdrWidth = original.readUInt32BE(16);
const ihdrHeight = original.readUInt32BE(20);
if (ihdrWidth !== 1024 || ihdrHeight !== 1024) {
  fail(`source image is ${ihdrWidth}x${ihdrHeight}, expected 1024x1024`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(sourcePath, destPath);

const written = readFileSync(destPath);
if (!written.subarray(0, 8).equals(PNG_MAGIC)) {
  fail("output file does not start with the PNG magic bytes");
}
if (sha256(original) !== sha256(written)) {
  fail("output bytes differ from the source image");
}
