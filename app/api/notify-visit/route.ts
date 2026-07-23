import { NextResponse } from 'next/server';
import {
  looksLikeBot,
  seenRecently,
  sendVisitAlert,
  withinGlobalCap,
} from '@/lib/visit-alert';

export const runtime = 'nodejs';

const SOURCE_PATTERN = /^[a-z0-9][a-z0-9._-]{0,59}$/i;

export async function POST(req: Request) {
  try {
    const { source, medium, campaign, landingPath, referrer } = await req.json();

    if (typeof source !== 'string' || !SOURCE_PATTERN.test(source)) {
      return NextResponse.json({ error: 'Invalid source' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent');
    if (looksLikeBot(userAgent)) {
      return NextResponse.json({ ok: true, skipped: 'bot' });
    }

    const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
    if (seenRecently(`${source}:${ip}`)) {
      return NextResponse.json({ ok: true, skipped: 'duplicate' });
    }
    if (!withinGlobalCap()) {
      console.warn('Visit alert dropped: global rate cap hit');
      return NextResponse.json({ ok: true, skipped: 'rate-limited' });
    }

    await sendVisitAlert({
      source,
      medium: typeof medium === 'string' ? medium : null,
      campaign: typeof campaign === 'string' ? campaign : null,
      landingPath: typeof landingPath === 'string' ? landingPath : null,
      referrer: typeof referrer === 'string' ? referrer : null,
      userAgent,
      country: req.headers.get('x-vercel-ip-country'),
      city: req.headers.get('x-vercel-ip-city'),
      via: 'utm-param',
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    // Never surface a failure here — this is a fire-and-forget beacon and the
    // visitor's page must not care that it broke.
    console.error('notify-visit error:', error?.message);
    return NextResponse.json({ ok: false });
  }
}
