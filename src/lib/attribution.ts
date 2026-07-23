/**
 * Remembers where a visitor came from so the contact form can say which client
 * badge, campaign, or search sent them.
 *
 * Deliberately sessionStorage, not localStorage: the record lives as long as
 * the tab does and dies with it. Someone who visits from a client badge today
 * and returns cold next week counts as a fresh, unattributed visit rather than
 * being credited to that client forever.
 *
 * First touch wins within a session — the badge that opened the tab gets the
 * credit, not whatever internal link they clicked five pages later.
 */

const KEY = 'suai:attribution';

export type Attribution = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  referrer: string | null;
  landingPage: string;
  landedAt: string;
};

function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null; // private mode, storage disabled, or corrupt JSON
  }
}

function write(value: Attribution): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* attribution is a nice-to-have; never break the page over it */
  }
}

/** Referrers from our own site are just internal navigation, not a source. */
function externalReferrer(): string | null {
  const referrer = document.referrer;
  if (!referrer) return null;
  try {
    if (new URL(referrer).hostname === window.location.hostname) return null;
  } catch {
    return null;
  }
  return referrer.slice(0, 300);
}

/**
 * Call on every pageview. Records the first touch of the session, then leaves
 * it alone — except to fill in a source if the session began without one and a
 * tagged link showed up later.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source') || params.get('source');
  const existing = read();

  if (existing) {
    if (!existing.source && source) {
      write({
        ...existing,
        source,
        medium: params.get('utm_medium'),
        campaign: params.get('utm_campaign'),
      });
    }
    return;
  }

  write({
    source,
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    referrer: externalReferrer(),
    landingPage: window.location.pathname,
    landedAt: new Date().toISOString(),
  });
}

/** Returns null when there is genuinely nothing to report. */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  const stored = read();
  if (!stored) return null;
  if (!stored.source && !stored.referrer) return null;
  return stored;
}
