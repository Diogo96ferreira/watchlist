#!/usr/bin/env node
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

async function walk(dir, list = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, list);
    } else if (/\.png$/i.test(entry.name)) {
      list.push(full);
    }
  }
  return list;
}

async function optimize(file) {
  try {
    const input = await fs.readFile(file);
    const optimized = await sharp(input, { pages: -1 })
      .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
      .toBuffer();

    // Only overwrite if smaller (avoid unnecessary writes)
    if (optimized.length < input.length) {
      await fs.writeFile(file, optimized);
      console.log(`Optimized: ${path.relative(process.cwd(), file)} -> ${Math.round((1 - optimized.length / input.length) * 100)}%`);
    } else {
      console.log(`Skipped (no gain): ${path.relative(process.cwd(), file)}`);
    }
  } catch (err) {
    console.error(`Error optimizing ${file}:`, err);
  }
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  console.log(`Scanning ${publicDir} for PNGs...`);
  const files = await walk(publicDir);
  console.log(`Found ${files.length} PNG(s)`);
  for (const file of files) {
    await optimize(file);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
