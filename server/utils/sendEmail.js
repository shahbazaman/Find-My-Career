// import { Resend } from "resend";

/* ===================== INIT ===================== */
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is missing");
}

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);

/**
 * Send email using Resend (TEST MODE)
 */
export default async function sendEmail({ to, subject, html }) {
  console.log("📨 RESEND: attempting to send email");
  console.log("➡️ Subject:", subject);
  
  const { data, error } = await resend.emails.send({
    from: "FindMyCareer <onboarding@resend.dev>",
    to: ["test@uaildeukar.resend.app"], // force test inbox
    subject,
    html,
  });

  if (error) {
    console.error("❌ RESEND ERROR:", error);
    throw new Error(error.message);
  }

  console.log("✅ RESEND EMAIL SENT | ID:", data.id);
  return data.id;
}
