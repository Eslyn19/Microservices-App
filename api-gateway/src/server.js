import express from 'express';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import config from './config/env.js';
import { verifyToken } from './middleware/AuthToken.js';
import healthRoutes from './routes/healthRoutes.js';
import { registerProxyRoutes } from './routes/proxyRoutes.js';
import cacheRoutes from './routes/cacheRoutes.js';
import breakerRoutes from './routes/breakerRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(pinoHttp());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cors());

app.use(verifyToken);
app.use(healthRoutes);
registerProxyRoutes(app);
app.use(cacheRoutes);
app.use(breakerRoutes);

app.listen(config.port, () => {
  console.log(`api-gateway listening on port ${config.port}`);
});
