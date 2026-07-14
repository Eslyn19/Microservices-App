import amqp from 'amqplib';

let connection;
let channel;

export async function connectRabbit() {
  connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertExchange('payments.events', 'topic', { durable: true });
  return channel;
}

export async function publishPaymentEvent(event) {
  if (!channel) {
    await connectRabbit();
  }
  channel.publish('payments.events', 'payment.confirmed', Buffer.from(JSON.stringify(event)));
}
