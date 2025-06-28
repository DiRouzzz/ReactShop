import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'drose1254@gmail.com',
    pass: 'zzqvkigammuvrokc',
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
      from: 'ReactShop <drose1254@gmail.com>',
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
