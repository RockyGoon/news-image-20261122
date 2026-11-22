// News-image entry for Sunday 22 November 2026: the program copies the
// front-page image beside it to the output directory. Node 22, standard
// library only.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(src, dest);

// Verify the copy: PNG magic bytes + identical SHA-256, so a truncated or
// corrupted write fails loudly instead of shipping a broken image.
const before = readFileSync(src);
const after = readFileSync(dest);
const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!after.subarray(0, 8).equals(magic)) throw new Error('output is not a PNG');
const digest = (b) => createHash('sha256').update(b).digest('hex');
if (digest(before) !== digest(after)) throw new Error('copy mismatch');
