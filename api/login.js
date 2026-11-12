// POST /api/login  { password }  →  { session, days }
// GET  /api/login                →  { ready, problem }  (is sign-in set up?)
import { problem, samePassword, makeSession, send, DAYS } from './_auth.js';

// Wrong guesses are slowed down, and after 5 in a row that address waits 15 minutes.
// (Kept in memory, so it resets when Vercel restarts the function. A long password is the real protection.)
const fails = new Map();
const LIMIT = 5;
const WAIT = 15 * 60_000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function handler(req, res) {
  const issue = problem();
  if (req.method === 'GET') return send(res, 200, { ready: !issue, problem: issue });
  if (req.method !== 'POST') return send(res, 405, { error: 'Use POST.' });
  if (issue) return send(res, 503, { error: issue });

  const ip = String(req.headers['x-forwarded-for'] ?? 'unknown').split(',')[0].trim();
  const f = fails.get(ip);
  if (f && f.count >= LIMIT && Date.now() - f.at < WAIT) {
    const min = Math.ceil((WAIT - (Date.now() - f.at)) / 60_000);
    return send(res, 429, { error: `Too many wrong passwords. Try again in ${min} minute${min === 1 ? '' : 's'}.` });
  }

  const password = req.body?.password;
  if (typeof password === 'string' && password && samePassword(password)) {
    fails.delete(ip);
    return send(res, 200, { session: makeSession(), days: DAYS });
  }
  const count = (f && Date.now() - f.at < WAIT ? f.count : 0) + 1;
  fails.set(ip, { count, at: Date.now() });
  await sleep(1000);
  const left = LIMIT - count;
  return send(res, 401, { error: left > 0 ? `That password isn’t right. ${left} more tr${left === 1 ? 'y' : 'ies'} before a 15-minute wait.` : 'That password isn’t right. Wait 15 minutes, then try again.' });
}
