import sgMail from "@sendgrid/mail";

console.log("🔥 SENDGRID EMAIL CONTROLLER LOADED");

/* ================= CONFIG ================= */
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    const msg = {
      to: "shabushahbaz123@gmail.com",
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Dummy Email Test - FindMyCareer",
      text: message,
      html: `<strong>${message}</strong>`
    };

    await sgMail.send(msg);

    console.log("🟢 SENDGRID EMAIL SENT");

    return res.status(200).json({
      success: true,
      message: "Dummy email sent successfully"
    });

  } catch (error) {
    console.error("🔴 SENDGRID ERROR:", error.response?.body || error.message);

    return res.status(500).json({
      success: false,
      message: "Email sending failed"
    });
  }
};
