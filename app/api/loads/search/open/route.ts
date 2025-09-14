import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/app/api/_utils/validateApiKey';
import { eq, and, ilike, gte, lte, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { loads } from '@/app/database/schema';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export async function GET(req: NextRequest) {
  const unauthorized = validateApiKey(req);
  if (unauthorized) return unauthorized;
  const { searchParams } = new URL(req.url);
  const filters = {
    load_id: searchParams.get('load_id'),
    origin: searchParams.get('origin'),
    destination: searchParams.get('destination'),
    equipment_type: searchParams.get('equipment_type'),
    commodity_type: searchParams.get('commodity_type'),
    min_rate: searchParams.get('min_rate'),
    max_rate: searchParams.get('max_rate'),
    min_weight: searchParams.get('min_weight'),
    max_weight: searchParams.get('max_weight'),
    min_miles: searchParams.get('min_miles'),
    max_miles: searchParams.get('max_miles'),
    pickup_date: searchParams.get('pickup_date'),
    delivery_date: searchParams.get('delivery_date'),
  };

  // Always filter for open status
  const whereClauses = [eq(loads.status, 'open')];
  if (filters.load_id) whereClauses.push(ilike(loads.load_id, `%${filters.load_id}%`));
  if (filters.origin) whereClauses.push(ilike(loads.origin, `%${filters.origin}%`));
  if (filters.destination) whereClauses.push(ilike(loads.destination, `%${filters.destination}%`));
  if (filters.equipment_type) whereClauses.push(ilike(loads.equipment_type, `%${filters.equipment_type}%`));
  if (filters.commodity_type) whereClauses.push(ilike(loads.commodity_type, `%${filters.commodity_type}%`));
  if (filters.min_rate) whereClauses.push(gte(loads.loadboard_rate, String(filters.min_rate)));
  if (filters.max_rate) whereClauses.push(lte(loads.loadboard_rate, String(filters.max_rate)));
  if (filters.min_weight) whereClauses.push(gte(loads.weight, Number(filters.min_weight)));
  if (filters.max_weight) whereClauses.push(lte(loads.weight, Number(filters.max_weight)));
  if (filters.min_miles) whereClauses.push(gte(loads.miles, Number(filters.min_miles)));
  if (filters.max_miles) whereClauses.push(lte(loads.miles, Number(filters.max_miles)));
  if (filters.pickup_date) whereClauses.push(sql`DATE(${loads.pickup_datetime}) = ${filters.pickup_date}`);
  if (filters.delivery_date) whereClauses.push(sql`DATE(${loads.delivery_datetime}) = ${filters.delivery_date}`);

  try {
    const result = await db.select().from(loads)
      .where(and(...whereClauses))
      .orderBy(loads.pickup_datetime);

    // Convert datetime fields to ISO string
    const formatted = result.map((row) => ({
      ...row,
      pickup_datetime: row.pickup_datetime ? row.pickup_datetime.toISOString() : null,
      delivery_datetime: row.delivery_datetime ? row.delivery_datetime.toISOString() : null,
    }));
    return NextResponse.json(formatted);
  } catch (e: any) {
    return NextResponse.json({ error: 'Error retrieving loads', details: e.message }, { status: 500 });
  }
}
