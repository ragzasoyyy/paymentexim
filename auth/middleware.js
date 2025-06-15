// middleware.js
const rateLimitMap = new Map();

module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== 'RAZGZ_SUPERKEY_001') {
    return res.status(401).json({ error: 'Unauthorized API Key' });
  }

  const now = Date.now();
  const windowTime = 60 * 1000; // 1 menit
  const maxRequests = 10;

  if (!rateLimitMap.has(apiKey)) {
    rateLimitMap.set(apiKey, []);
  }

  const timestamps = rateLimitMap.get(apiKey).filter(ts => now - ts < windowTime);
  timestamps.push(now);

  if (timestamps.length > maxRequests) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  rateLimitMap.set(apiKey, timestamps);

  next();
};