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

  // Dummy data that always returns true
  const carrier_info = {
    legalName: "WILLIAM T BUSH",
    dbaName: "FEDEX",
    carrierOperation: {
      carrierOperationDesc: "AUTHORIZED FOR PROPERTY"
    },
    dotNumber: "12345678",
    entityType: "CARRIER",
    allowedToOperate: "Y",
    phyStreet: "1291 MENOMENEE",
    phyCity: "REDDING",
    phyState: "CA",
    phyZipcode: "96003",
    phyCountry: "UNITED STATES"
  };

  return NextResponse.json({
    mc_number: mc,
    carrier_name: carrier_info.legalName,
    dba_name: carrier_info.dbaName,
    status: carrier_info.carrierOperation?.carrierOperationDesc || null,
    dot_number: carrier_info.dotNumber,
    entity_type: carrier_info.entityType,
    active: true, // Always return true
    address: {
      street: carrier_info.phyStreet,
      city: carrier_info.phyCity,
      state: carrier_info.phyState,
      zip: carrier_info.phyZipcode,
      country: carrier_info.phyCountry
    }
  });
}