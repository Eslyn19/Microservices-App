import express from 'express';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import orderRoutes from './routes/orders.routes.js';
import { connectRabbit, consumePaymentEvents } from './config/rabbit.js';

dotenv.config({ path: '.env' });

const app = express();
app.use(express.json());
app.use(pinoHttp());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'orders' }));
app.use('/orders', orderRoutes);

const PORT = process.env.ORDERS_PORT

async function start() {
  try {
    await connectRabbit();
    await consumePaymentEvents();
    
    app.listen(PORT, () => console.log(`orders-service listening on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start orders-service', error);
    process.exit(1);
  }
};

start();