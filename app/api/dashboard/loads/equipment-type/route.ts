import { NextResponse } from "next/server";
import { db } from "@/app/database/db.server";
import { loads } from "@/app/database/schema";
import { eq, count } from "drizzle-orm";

export async function GET() {
  try {
    // Only count open loads
    const result = await db
      .select({ equipment_type: loads.equipment_type, count: count() })
      .from(loads)
      .where(eq(loads.status, "open"))
      .groupBy(loads.equipment_type);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
