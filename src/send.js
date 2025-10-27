import amqp from 'amqplib';

async function send() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'usuario_registrado';
    const msg = 'registrado en cola';

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log("Usuario", msg);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (err) {
    console.error(err);
  }
}

send();
