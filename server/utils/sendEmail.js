import { Resend } from "resend";

/**
 * Initialize Resend with API key
 * Make sure RESEND_API_KEY is set in Render ENV
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send transactional email using Resend
 * Used for:
 *  - Interview schedule alerts
 *  - Admin / system notifications
 *
 * NOTE:
 *  - Firebase handles forgot-password emails separately
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!to || !subject || !html) {
      console.error("❌ Email failed: Missing required fields");
      return false;
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "FindMyCareer <onboarding@resend.dev>",
      to: to, // string or array both supported
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return false;
    }

    console.log("✅ Email sent successfully:", data.id);
    return true;
  } catch (err) {
    console.error("❌ Resend system error:", err.message);
    return false;
  }
};

export default sendEmail;
