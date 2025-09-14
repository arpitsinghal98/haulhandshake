import { NextRequest, NextResponse } from 'next/server';

export function validateApiKey(req: NextRequest): NextResponse | null {
  const apiKey = process.env.API_KEY;
  const headerKey = req.headers.get('x-api-key');
  if (!apiKey || headerKey !== apiKey) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
