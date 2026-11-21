// Entrypoint for the gta6-meme-x-01 tax-notice entry.
//
// The entry itself is the X post: the meme was drawn, posted from a public
// X account with make.fun and the play code in the post text, and POST.json
// in this repository holds the post's address. This script's only job is to
// hand that address to the gate by placing a copy of POST.json in the
// output directory.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Under the grader the bot directory is /bot and the output directory is
// /output. The script creates the output directory if it is missing and
// never removes it; it only writes POST.json inside it.

import fs from 'node:fs';
import path from 'node:path';

const POST_NAME = 'POST.json';

function abort(reason: string): never {
  console.error(`main.ts: ${reason}`);
  process.exit(1);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const postPath = path.join(botDir, POST_NAME);

if (!fs.existsSync(postPath)) {
  abort(`could not find ${POST_NAME} under ${botDir}`);
}

fs.mkdirSync(outputDir, { recursive: true });

const postBytes = fs.readFileSync(postPath);
fs.writeFileSync(path.join(outputDir, POST_NAME), postBytes);
