import nodemailer from "nodemailer";

/* ================= CREATE TRANSPORTER (ONCE) ================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // required for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // MUST be Gmail App Password
  }
});

/* ================= VERIFY TRANSPORTER ================= */
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ EMAIL TRANSPORTER ERROR:", error.message);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

/* ================= SEND EMAIL ================= */
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"FindMyCareer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error("❌ SEND EMAIL FAILED:", {
      to,
      subject,
      message: error.message
    });
    throw error; // important: bubble up to controller
  }
};

export default sendEmail;