import nodemailer from "nodemailer";

console.log("🔥 EMAIL TEST CONTROLLER LOADED");

/* ================= SMTP TRANSPORT ================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS (587)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

/* ================= CONTROLLER ================= */
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

    await transporter.sendMail({
      from: `"FindMyCareer" <${process.env.GMAIL_USER}>`,
      to: "shabushahbaz123@gmail.com",
      subject: "Dummy Email Test",
      text: message,
      html: `<p>${message}</p>`
    });

    console.log("🟢 EMAIL SENT SUCCESSFULLY");

    return res.status(200).json({
      success: true,
      message: "Dummy email sent successfully"
    });
  } catch (err) {
    console.error("🔴 EMAIL SEND ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: "Email sending failed"
    });
  }
};
