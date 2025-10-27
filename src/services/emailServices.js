// correo desde el que envia

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log("ENV:", process.env.GMAIL_USER, process.env.GMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS,
}
});

export async function sendEmail(to, subject, html) {
  const mail = {
    from: `"Hospital Veterinario" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mail);
    console.log(`Correo enviado a ${to}`);
  } catch (err) {
    console.error('Error enviando el correo:', err);
  }
}
