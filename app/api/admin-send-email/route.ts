import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { verifyBasicAuth } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SENDING_DOMAIN = 'scaleupwithai.ai';
const MAX_ATTACHMENTS = 5;
const MAX_TOTAL_ATTACHMENT_BYTES = 4 * 1024 * 1024;
const MAX_BODY_CHARS = 50000;
const MAX_SUBJECT_CHARS = 200;
const MAX_NAME_CHARS = 100;
const PREFIX_REGEX = /^[A-Za-z0-9._+-]{1,64}$/;
const EMAIL_REGEX = /^[^\s<>@,]+@[^\s<>@,]+\.[^\s<>@,]+$/;
const SAFE_FILENAME_REGEX = /^[^\r\n/\\]{1,255}$/;

const NO_INDEX_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: NO_INDEX_HEADERS });
}

function escapeHtml(s: unknown): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidBase64(s: unknown): boolean {
  if (typeof s !== 'string' || s.length === 0) return false;
  return /^[A-Za-z0-9+/]+={0,2}$/.test(s) && s.length % 4 === 0;
}

export async function POST(req: Request) {
  if (!verifyBasicAuth(req)) {
    return json({ error: 'Unauthorized' }, 401);
  }

  if (!process.env.RESEND_API_KEY) {
    return json({ error: 'Email service not configured' }, 500);
  }

  let payload: any;
  try {
    payload = (await req.json()) || {};
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const prefix = typeof payload.prefix === 'string' ? payload.prefix.trim() : '';
  const to = typeof payload.to === 'string' ? payload.to.trim() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject : '';
  const body = typeof payload.body === 'string' ? payload.body : '';
  const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];

  if (!name || name.length > MAX_NAME_CHARS || /[<>"\r\n]/.test(name)) {
    return json({ error: 'Invalid sender name' }, 400);
  }
  if (!PREFIX_REGEX.test(prefix)) {
    return json({ error: 'Invalid email prefix (allowed: letters, digits, . _ + -, max 64 chars)' }, 400);
  }
  if (!EMAIL_REGEX.test(to) || to.length > 254) {
    return json({ error: 'Invalid recipient email' }, 400);
  }
  if (!subject || subject.length > MAX_SUBJECT_CHARS || /[\r\n]/.test(subject)) {
    return json({ error: 'Invalid subject' }, 400);
  }
  if (!body || body.length > MAX_BODY_CHARS) {
    return json({ error: 'Invalid body' }, 400);
  }
  if (attachments.length > MAX_ATTACHMENTS) {
    return json({ error: `Too many attachments (max ${MAX_ATTACHMENTS})` }, 400);
  }

  const processed: { filename: string; content: string }[] = [];
  let totalBytes = 0;
  for (const att of attachments) {
    if (!att || typeof att !== 'object') {
      return json({ error: 'Invalid attachment' }, 400);
    }
    const filename = typeof att.filename === 'string' ? att.filename : '';
    const content = typeof att.content === 'string' ? att.content : '';
    if (!filename || !SAFE_FILENAME_REGEX.test(filename)) {
      return json({ error: 'Invalid attachment filename' }, 400);
    }
    if (!isValidBase64(content)) {
      return json({ error: 'Invalid attachment content' }, 400);
    }
    const padding = content.endsWith('==') ? 2 : content.endsWith('=') ? 1 : 0;
    const size = (content.length / 4) * 3 - padding;
    totalBytes += size;
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return json({ error: 'Attachments too large (max 4 MB total)' }, 400);
    }
    processed.push({ filename, content });
  }

  const safeName = name.replace(/[\\"]/g, '');
  const fromAddress = `"${safeName}" <${prefix}@${SENDING_DOMAIN}>`;

  const html = `<div style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #1f2937;">${escapeHtml(body)}</div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: fromAddress,
      to: [to],
      subject,
      text: body,
      html,
      attachments: processed.length > 0 ? processed : undefined,
    });

    if (result.error) {
      return json(
        { error: 'Failed to send email', details: result.error.message || String(result.error) },
        502
      );
    }

    return json({ success: true, id: result.data?.id });
  } catch {
    return json({ error: 'Internal server error' }, 500);
  }
}
