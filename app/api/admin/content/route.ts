import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, setContent, CONTENT_FIELDS } from "@/lib/content-manifest";

const TOKEN_VALUE = "premiere-collection-admin";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== TOKEN_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getContent();
  return NextResponse.json({ content, fields: CONTENT_FIELDS });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== TOKEN_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { key, value } = await request.json();
    if (!key || typeof value !== "string") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const content = await getContent();
    if (value.trim() === "") {
      delete content[key];
    } else {
      content[key] = value;
    }
    await setContent(content);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
