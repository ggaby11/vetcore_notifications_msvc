import { connectRabbit } from './config/rabbitmq.js';
import { sendEmail } from './services/emailServices.js';

async function startConsumer() {
  const { channel } = await connectRabbit();
  const queue = 'usuario_registrado';

  console.log("desde receive ENV:", process.env.GMAIL_USER, process.env.GMAIL_PASS);


  await channel.assertQueue(queue, { durable: false });
  console.log(`Esperando mensajes en ${queue}...`);

  channel.consume(queue, async (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('Mensaje recibido:', data);

    const html = `
      <div style="font-family: Arial, sans-serif; background: #f6f6f6; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 30px; text-align: center;">
          <img src="https://drive.google.com/file/d/194T2EGxLTbY9-tMlIuUNFlL1Hg3zencO/view" alt="Logo Hospital Veterinario" width="120" style="margin-bottom: 20px;">
          <h2 style="color: #3f51b5;">¡Bienvenido, ${data.name}! 🐾</h2>
          <p style="color: #555; font-size: 16px;">
            Gracias por unirte al <strong>Hospital Veterinario</strong>.<br>
            Ahora eres parte de nuestra comunidad dedicada al cuidado animal
          </p>
          <a href="https://hospitalveterinario.com/login" 
             style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #3f51b5; color: #fff; border-radius: 6px; text-decoration: none;">
             Iniciar Sesión
          </a>
        </div>
      </div>
    `;

    await sendEmail(data.email, 'Registro exitosos ¡Bienvenido al Hospital Veterinario!', html);
    channel.ack(msg);
  });
}

startConsumer();
