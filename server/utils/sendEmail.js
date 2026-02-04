import nodemailer from "nodemailer";

/* ================= CREATE TRANSPORTER ================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  // 🔑 VERY IMPORTANT FOR RENDER
  connectionTimeout: 5000, // 5 seconds
  greetingTimeout: 5000,
  socketTimeout: 5000
});

/* ================= SEND EMAIL (NON-BLOCKING) ================= */
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"FindMyCareer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("✅ Email sent to:", to);
  } catch (error) {
    // ❗ DO NOT THROW — this prevents "Processing…" freeze
    console.error("❌ EMAIL FAILED (NON-BLOCKING):", error.message);
  }
};

export default sendEmail;
