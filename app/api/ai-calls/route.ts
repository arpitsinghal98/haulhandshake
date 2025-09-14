import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/database/db.server";
import { ai_calls } from "@/app/database/schema";
import { validateApiKey } from "@/app/api/_utils/validateApiKey";

export async function POST(req: NextRequest) {
  const unauthorized = validateApiKey(req);
  if (unauthorized) return unauthorized;
  try {
    // Insert a new row with default values (id auto, created_at now)
    await db.insert(ai_calls).values({});
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
