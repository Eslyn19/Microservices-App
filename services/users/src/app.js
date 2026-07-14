import express from 'express';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config({path: '.env'});

const app = express();

app.use(express.json());
app.use(pinoHttp());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'users' }));
app.use('/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
    console.log(`users-service listening on port ${PORT}`)
);