import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export function verifyToken(req, res, next) {
  if (req.path === '/health' || req.path === '/auth/token') {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    req.user = jwt.verify(token, config.jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
