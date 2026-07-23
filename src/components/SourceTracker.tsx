'use client';

import { useEffect } from 'react';

/**
 * Catches visits that arrive on a plain ?utm_source= link rather than through
 * /go/<client>, emails a notification once, then tidies the tracking params
 * out of the URL.
 *
 * Reads window.location directly instead of useSearchParams so the component
 * doesn't need a Suspense boundary and doesn't opt pages into dynamic rendering.
 */

const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'source',
  'alerted',
];

/** Only email once per source per browser per day — a return visitor isn't news. */
const REVISIT_WINDOW_MS = 24 * 60 * 60 * 1000;

function alreadyAlerted(source: string): boolean {
  try {
    const key = `suai:src:${source}`;
    const last = Number(window.localStorage.getItem(key) || 0);
    if (Date.now() - last < REVISIT_WINDOW_MS) return true;
    window.localStorage.setItem(key, String(Date.now()));
    return false;
  } catch {
    return false; // private mode / storage disabled — better a duplicate than a miss
  }
}

function cleanUrl(params: URLSearchParams) {
  for (const param of TRACKING_PARAMS) params.delete(param);
  const query = params.toString();
  const url = window.location.pathname + (query ? `?${query}` : '') + window.location.hash;
  window.history.replaceState(null, '', url);
}

export default function SourceTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Accept ?source= too, in case a badge went out without proper UTM naming.
    const source = params.get('utm_source') || params.get('source');
    if (!source) return;

    // /go/<client> already sent the email server-side.
    if (params.get('alerted') === '1') {
      cleanUrl(params);
      return;
    }

    const payload = {
      source,
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      landingPath: window.location.pathname,
      referrer: document.referrer || null,
    };

    cleanUrl(params);

    if (alreadyAlerted(source)) return;

    fetch('/api/notify-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* fire and forget */
    });
  }, []);

  return null;
}
