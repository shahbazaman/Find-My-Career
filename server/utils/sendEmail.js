import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async ({ to, subject, html }) => {
  // 🚩 CHECKPOINT 1: See if the function starts
  console.log("--- Attempting to send email to:", to, "---");
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"FindMyCareer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    
    // 🚩 CHECKPOINT 2: Success
    console.log("✅ NODEMAILER SUCCESS:", info.messageId);
    return true;
  } catch (error) {
    // 🚩 CHECKPOINT 3: Failure
    console.error("❌ NODEMAILER ERROR:", error.message);
    return false;
  }
};

export default sendEmail;