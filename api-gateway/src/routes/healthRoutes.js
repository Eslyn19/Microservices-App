import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', gateway: true });
});

router.get('/auth/token', (req, res) => {
  const token = jwt.sign({ sub: 'gateway-user' }, config.jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
