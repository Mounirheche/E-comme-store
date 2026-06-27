module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;

  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  if (!body || typeof body !== 'object') {
    body = await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => { data += chunk; });
      req.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({}); }
      });
    });
  }

  const { username, password } = body || {};
  // Trim env vars to remove any CR/LF from Windows echo piping
  const adminUser = (process.env.ADMIN_USERNAME || '').trim();
  const adminPass = (process.env.ADMIN_PASSWORD || '').trim();

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (username.trim() === adminUser && password === adminPass) {
    return res.status(200).json({ ok: true, role: 'admin', username: adminUser });
  }

  return res.status(401).json({ ok: false, error: 'Invalid credentials' });
};
