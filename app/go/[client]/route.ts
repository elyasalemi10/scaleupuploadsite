import { NextResponse } from 'next/server';
import {
  looksLikeBot,
  seenRecently,
  sendVisitAlert,
  withinGlobalCap,
} from '@/lib/visit-alert';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Short link for "built by Scale Up AI" badges: /go/clienta
 *
 * Emails server-side (so it still works with JS off or an ad blocker running)
 * then redirects to the homepage with proper UTMs attached. Keeping the tag in
 * our own URL means we can retarget or retire a badge later without shipping a
 * new build of the client's software.
 *
 * Optional query params:
 *   ?c=<campaign>  override the campaign name (default: built-by-badge)
 *   ?to=<path>     land on a specific page instead of the homepage
 */

const CLIENT_PATTERN = /^[a-z0-9][a-z0-9._-]{0,59}$/i;

export async function GET(
  req: Request,
  ctx: { params: Promise<{ client: string }> }
) {
  const { client } = await ctx.params;
  const url = new URL(req.url);
  const home = new URL('/', url.origin);

  if (!CLIENT_PATTERN.test(client)) {
    return NextResponse.redirect(home, 307);
  }

  const source = client.toLowerCase();
  const campaign = url.searchParams.get('c') || 'built-by-badge';

  // Only allow same-origin relative paths, so ?to= can't be used to bounce
  // visitors off to somebody else's site under our domain.
  const requestedPath = url.searchParams.get('to') || '/';
  const landingPath = requestedPath.startsWith('/') && !requestedPath.startsWith('//')
    ? requestedPath
    : '/';

  const destination = new URL(landingPath, url.origin);
  destination.searchParams.set('utm_source', source);
  destination.searchParams.set('utm_medium', 'referral');
  destination.searchParams.set('utm_campaign', campaign);
  // Tells the client-side tracker this visit was already emailed from here.
  destination.searchParams.set('alerted', '1');

  const userAgent = req.headers.get('user-agent');
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();

  if (!looksLikeBot(userAgent) && !seenRecently(`${source}:${ip}`) && withinGlobalCap()) {
    try {
      await sendVisitAlert({
        source,
        medium: 'referral',
        campaign,
        landingPath,
        referrer: req.headers.get('referer'),
        userAgent,
        country: req.headers.get('x-vercel-ip-country'),
        city: req.headers.get('x-vercel-ip-city'),
        via: 'go-link',
      });
    } catch (error: any) {
      // A broken mailer must never stop the visitor reaching the site.
      console.error('go-link alert failed:', error?.message);
    }
  }

  return NextResponse.redirect(destination, 307);
}
