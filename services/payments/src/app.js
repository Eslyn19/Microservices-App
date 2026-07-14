import express from 'express';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payments.routes.js';
import { connectRabbit } from './config/rabbit.js';
import helmet from 'helmet';

dotenv.config({ path: '.env' });

const app = express();
app.use(express.json());
app.use(pinoHttp());
app.disable('x-powered-by');
app.use(helmet());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'payments' }));
app.use('/payments', paymentRoutes);

const PORT = process.env.PAYMENTS_PORT;

async function start() {
  try {
    await connectRabbit();
    app.listen(PORT, () => console.log(`payments-service listening on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start payments-service', error);
    process.exit(1);
  }
}

start();
