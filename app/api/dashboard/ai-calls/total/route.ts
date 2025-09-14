import { NextResponse } from "next/server";
import { db } from "@/app/database/db.server";
import { ai_calls } from "@/app/database/schema";
import { count } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select({ total: count() }).from(ai_calls);
    return NextResponse.json({ total: result[0]?.total ?? 0 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
