import { publishOrderEvent } from '../config/rabbit.js';

const orders = [];

export async function listOrders(req, res, next) {
  try {
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function createOrder(req, res, next) {
  try {
    const { userId, amount } = req.body;
    if (!userId || !amount) {
      return res.status(400).json({ error: 'userId and amount are required' });
    }

    const order = { id: orders.length + 1, userId, amount, status: 'created' };
    orders.push(order);
    await publishOrderEvent({ type: 'order.created', order });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}
