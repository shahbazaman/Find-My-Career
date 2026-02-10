import nodemailer from "nodemailer";

console.log("🔥 EMAIL TEST CONTROLLER LOADED");

/* ================= SMTP TRANSPORT (HARDENED) ================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS (REQUIRED)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },

  // ⛔ IMPORTANT: prevents infinite waiting
  connectionTimeout: 10_000, // 10s
  greetingTimeout: 10_000,
  socketTimeout: 10_000
});

/* ================= VERIFY (LOG ONLY) ================= */
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP VERIFY FAILED:", err.message);
  } else {
    console.log("✅ SMTP SERVER READY");
  }
});

/* ================= SEND TEST EMAIL ================= */
export const sendTestEmail = async (req, res) => {
  console.log("🟡 /api/email/test HIT");
  console.log("🟡 Body:", req.body);

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    // 🔍 Critical debug (NO secrets leaked)
    console.log("🔐 SMTP CONFIG CHECK", {
      user: process.env.GMAIL_USER,
      passLength: process.env.GMAIL_APP_PASSWORD?.length
    });

    const info = await transporter.sendMail({
      from: `"FindMyCareer" <${process.env.GMAIL_USER}>`,
      to: "shabushahbaz123@gmail.com",
      subject: "Dummy Email Test",
      text: message,
      html: `<p>${message}</p>`
    });

    console.log("🟢 EMAIL SENT SUCCESSFULLY:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Dummy email sent successfully"
    });
  } catch (err) {
    console.error("🔴 EMAIL SEND ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send dummy email"
    });
  }
};
