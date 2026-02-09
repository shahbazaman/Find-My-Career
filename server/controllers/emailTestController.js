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
