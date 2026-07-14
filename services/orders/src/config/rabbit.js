import amqp from 'amqplib';

let connection;
let channel;

export async function connectRabbit() {
  connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('payment-events', { durable: true });
  return channel;
}

export async function publishOrderEvent(event) {
  if (!channel) {
    await connectRabbit();
  }
  await channel.assertExchange('orders.events', 'topic', { durable: true });
  channel.publish('orders.events', 'order.status.changed', Buffer.from(JSON.stringify(event)));
}

export async function consumePaymentEvents() {
  if (!channel) {
    await connectRabbit();
  }
  await channel.assertExchange('payments.events', 'topic', { durable: true });
  const q = await channel.assertQueue('orders.payment-events', { durable: true });
  await channel.bindQueue(q.queue, 'payments.events', 'payment.*');

  channel.consume(q.queue, (msg) => {
    if (!msg) return;
    const payload = JSON.parse(msg.content.toString());
    console.log('Received payment event', payload);
    channel.ack(msg);
  }, { noAck: false });
}
