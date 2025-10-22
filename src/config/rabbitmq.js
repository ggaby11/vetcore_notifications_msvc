import amqp from 'amqplib';

export async function connectRabbit() {
  const url = process.env.RABBITMQ_URL;
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();
  return { connection, channel };
}
