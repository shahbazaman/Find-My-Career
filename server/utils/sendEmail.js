import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  console.log("📨 RESEND: Sending email to test inbox");

  const { data, error } = await resend.emails.send({
    from: "FindMyCareer <onboarding@resend.dev>",
    to: ["test@uaildeukar.resend.app"], // force test inbox
    subject,
    html,
  });

  if (error) {
    console.error("❌ RESEND FAILED:", error);
    throw new Error(error.message);
  }

  console.log("✅ RESEND SENT | ID:", data.id);
  return data.id;
};

export default sendEmail;
