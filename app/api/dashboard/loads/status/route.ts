import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/database/db.server";
import { loads } from "@/app/database/schema";
import { validateApiKey } from "@/app/api/_utils/validateApiKey";
import { eq, count, sql } from "drizzle-orm";

const STATUSES = ["open", "covered", "cancelled", "delivered"] as const;

type Status = typeof STATUSES[number];

export async function GET(req: NextRequest) {
  const unauthorized = validateApiKey(req);
  if (unauthorized) return unauthorized;
  try {
    const results = await Promise.all(
      STATUSES.map(async (status) => {
        const result = await db
          .select({ count: count() })
          .from(loads)
          .where(eq(loads.status, status));
        return { status, count: result[0]?.count ?? 0 };
      })
    );
    const response: Record<Status, number> = {
      open: 0,
      covered: 0,
      cancelled: 0,
      delivered: 0,
    };
    results.forEach(({ status, count }) => {
      response[status as Status] = count;
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
