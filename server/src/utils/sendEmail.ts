import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(to: string, resetUrl: string) {
  try {
    const data = await resend.emails.send({
      from: "Eddy Out <onboarding@resend.dev>",
      to,
      subject: "Reset your Eddy Out password",
      html: `
        <p>Hello from Eddy Out!</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    console.log("✅ Email sent:", data);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}
