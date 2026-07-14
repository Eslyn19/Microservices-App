import { Router } from 'express';
import { listOrders, createOrder } from '../controllers/orders.controller.js';

const router = Router();

router.get('/', listOrders);
router.post('/', createOrder);

export default router;
