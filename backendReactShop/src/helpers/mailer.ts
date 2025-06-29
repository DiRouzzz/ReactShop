import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  try {
    const result = await transporter.sendMail({
      from: `ReactShop <${process.env.MAILER_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log('Письмо отправлено:', result);
  } catch (err) {
    console.error('Ошибка отправки письма:', err);
    throw err;
  }
};
