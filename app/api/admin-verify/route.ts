import { NextResponse } from 'next/server';
import { verifyBasicAuth } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_INDEX_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function POST(req: Request) {
  if (!verifyBasicAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_INDEX_HEADERS });
  }
  return NextResponse.json({ ok: true }, { headers: NO_INDEX_HEADERS });
}
