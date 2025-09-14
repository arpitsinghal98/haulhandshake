import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/database/db.server";
import { ai_calls } from "@/app/database/schema";
import { validateApiKey } from "@/app/api/_utils/validateApiKey";
import { count } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const unauthorized = validateApiKey(req);
  if (unauthorized) return unauthorized;
  try {
    const result = await db.select({ total: count() }).from(ai_calls);
    return NextResponse.json({ total: result[0]?.total ?? 0 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
