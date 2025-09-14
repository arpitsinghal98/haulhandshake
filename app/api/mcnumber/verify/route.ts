
import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/app/api/_utils/validateApiKey';

export async function GET(req: NextRequest) {
  const unauthorized = validateApiKey(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const mc = searchParams.get('mc');

  if (!mc) {
    return NextResponse.json({ detail: 'Missing MC number' }, { status: 400 });
  }

  // Get FMCSA API URL and KEY from environment variables
  let url = process.env.FMCSA_API_URL || '';
  const FMCSA_API_KEY = process.env.FMCSA_API_KEY || '';

  url = url.replace(':mcNumber', String(mc)).replace(/"/g, '');
  url = `${url}?webKey=${FMCSA_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: 'Error fetching data from FMCSA', details: await response.text() }, { status: 500 });
    }
    const data = await response.json();
    const content = data.content;
    if (!content || typeof content !== 'object' || !('carrier' in content)) {
      return NextResponse.json({ error: 'Carrier not found or unexpected FMCSA response', raw_response: data }, { status: 404 });
    }
    const carrier_info = content.carrier;
    // Check if active is 'Y', 'Yes' (case-insensitive), or true
    let activeRaw = carrier_info.allowedToOperate;
    let active = false;
    if (typeof activeRaw === 'string') {
      active = /^(y|yes)$/i.test(activeRaw.trim());
    } else if (typeof activeRaw === 'boolean') {
      active = activeRaw;
    }
    if (!active) {
      return NextResponse.json({
        message: 'Carrier Available but not active',
        active,
      });
    }
    return NextResponse.json({
      mc_number: mc,
      carrier_name: carrier_info.legalName,
      dba_name: carrier_info.dbaName,
      active,
      address: {
        street: carrier_info.phyStreet,
        city: carrier_info.phyCity,
        state: carrier_info.phyState,
        zip: carrier_info.phyZipcode,
        country: carrier_info.phyCountry,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: 'Error fetching data from FMCSA', details: e.message }, { status: 500 });
  }
}
