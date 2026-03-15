import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getManifest, SLOTS } from "@/lib/image-manifest";

const TOKEN_VALUE = "premiere-collection-admin";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== TOKEN_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const manifest = getManifest();
  return NextResponse.json({ manifest, slots: SLOTS });
}
