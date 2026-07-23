import { Resend } from 'resend';

/**
 * Sends an email whenever someone lands on the site from a tagged link
 * (a "built by" badge in client software, a flyer QR code, etc).
 *
 * Two entry points feed this: the /go/<client> redirect (server-side, most
 * reliable) and /api/notify-visit (client-side, catches plain ?utm_source=
 * links that were shipped before /go existed).
 */

const BOT_UA =
  /bot|crawl|spider|slurp|preview|fetch|monitor|headless|lighthouse|curl|wget|python-requests|axios|okhttp|facebookexternalhit|whatsapp|slackbot|discordbot|telegrambot|bingpreview|semrush|ahrefs|petalbot|gptbot|claudebot/i;

export function looksLikeBot(userAgent: string | null): boolean {
  if (!userAgent) return true; // no UA at all is almost never a real browser
  return BOT_UA.test(userAgent);
}

/**
 * Best-effort burst damper. Each serverless instance keeps its own copy, so
 * this is not a guarantee — it just stops one refresh-happy visitor from
 * generating a dozen emails off a single warm instance. The real dedup is the
 * localStorage check on the client.
 */
const recentAlerts = new Map<string, number>();
const DEDUP_WINDOW_MS = 30 * 60 * 1000;

export function seenRecently(key: string): boolean {
  const now = Date.now();

  for (const [k, at] of recentAlerts) {
    if (now - at > DEDUP_WINDOW_MS) recentAlerts.delete(k);
  }

  if (recentAlerts.has(key)) return true;
  recentAlerts.set(key, now);
  return false;
}

/**
 * Safety valve. /api/notify-visit is a public endpoint that sends mail, so a
 * script with rotating IPs could otherwise flood the inbox. Caps total alerts
 * per instance per window; anything past the cap is logged and dropped.
 */
const GLOBAL_CAP = 20;
let windowStart = 0;
let windowCount = 0;

export function withinGlobalCap(): boolean {
  const now = Date.now();
  if (now - windowStart > DEDUP_WINDOW_MS) {
    windowStart = now;
    windowCount = 0;
  }
  windowCount += 1;
  return windowCount <= GLOBAL_CAP;
}

/** Keeps untrusted query/header values from breaking out into the email HTML. */
function esc(value: string | null | undefined, fallback = 'Not provided'): string {
  if (!value) return fallback;
  return value
    .slice(0, 300)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export type VisitAlert = {
  source: string;
  medium?: string | null;
  campaign?: string | null;
  landingPath?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  country?: string | null;
  city?: string | null;
  via: 'go-link' | 'utm-param';
};

export async function sendVisitAlert(visit: VisitAlert): Promise<void> {
  if (!process.env.RESEND_API_KEY || !process.env.SEND_FROM) {
    console.error('Visit alert skipped: RESEND_API_KEY or SEND_FROM is not set');
    return;
  }

  const to = process.env.VISIT_ALERT_TO || 'info@scaleupwithai.ai';
  const when = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Australia/Melbourne',
  }).format(new Date());

  const location = [visit.city, visit.country].filter(Boolean).join(', ');

  const rows: Array<[string, string]> = [
    ['Source', esc(visit.source)],
    ['Campaign', esc(visit.campaign)],
    ['Medium', esc(visit.medium)],
    ['Landed on', esc(visit.landingPath, '/')],
    ['Referrer', esc(visit.referrer, 'Direct / none')],
    ['Location', esc(location, 'Unknown')],
    ['Time (Melbourne)', esc(when)],
    ['Detected via', visit.via === 'go-link' ? '/go link (server-side)' : 'UTM parameter'],
  ];

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.SEND_FROM,
    to: [to],
    subject: `[Scale Up AI] Site visit from ${visit.source}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Scale Up AI</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.8;">Referral Visit</p>
        </div>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 16px 0; color: #1f2937;">
            Someone opened the site from a link tagged
            <strong>${esc(visit.source)}</strong>.
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${rows
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding: 8px 12px 8px 0; color: #6b7280; vertical-align: top; white-space: nowrap;">${label}</td>
                <td style="padding: 8px 0; color: #1f2937; word-break: break-word;">${value}</td>
              </tr>`
              )
              .join('')}
          </table>
          <p style="margin: 16px 0 0 0; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 12px;">
            User agent: ${esc(visit.userAgent, 'Unknown')}
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Visit alert failed to send:', error);
  }
}
