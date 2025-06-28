import { Verification } from '../models/Verification';
import { sendMail } from '../helpers/mailer';

export const VerificationService = {
  async generateAndSendCode(
    userId: string,
    email: string,
    purpose: 'registration' | 'resend'
  ): Promise<string> {
    await Verification.deleteMany({ userId });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await Verification.create({ userId, code });

    const { subject, text, html } = this.getEmailTemplate(code, purpose);
    await sendMail(email, subject, text, html);

    return code;
  },

  async verifyCode(userId: string, code: string): Promise<boolean> {
    const verification = await Verification.findOne({ userId, code });
    return !!verification;
  },

  getEmailTemplate(code: string, purpose: 'registration' | 'resend') {
    const templates = {
      registration: {
        subject: 'Код подтверждения регистрации',
        text: `Ваш код подтверждения: ${code}`,
        html: `
          <h1>Добро пожаловать!</h1>
          <p>Ваш код подтверждения: <strong>${code}</strong></p>
          <p>Код действителен в течение 10 минут.</p>
        `,
      },
      resend: {
        subject: 'Новый код подтверждения',
        text: `Ваш новый код подтверждения: ${code}`,
        html: `
          <h1>Добро пожаловать!</h1>
          <p>Ваш код подтверждения: <strong>${code}</strong></p>
          <p>Код действителен в течение 10 минут.</p>
        `,
      },
    };

    return templates[purpose];
  },
};
