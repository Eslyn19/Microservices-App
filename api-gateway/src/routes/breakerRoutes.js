import express from 'express';
import CircuitBreaker from 'opossum';
import config from '../config/env.js';

const router = express.Router();

function createBreaker(target) {
  return new CircuitBreaker(async () => {
    const response = await fetch(`${target}/health`);
    if (!response.ok) {
      throw new Error('Service unavailable');
    }
    return response.json();
  }, {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
  });
}

const breakers = Object.fromEntries(
  Object.entries(config.services).map(([name, target]) => [name, createBreaker(target)])
);

router.get('/breaker/:service', async (req, res) => {
  const breaker = breakers[req.params.service];
  if (!breaker) {
    return res.status(404).json({ error: 'Service not found' });
  }

  try {
    const result = await breaker.fire();
    res.json(result);
  } catch {
    res.status(503).json({ error: 'Service unavailable' });
  }
});

export default router;
