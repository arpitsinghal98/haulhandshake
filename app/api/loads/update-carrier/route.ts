import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/database/db.server';
import { loads } from '@/app/database/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { load_id, status, carrier_mc_number, carrier_name, dba_name, carrier_street, carrier_city, carrier_state, carrier_zip, carrier_country } = body;
    if (!load_id) {
      return NextResponse.json({ error: 'Missing load_id' }, { status: 400 });
    }
    // Build update object with only provided fields
    const updateFields: Record<string, any> = {};
    if (status) updateFields.status = status;
    if (carrier_mc_number) updateFields.carrier_mc_number = carrier_mc_number;
    if (carrier_name) updateFields.carrier_name = carrier_name;
    if (dba_name) updateFields.dba_name = dba_name;
    if (carrier_street) updateFields.carrier_street = carrier_street;
    if (carrier_city) updateFields.carrier_city = carrier_city;
    if (carrier_state) updateFields.carrier_state = carrier_state;
    if (carrier_zip) updateFields.carrier_zip = carrier_zip;
    if (carrier_country) updateFields.carrier_country = carrier_country;
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }
    const result = await db.update(loads)
      .set(updateFields)
      .where(eq(loads.load_id, load_id))
      .returning();
    if (result.length === 0) {
      return NextResponse.json({ error: 'Load not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, updated: result[0] });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
