import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_SIZE = 15 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploaded: string[] = [];

    for (const file of files) {
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} is too large. Max 15MB.` },
          { status: 400 }
        );
      }

      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filename = `${timestamp}_${safeName}`;

      await put(`uploads/${filename}`, file, {
        access: "private",
        contentType: file.type,
      });

      uploaded.push(filename);
    }

    return NextResponse.json({ success: true, files: uploaded });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
