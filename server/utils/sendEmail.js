import nodemailer from "nodemailer";

/* ================= CREATE TRANSPORTER ================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,              // 👈 Changed from 465
  secure: false,          // 👈 Must be false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // 👈 Helps avoid "self-signed certificate" issues on Render
  },
  connectionTimeout: 20000, 
  greetingTimeout: 20000,
  socketTimeout: 20000,
  pool: true
});
/* ================= SEND EMAIL ================= */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      // 🔑 Use your EMAIL_FROM env variable here
      from: process.env.EMAIL_FROM || `"FindMyCareer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("✅ Email successfully delivered to:", to, "ID:", info.messageId);
    return true;
  } catch (error) {
    // ❗ Log the FULL error so you can see why it failed in Render logs
    console.error("❌ NODEMAILER ERROR:", error.message);
    return false;
  }
};

export default sendEmail;