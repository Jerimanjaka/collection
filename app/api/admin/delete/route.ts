import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { del } from "@vercel/blob";
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

    const manifest = await getManifest();
    const entry = manifest[slot];

    if (entry) {
      try {
        await del(entry.url);
      } catch {
        // blob may already be deleted
      }
      delete manifest[slot];
      await setManifest(manifest);
    }

    return NextResponse.json({ success: true, slot });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
