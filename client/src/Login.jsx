import React, { useState } from "react";
import {
  FaEye, FaEyeSlash, FaCloudUploadAlt,
  FaEnvelope, FaPhoneAlt,
  FaGoogle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuth } from "./utils/auth";
import "./css/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase.js";

/* 🔹 Cloudinary */
const CLOUD_NAME = "dcfdc10zg";
const UPLOAD_PRESET = "findMyCareer";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
const [resetEmail, setResetEmail] = useState("");
const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "job seekers",
    logo: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = role =>
    setForm({ ...form, role });

  /* 🔹 EMAIL LOGIN */
const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await axios.post(
      "${import.meta.env.VITE_API_BASE_URL}/auth/login",
      {
        email: form.email,
        password: form.password,
      }
    );

    const { token, user } = res.data;

    // ✅ correct usage
    setAuth(token, user);

    toast.success("Login successful");
    navigate("/");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

const handlePasswordAction = async () => {
  try {
    setSending(true);

    if (!resetEmail) {
      toast.error("Please enter your email");
      return;
    }

    const res = await fetch(
      "${import.meta.env.VITE_API_BASE_URL}/auth/password-reset",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      }
    );

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Failed to send reset email");
      return;
    }

    toast.success("Password reset link sent to your email");
    setShowPasswordModal(false);
    setResetEmail("");
  } catch {
    toast.error("Something went wrong");
  } finally {
    setSending(false);
  }
};
/* 🔹 GOOGLE LOGIN */
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, { idToken });
    const { token, user } = res.data;
    setAuth(token, user); 
    toast.success("Login successful");
    navigate("/"); 
  } catch (err) {
    console.error("Full Auth Error:", err);
    toast.error(err?.response?.data?.message || "Google login failed");
  }
};
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        body: data
      });
      const json = await res.json();
      if (json.secure_url) {
        setForm(prev => ({ ...prev, logo: json.secure_url }));
      }
    } catch {
      toast.error("Logo upload failed");
    } finally {
      setUploadingLogo(false);
    }
  };
  /* 🔹 SIGN UP */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        "${import.meta.env.VITE_API_BASE_URL}/auth/register",
        form
      );

      if (form.role === "recruiters") {
        toast.info(
          <div style={{ textAlign: "center" }}>
            <strong>Account Submitted ⏳</strong><br />
            Wait <b>upto 48 hours</b> for admin approval.
            <div style={{ fontSize: "13px", marginTop: "6px" }}>
              <div><FaEnvelope /> admin@findmycareer.com</div>
              <div><FaPhoneAlt /> +91 9567194946</div>
            </div>
          </div>,
          { autoClose: 7000 }
        );
      } else {
        toast.success("Account created successfully");
      }

      setIsSignUp(false);
      setForm({
        email: form.email,
        password: "",
        firstName: "",
        lastName: "",
        role: "job seekers",
        logo: ""
      });

    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer position="top-center" theme="dark" />

      <div className="auth-tabs auth-tabs-responsive">
        <button onClick={() => setIsSignUp(false)}
          className={`auth-tab w-50 ${!isSignUp ? "active" : "inactive"}`}>
          Sign in
        </button>
        <button onClick={() => setIsSignUp(true)}
          className={`auth-tab w-50 ${isSignUp ? "active" : "inactive"}`}>
          Sign up
        </button>
      </div>
{showPasswordModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
        background: "white",
        padding: "1.5rem",
        borderRadius: "12px",
        width: "24rem"
      }}
    >
      <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
        Forgot Password
      </h3>

      <input
        type="email"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
        placeholder="Enter your email"
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          marginBottom: "1rem",
          marginTop: "1rem"
        }}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
        <button
          onClick={() => setShowPasswordModal(false)}
          className="btn-danger btn1"
        >
          Cancel
        </button>
        <button
          onClick={handlePasswordAction}
          disabled={sending}
          className="btn-success btn1"
        >
          {sending ? "Sending..." : "Send Link"}
        </button>
      </div>
    </div>
  </div>
)}

      <div className="auth-card">
        {!isSignUp ? (
          <>
            <h2 className="auth-title">FindMyCareer</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="auth-input mt-4"
              value={form.email}
              onChange={handleChange}
            />

            <div className="auth-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="auth-input mt-4 mb-4"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button className="auth-submit-btn"
              onClick={handleLogin}
              disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <button
      onClick={handleGoogleLogin}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        background: "white",
        color: "#1f1f1f",
        border: "2px solid #e0e0e0",
        padding: "14px 24px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "12px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        marginTop: "1rem",
        marginBottom: "1rem"
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.12)";
        e.target.style.borderColor = "#0d6efd";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
        e.target.style.borderColor = "#e0e0e0";
      }}
      onMouseDown={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.1)";
      }}
      onMouseUp={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.12)";
      }}
    >
      <FaGoogle 
        style={{ 
          fontSize: "20px",
          color: "#DB4437"
        }} 
      />
      <span>Continue with Google</span>
    </button>
    <button
            className="forgot-link border-0 bg-transparent text-primary small"
            onClick={() => {
              setResetEmail(form.email || "");
              setShowPasswordModal(true);
            }}
          >
            Forgot Password?
          </button>
          </>
        ) : (
          <>
            <h2 className="auth-title">Create an account</h2>

            <div className="auth-tabs w-100">
              <button
                className={`auth-tab w-50 ${form.role === "job seekers" ? "active" : "inactive"}`}
                onClick={() => handleRoleChange("job seekers")}>
                Job Seekers
              </button>
              <button
                className={`auth-tab w-50 ${form.role === "recruiters" ? "active" : "inactive"}`}
                onClick={() => handleRoleChange("recruiters")}>
                Recruiters
              </button>
            </div>

            <input name="firstName" placeholder="First name"
              className="auth-input mb-3"
              value={form.firstName} onChange={handleChange} />

            <input name="lastName" placeholder="Last name"
              className="auth-input mb-3"
              value={form.lastName} onChange={handleChange} />

            <input type="email" name="email" placeholder="Email"
              className="auth-input mb-3"
              value={form.email} onChange={handleChange} />

            <input type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              className="auth-input mb-3"
              value={form.password}
              onChange={handleChange} />

            {form.role === "recruiters" && (
              <label className="auth-input logo-upload-label mb-3">
                <FaCloudUploadAlt />
                {uploadingLogo ? "Uploading..." : "Upload company logo"}
                <input type="file" hidden onChange={handleLogoUpload} />
              </label>
            )}

            {form.logo && (
              <img src={form.logo} alt="logo" className="logo-preview" />
            )}

            <button className="auth-submit-btn"
              onClick={handleSignUp}
              disabled={isLoading}>
              {isLoading ? "Creating..." : "Create account"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
