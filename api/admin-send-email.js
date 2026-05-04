import crypto from 'crypto';
import { Resend } from 'resend';

const SENDING_DOMAIN = 'scaleupwithai.ai';
const MAX_ATTACHMENTS = 5;
const MAX_TOTAL_ATTACHMENT_BYTES = 4 * 1024 * 1024;
const MAX_BODY_CHARS = 50000;
const MAX_SUBJECT_CHARS = 200;
const MAX_NAME_CHARS = 100;
const PREFIX_REGEX = /^[A-Za-z0-9._+-]{1,64}$/;
const EMAIL_REGEX = /^[^\s<>@,]+@[^\s<>@,]+\.[^\s<>@,]+$/;
const SAFE_FILENAME_REGEX = /^[^\r\n/\\]{1,255}$/;

function timingSafeEquals(a, b) {
  const ab = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ab.length !== bb.length) {
    crypto.timingSafeEqual(ab, ab);
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

function verifyBasicAuth(req) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;

  const header = req.headers && req.headers.authorization;
  if (!header || typeof header !== 'string' || !header.startsWith('Basic ')) {
    return false;
  }

  let decoded;
  try {
    decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  } catch {
    return false;
  }

  const idx = decoded.indexOf(':');
  if (idx === -1) return false;

  const user = decoded.slice(0, idx);
  const pass = decoded.slice(idx + 1);

  const userOk = timingSafeEquals(user, expectedUser);
  const passOk = timingSafeEquals(pass, expectedPass);
  return userOk && passOk;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidBase64(s) {
  if (typeof s !== 'string' || s.length === 0) return false;
  return /^[A-Za-z0-9+/]+={0,2}$/.test(s) && s.length % 4 === 0;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyBasicAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const payload = req.body || {};
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const prefix = typeof payload.prefix === 'string' ? payload.prefix.trim() : '';
  const to = typeof payload.to === 'string' ? payload.to.trim() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject : '';
  const body = typeof payload.body === 'string' ? payload.body : '';
  const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];

  if (!name || name.length > MAX_NAME_CHARS || /[<>"\r\n]/.test(name)) {
    return res.status(400).json({ error: 'Invalid sender name' });
  }
  if (!PREFIX_REGEX.test(prefix)) {
    return res.status(400).json({ error: 'Invalid email prefix (allowed: letters, digits, . _ + -, max 64 chars)' });
  }
  if (!EMAIL_REGEX.test(to) || to.length > 254) {
    return res.status(400).json({ error: 'Invalid recipient email' });
  }
  if (!subject || subject.length > MAX_SUBJECT_CHARS || /[\r\n]/.test(subject)) {
    return res.status(400).json({ error: 'Invalid subject' });
  }
  if (!body || body.length > MAX_BODY_CHARS) {
    return res.status(400).json({ error: 'Invalid body' });
  }
  if (attachments.length > MAX_ATTACHMENTS) {
    return res.status(400).json({ error: `Too many attachments (max ${MAX_ATTACHMENTS})` });
  }

  const processed = [];
  let totalBytes = 0;
  for (const att of attachments) {
    if (!att || typeof att !== 'object') {
      return res.status(400).json({ error: 'Invalid attachment' });
    }
    const filename = typeof att.filename === 'string' ? att.filename : '';
    const content = typeof att.content === 'string' ? att.content : '';
    if (!filename || !SAFE_FILENAME_REGEX.test(filename)) {
      return res.status(400).json({ error: 'Invalid attachment filename' });
    }
    if (!isValidBase64(content)) {
      return res.status(400).json({ error: 'Invalid attachment content' });
    }
    const padding = (content.endsWith('==') ? 2 : content.endsWith('=') ? 1 : 0);
    const size = (content.length / 4) * 3 - padding;
    totalBytes += size;
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return res.status(400).json({ error: 'Attachments too large (max 4 MB total)' });
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
      return res.status(502).json({ error: 'Failed to send email', details: result.error.message || String(result.error) });
    }

    return res.status(200).json({ success: true, id: result.data?.id });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
