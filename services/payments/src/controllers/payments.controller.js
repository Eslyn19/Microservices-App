import { publishPaymentEvent } from '../config/rabbit.js';

export async function createPayment(req, res, next) {
  try {
    const { orderId, amount } = req.body;
    if (!orderId || !amount) {
      return res.status(400).json({ error: 'orderId and amount are required' });
    }

    const payment = { id: Date.now(), orderId, amount, status: 'confirmed' };
    await publishPaymentEvent({ type: 'payment.confirmed', payment });
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
}
