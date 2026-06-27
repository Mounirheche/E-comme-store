module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password_hash } = req.body || {};
  const adminUser = process.env.ADMIN_USERNAME;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!username || !password_hash) return res.status(400).json({ error: 'Missing fields' });

  if (username === adminUser && password_hash === adminHash) {
    return res.status(200).json({ ok: true, role: 'admin', username });
  }

  return res.status(401).json({ ok: false, error: 'Invalid credentials' });
};
