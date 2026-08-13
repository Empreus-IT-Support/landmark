/**
 * Downscales and re-encodes the images pulled from the WordPress build.
 * The source library shipped raw stock downloads (one was 7900x5267 / 29 MB),
 * so anything oversized is capped and a WebP sibling is written next to it.
 *
 * Run with: node scripts/optimise-images.mjs
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "images");
const MAX_WIDTH = 2000;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 78;

const kb = (bytes) => Math.round(bytes / 1024);

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

let before = 0;
let after = 0;

for (const file of files) {
  const full = path.join(DIR, file);
  const startSize = (await stat(full)).size;
  before += startSize;

  // Read to a buffer first: sharp cannot hold a read handle on a path it writes.
  const source = await readFile(full);
  const { width } = await sharp(source, { limitInputPixels: false }).metadata();
  const resize = width > MAX_WIDTH;

  const isPng = /\.png$/i.test(file);
  const pipeline = sharp(source, { limitInputPixels: false }).rotate();
  if (resize) pipeline.resize({ width: MAX_WIDTH });
  const buffer = await (isPng
    ? pipeline.png({ compressionLevel: 9 })
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  ).toBuffer();
  await writeFile(full, buffer);

  const webp = await sharp(buffer).webp({ quality: WEBP_QUALITY }).toBuffer();
  await writeFile(full.replace(/\.(jpe?g|png)$/i, ".webp"), webp);

  const endSize = (await stat(full)).size;
  after += endSize;

  console.log(
    `${file.padEnd(34)} ${String(kb(startSize)).padStart(6)} KB -> ${String(
      kb(endSize),
    ).padStart(5)} KB${resize ? `  (capped to ${MAX_WIDTH}px)` : ""}`,
  );
}

console.log(
  `\nTotal ${kb(before)} KB -> ${kb(after)} KB (${Math.round(
    (1 - after / before) * 100,
  )}% smaller), plus WebP siblings.`,
);
