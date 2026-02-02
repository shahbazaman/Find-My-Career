import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Login.css";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (key === import.meta.env.VITE_ADMIN_SECRET) {
      localStorage.setItem("admin-auth", "true");
      toast.success("Admin login successful");
      navigate("/home");
    } else {
      toast.error("Invalid admin key");
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer position="top-center" />
      <div className="auth-card">
        <h2 className="auth-title text-center">Admin Login</h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Secret Key"
            className="auth-input"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
          <button className="auth-submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
