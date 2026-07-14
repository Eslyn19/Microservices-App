import express from 'express';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import catalogRoutes from './routes/catalogs.routes.js';
import helmet from 'helmet';

dotenv.config({ path: '.env' });

const app = express();
app.use(express.json());
app.use(pinoHttp());
app.disable('x-powered-by');
app.use(helmet());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'catalogs' }));
app.use('/catalogs', catalogRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`catalogs-service listening on port ${PORT}`));
