import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// You can keep this import, or delete it if you use the styles below
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
      {/* Embedded CSS for Responsiveness */}
      <style>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          background: #f4f6f8; /* Light gray background */
          padding: 20px; /* Prevents card from touching edges on small mobiles */
          box-sizing: border-box;
        }

        .auth-card {
          width: 100%;
          max-width: 400px; /* Limits width on desktop */
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .auth-title {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .auth-input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px; /* Prevents zoom on iPhone */
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.3s;
        }

        .auth-input:focus {
          border-color: #007bff;
        }

        .auth-submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .auth-submit-btn:hover {
          background-color: #0056b3;
        }

        /* Mobile specific adjustments (if needed beyond fluid width) */
        @media (max-width: 480px) {
          .auth-card {
            padding: 1.5rem;
          }
          .auth-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

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