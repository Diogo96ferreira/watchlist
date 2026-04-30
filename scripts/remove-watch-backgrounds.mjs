import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const watchDir = path.resolve("public/images/watches");

const isSupported = (name) => /\.(png|jpe?g)$/i.test(name);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const isBackgroundCandidate = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const range = max - min;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 226 && range < 28;
};

const isNearBackground = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const range = max - min;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 208 && range < 42;
};

const queueIfBackground = (x, y, width, height, visited, queue, data) => {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return;
  }
  const index = y * width + x;
  if (visited[index]) {
    return;
  }
  const offset = index * 4;
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  const alpha = data[offset + 3];
  if (alpha === 0 || !isBackgroundCandidate(r, g, b)) {
    return;
  }
  visited[index] = 1;
  queue.push(index);
};

export async function processFile(fileName) {
  const inputPath = path.join(watchDir, fileName);
  const outputName = `${path.parse(fileName).name}.png`;
  const outputPath = path.join(watchDir, outputName);

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  if (!metadata.format) {
    throw new Error("Unsupported image format");
  }

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8ClampedArray(data);
  const visited = new Uint8Array(info.width * info.height);
  const queue = [];

  for (let x = 0; x < info.width; x += 1) {
    queueIfBackground(x, 0, info.width, info.height, visited, queue, pixels);
    queueIfBackground(x, info.height - 1, info.width, info.height, visited, queue, pixels);
  }

  for (let y = 0; y < info.height; y += 1) {
    queueIfBackground(0, y, info.width, info.height, visited, queue, pixels);
    queueIfBackground(info.width - 1, y, info.width, info.height, visited, queue, pixels);
  }

  for (let q = 0; q < queue.length; q += 1) {
    const index = queue[q];
    const x = index % info.width;
    const y = Math.floor(index / info.width);
    queueIfBackground(x + 1, y, info.width, info.height, visited, queue, pixels);
    queueIfBackground(x - 1, y, info.width, info.height, visited, queue, pixels);
    queueIfBackground(x, y + 1, info.width, info.height, visited, queue, pixels);
    queueIfBackground(x, y - 1, info.width, info.height, visited, queue, pixels);
  }

  for (let index = 0; index < visited.length; index += 1) {
    const offset = index * 4;
    if (visited[index]) {
      pixels[offset + 3] = 0;
      continue;
    }

    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];
    if (isNearBackground(r, g, b)) {
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const alpha = clamp(Math.round(((244 - luminance) / 36) * 255), 0, 255);
      pixels[offset + 3] = Math.min(pixels[offset + 3], alpha);
    }
  }

  await sharp(pixels, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  return outputName;
}

async function main() {
  const entries = await fs.readdir(watchDir);
  const files = entries.filter((file) => isSupported(file) && !file.endsWith(".png"));
  const outputs = [];

  for (const file of files) {
    outputs.push(await processFile(file));
  }

  console.log(outputs.join("\n"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
