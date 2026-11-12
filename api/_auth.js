// Shared helpers for the Journal app's sign-in. Files starting with "_" are not pages on their own.
//
// Set these in Vercel → your project → Settings → Environment Variables:
//   JOURNAL_PASSWORD  the password you'll type in the Journal app (12+ characters)
//   GITHUB_TOKEN      a GitHub access key that can change your blog's files (see README)
// Optional:
//   GITHUB_REPO       "username/repository" (found automatically on Vercel if left out)
//   GITHUB_BRANCH     defaults to "main"
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const env = (k) => (process.env[k] ?? '').trim();

export function settings() {
  const [owner, repo] = env('GITHUB_REPO')
    ? env('GITHUB_REPO').split('/')
    : [env('VERCEL_GIT_REPO_OWNER'), env('VERCEL_GIT_REPO_SLUG')];
  return {
    password: env('JOURNAL_PASSWORD'),
    token: env('GITHUB_TOKEN'),
    owner: owner ?? '',
    repo: repo ?? '',
    branch: env('GITHUB_BRANCH') || 'main',
  };
}

export function problem() {
  const s = settings();
  if (!s.password) return 'JOURNAL_PASSWORD isn’t set in Vercel yet.';
  if (s.password.length < 12) return 'JOURNAL_PASSWORD in Vercel is too short. Use at least 12 characters.';
  if (!s.token) return 'GITHUB_TOKEN isn’t set in Vercel yet.';
  if (!s.owner || !s.repo) return 'Vercel couldn’t tell which GitHub repository this is. Add GITHUB_REPO (like janedoe/my-blog).';
  return '';
}

// Changing the password (or the GitHub key) signs out every phone.
const secret = () => {
  const s = settings();
  return createHash('sha256').update(`journal|${s.password}|${s.token}`).digest();
};
const b64 = (buf) => Buffer.from(buf).toString('base64url');

export const DAYS = 90;
export function makeSession() {
  const payload = b64(JSON.stringify({ exp: Date.now() + DAYS * 86_400_000 }));
  return `${payload}.${b64(createHmac('sha256', secret()).update(payload).digest())}`;
}

export function checkSession(req) {
  const m = /^Bearer (.+)$/.exec(req.headers.authorization ?? '');
  if (!m) return false;
  const [payload, sig] = m[1].split('.');
  if (!payload || !sig) return false;
  const want = createHmac('sha256', secret()).update(payload).digest();
  const got = Buffer.from(sig, 'base64url');
  if (got.length !== want.length || !timingSafeEqual(got, want)) return false;
  try { return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now(); } catch { return false; }
}

export function samePassword(typed) {
  const a = createHash('sha256').update(String(typed ?? '')).digest();
  const b = createHash('sha256').update(settings().password).digest();
  return timingSafeEqual(a, b);
}

export function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json(body);
}
