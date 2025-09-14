import { NextResponse } from "next/server";
import { db } from "@/app/database/db.server";
import { loads } from "@/app/database/schema";
import { count } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select({ total: count() }).from(loads);
    return NextResponse.json({ total: result[0]?.total ?? 0 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}