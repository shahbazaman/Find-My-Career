import { sendDummyEmail } from "../utils/googleMailer.js";

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

    await sendDummyEmail({ message });

    console.log("🟢 Dummy email sent successfully");

    return res.status(200).json({
      success: true,
      message: "Dummy email sent successfully"
    });
  } catch (error) {
    console.error("🔴 EMAIL ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
};
export const sendTestEmail = async (req, res) => {
  console.log("🟡 /api/email/test HIT");
  console.log("🟡 req.user:", req.user);
  console.log("🟡 req.body:", req.body);

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // email logic...
  } catch (err) {
    console.error("🔴 EMAIL TEST ERROR:", err);
    res.status(500).json({ message: "Email send failed" });
  }
};
