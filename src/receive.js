import { connectRabbit } from './config/rabbitmq.js';
import { sendEmail } from './services/emailServices.js'

async function startConsumer() {
  const { channel } = await connectRabbit();
  const queue = 'usuario_registrado';

  await channel.assertQueue(queue, { durable: true });
  console.log(`Esperando mensajes en ${queue}...`);

  channel.consume(queue, async (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('Mensaje recibido:', data);

    // Llama a la función de envío de correo
    await sendEmail(data.email, '¡Bienvenido!', 'Ahora eres parte de Hospital veterinario');
    channel.ack(msg);
  });
}

startConsumer();
