import { NextResponse } from "next/server";
import { getContent } from "@/lib/content-manifest";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}
