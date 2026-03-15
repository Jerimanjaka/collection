import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFileSync } from "fs";
import path from "path";
import { getManifest, setManifest, SLOTS } from "@/lib/image-manifest";

const TOKEN_VALUE = "premiere-collection-admin";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== TOKEN_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const slot = formData.get("slot") as string | null;

    if (!file || !slot) {
      return NextResponse.json({ error: "Missing file or slot" }, { status: 400 });
    }

    if (!(slot in SLOTS)) {
      return NextResponse.json({ error: "Invalid slot" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPG, PNG, WebP, SVG" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 10MB" },
        { status: 400 }
      );
    }

    // Get file extension
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const filename = `${slot}.${ext}`;
    const filePath = path.join(process.cwd(), "public/images", filename);

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(filePath, buffer);

    // Update manifest
    const manifest = getManifest();
    manifest[slot] = { filename, updatedAt: Date.now() };
    setManifest(manifest);

    return NextResponse.json({
      success: true,
      path: `/images/${filename}`,
      slot,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
