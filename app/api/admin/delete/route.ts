import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { unlinkSync } from "fs";
import path from "path";
import { getManifest, setManifest, SLOTS } from "@/lib/image-manifest";

const TOKEN_VALUE = "premiere-collection-admin";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== TOKEN_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slot } = await request.json();

    if (!slot || !(slot in SLOTS)) {
      return NextResponse.json({ error: "Invalid slot" }, { status: 400 });
    }

    const manifest = getManifest();
    const entry = manifest[slot];

    if (entry) {
      // Delete the file
      const filePath = path.join(process.cwd(), "public/images", entry.filename);
      try {
        unlinkSync(filePath);
      } catch {
        // File may already be deleted
      }

      // Remove from manifest
      delete manifest[slot];
      setManifest(manifest);
    }

    return NextResponse.json({ success: true, slot });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
