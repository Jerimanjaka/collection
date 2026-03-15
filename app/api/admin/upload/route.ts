import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";
import { getManifest, setManifest, SLOTS } from "@/lib/image-manifest";

const TOKEN_VALUE = "premiere-collection-admin";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
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
      return NextResponse.json({ error: "Invalid file type. Allowed: JPG, PNG, WebP, SVG" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large. Max 10MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const filename = `${slot}.${ext}`;

    const blob = await put(`images/${filename}`, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });

    const manifest = await getManifest();
    manifest[slot] = { filename, url: blob.url, updatedAt: Date.now() };
    await setManifest(manifest);

    return NextResponse.json({ success: true, url: blob.url, slot });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Upload error:", message);
    return NextResponse.json({ error: `Upload failed: ${message}` }, { status: 500 });
  }
}
