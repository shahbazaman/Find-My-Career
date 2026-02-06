import nodemailer from "nodemailer";

/* ================= CREATE TRANSPORTER ================= */
const transporter = nodemailer.createTransport({
  service: "gmail", // Adding this helps Nodemailer auto-configure Gmail settings
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // 🔑 INCREASED TIMEOUTS FOR RENDER (5s is too short for cloud handshake)
  connectionTimeout: 15000, 
  greetingTimeout: 15000,
  socketTimeout: 15000,
  pool: true // 🚀 Added pooling for "Schedule Interview" (handles multiple emails better)
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