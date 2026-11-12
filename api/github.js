// The Journal app's way to change your blog when you sign in with a password.
// It passes requests to GitHub using the GITHUB_TOKEN kept in Vercel, so the key never reaches your phone.
// Only your own blog's repository can be reached, and only the parts the Journal app needs.
import { settings, problem, checkSession, send } from './_auth.js';

const ALLOWED = /^\/(git\/(ref|refs|commits|blobs|trees)(\/[^?#]*)?|contents\/[^?#]+)(\?ref=[\w.\-\/%]+)?$/;


export default async function handler(req, res) {
  const issue = problem();
  if (issue) return send(res, 503, { error: issue });
  if (!checkSession(req)) return send(res, 401, { error: 'signed-out' });

  const path = String(req.query.path ?? '');
  if (!ALLOWED.test(path) || path.includes('..')) return send(res, 400, { error: 'That isn’t something the Journal app is allowed to do.' });
  if (!['GET', 'POST', 'PATCH'].includes(req.method)) return send(res, 405, { error: 'Not allowed.' });

  const s = settings();
  let gh;
  try {
    gh = await fetch(`https://api.github.com/repos/${s.owner}/${s.repo}${path}`, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${s.token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'notebook-journal',
        ...(req.method !== 'GET' ? { 'Content-Type': 'application/json' } : {}),
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body ?? {}) : undefined,
    });
  } catch {
    return send(res, 502, { error: 'Couldn’t reach GitHub. Try again in a moment.' });
  }
  // A problem with the server's key is reported differently from "you're signed out".
  if (gh.status === 401) return send(res, 502, { error: 'github-key', status: 401 });
  if (gh.status === 403) return send(res, 502, { error: 'github-permission', status: 403 });
  const text = await gh.text();
  res.setHeader('Cache-Control', 'no-store');
  res.status(gh.status).setHeader('Content-Type', 'application/json').send(text || 'null');
}
