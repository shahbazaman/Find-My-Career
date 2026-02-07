import { Resend } from "resend";

/**
 * Resend client
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email helper (Resend)
 * TEST MODE – sends ONLY to Resend test inbox
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      // ⚠️ Correct for unverified domain
      from: "FindMyCareer <onboarding@resend.dev>",

      // ✅ Correct: hardcoded Resend test inbox
      to: ["test@uaildeukar.resend.app"],

      subject,
      html,
    });

    if (error) {
      console.error("❌ RESEND ERROR:", error.message);
      return false;
    }

    console.log("✅ RESEND SUCCESS | Email ID:", data.id);
    return true;
  } catch (err) {
    console.error("❌ RESEND SYSTEM ERROR:", err.message);
    return false;
  }
};

export default sendEmail;
