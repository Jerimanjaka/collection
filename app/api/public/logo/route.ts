import { NextResponse } from "next/server";
import { getImagePath } from "@/lib/image-manifest";

export async function GET() {
  const path = await getImagePath("logo");
  return NextResponse.json({ path: path || null });
}
