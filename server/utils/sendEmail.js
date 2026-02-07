import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "FindMyCareer <onboarding@resend.dev>", // 🔴 DO NOT CHANGE
      to,
      subject,
      html,
    });

    console.log("✅ Resend email sent:", response.id);
    return true;
  } catch (error) {
    console.error("❌ Resend email error:", error);
    return false;
  }
};

export default sendEmail;
