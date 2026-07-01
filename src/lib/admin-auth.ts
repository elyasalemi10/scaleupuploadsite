import crypto from 'crypto';

function timingSafeEquals(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ab.length !== bb.length) {
    // Compare against itself to keep timing roughly constant, then fail.
    crypto.timingSafeEqual(ab, ab);
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

export function verifyBasicAuth(req: Request): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;

  const header = req.headers.get('authorization');
  if (!header || !header.startsWith('Basic ')) return false;

  let decoded: string;
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
