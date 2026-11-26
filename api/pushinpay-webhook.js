module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, endpoint: 'pushinpay-webhook' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        const params = new URLSearchParams(payload);
        payload = Object.fromEntries(params.entries());
      }
    }

    const targetUrl = process.env.BOT_PUSHINPAY_WEBHOOK_URL || 'http://184.107.176.201:4060/webhook/pushinpay';
    const fwdRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload || {}),
      signal: AbortSignal.timeout(8000),
    });

    const text = await fwdRes.text().catch(() => '');
    return res.status(fwdRes.ok ? 200 : 502).json({
      received: true,
      forwarded: fwdRes.ok,
      upstreamStatus: fwdRes.status,
      upstreamBody: text,
    });
  } catch (err) {
    console.error('[PUSHINPAY PROXY ERROR]', err.message);
    return res.status(500).json({ error: err.message });
  }
};
