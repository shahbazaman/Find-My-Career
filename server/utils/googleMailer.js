import nodemailer from "nodemailer";

console.log("🟢 Google SMTP Mailer Loaded");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // MUST be false for TLS (587)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP VERIFY FAILED:", error.message);
  } else {
    console.log("✅ SMTP SERVER READY (TLS)");
  }
});

export const sendDummyEmail = async ({ message }) => {
  console.log("📨 Sending dummy email...");

  return transporter.sendMail({
    from: `FindMyCareer <${process.env.FROM_EMAIL}>`,
    to: "shabushahbaz123@gmail.com",
    subject: "Dummy Email Test – FindMyCareer",
    html: `
      <div style="font-family: Arial, sans-serif">
        <h3>Dummy Email Test</h3>
        <p><b>Message:</b></p>
        <p>${message}</p>
      </div>
    `
  });
};
