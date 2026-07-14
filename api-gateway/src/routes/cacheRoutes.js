import express from 'express';
import Redis from 'ioredis';
import config from '../config/env.js';

const router = express.Router();
const redis = new Redis(config.redisUrl);

router.get('/cache-test', async (req, res) => {
  const cached = await redis.get('gateway:cache-test');
  if (cached) {
    return res.json({ fromCache: true, value: cached });
  }

  const payload = JSON.stringify({ ok: true, timestamp: new Date().toISOString() });
  await redis.set('gateway:cache-test', payload, 'EX', 60);
  res.json({ fromCache: false, value: JSON.parse(payload) });
});

export default router;
