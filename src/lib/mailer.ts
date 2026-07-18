import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export async function sendOtpEmail(to: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: `"webmodernseo Cockpit" <${SMTP_USER}>`,
    to,
    subject: `Votre code de connexion : ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #000000;">Code de vérification</h2>
        <p style="color: #5c5c64;">Utilisez ce code pour finaliser votre connexion au Cockpit webmodernseo :</p>
        <div style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #ff4d00; text-align: center; padding: 24px; background: #FDFBF7; border-radius: 12px; margin: 24px 0;">
          ${code}
        </div>
        <p style="color: #5c5c64; font-size: 13px;">Ce code expire dans 5 minutes. Si vous n'êtes pas à l'origine de cette tentative de connexion, ignorez cet email.</p>
      </div>
    `,
  });
}
