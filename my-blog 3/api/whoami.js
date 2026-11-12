// GET /api/whoami → which blog and branch the Journal app is connected to (only when signed in).
import { settings, problem, checkSession, send } from './_auth.js';
export default function handler(req, res) {
  const issue = problem();
  if (issue) return send(res, 503, { error: issue });
  if (!checkSession(req)) return send(res, 401, { error: 'signed-out' });
  const s = settings();
  return send(res, 200, { owner: s.owner, repo: s.repo, branch: s.branch });
}
