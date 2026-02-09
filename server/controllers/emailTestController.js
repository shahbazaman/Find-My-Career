import nodemailer from "nodemailer";

console.log("🔥 EMAIL TEST CONTROLLER LOADED");

/* ================= SMTP TRANSPORT ================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // MUST be false for TLS (587)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

/* ================= OPTIONAL VERIFY (LOG ONLY) ================= */
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP VERIFY FAILED:", err.message);
  } else {
    console.log("✅ SMTP SERVER READY");
  }
});

/* ================= CONTROLLER (ONLY ONCE) ================= */
export const sendTestEmail = async (req, res) => {
  console.log("🟡 /api/email/test HIT");
  console.log("🟡 req.user:", req.user);
  console.log("🟡 req.body:", req.body);

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    await transporter.sendMail({
      from: `"FindMyCareer" <${process.env.GMAIL_USER}>`,
      to: "shabushahbaz123@gmail.com",
      subject: "Dummy Email Test",
      text: message,
      html: `<p>${message}</p>`
    });

    console.log("🟢 EMAIL SENT SUCCESSFULLY");

    res.status(200).json({
      success: true,
      message: "Dummy email sent successfully"
    });
  } catch (err) {
    console.error("🔴 EMAIL SEND ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Email sending failed"
    });
  }
};
