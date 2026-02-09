import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SendDummyEmail = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    console.log("🟡 [FRONTEND] Send Dummy Email clicked");
    console.log("🟡 Message:", message);

    if (!message.trim()) {
      return toast.error("Message cannot be empty");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/email/test`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log("🟢 Response:", res.data);
      toast.success("Dummy email sent!");
    } catch (error) {
      console.error("🔴 Frontend error:", error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Send Dummy Email</h2>

      <textarea
        rows="4"
        style={{ width: "100%", padding: "10px" }}
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendEmail}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "10px",
          width: "100%"
        }}
      >
        {loading ? "Sending..." : "Send Dummy Email"}
      </button>
    </div>
  );
};

export default SendDummyEmail;
