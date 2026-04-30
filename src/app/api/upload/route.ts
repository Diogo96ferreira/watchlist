import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, data } = body as { filename: string; data: string };

    if (!filename || !data) {
      return new Response(JSON.stringify({ error: "Missing filename or data" }), { status: 400 });
    }

    // Decode base64
    const buffer = Buffer.from(data, "base64");

    // Optimize PNG losslessly (high compression level)
    const optimized = await sharp(buffer)
      .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
      .toBuffer();

    const uploadDir = path.join(process.cwd(), "public", "images", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const outPath = path.join(uploadDir, filename);
    await fs.writeFile(outPath, optimized);

    return new Response(JSON.stringify({ success: true, path: `/images/uploads/${filename}` }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 });
  }
}
