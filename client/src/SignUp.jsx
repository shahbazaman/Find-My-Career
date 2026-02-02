import React, { useState } from "react";
import {
  FaEye, FaEyeSlash, FaCloudUploadAlt,
  FaEnvelope, FaPhoneAlt, FaGoogle
} from "react-icons/fa";
import axios from "axios";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";

/* ✅ Toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* 🔹 Firebase Google Auth */
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

/* 🔹 Cloudinary */
const CLOUD_NAME = "dcfdc10zg";
const UPLOAD_PRESET = "findMyCareer";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* Forgot password */
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "job seekers",
    logo: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = role =>
    setForm({ ...form, role });

  /* 🔹 Logo upload */
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(UPLOAD_URL, { method: "POST", body: data });
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

  /* 🔹 Signup */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      if (form.role === "recruiters") {
        toast.info(
          <div style={{ textAlign: "center" }}>
            <strong>Account Submitted ⏳</strong>
            <br />
            Wait <b>48 hours</b> for admin approval.
            <div style={{ fontSize: "13px", marginTop: "6px" }}>
              <div><FaEnvelope /> admin@findmycareer.com</div>
              <div><FaPhoneAlt /> +91 9567194946</div>
            </div>
          </div>,
          { autoClose: 10000 }
        );
        setTimeout(() => navigate("/login"), 10000);
      } else {
        toast.success("Account created successfully");
        navigate("/login");
      }

    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* 🔹 Google signup/login */
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      await axios.post("http://localhost:5000/api/auth/google", { idToken });

      toast.success("Google account linked. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error("Google authentication failed");
    }
  };

  /* 🔹 Forgot password */
  const handlePasswordReset = async () => {
    try {
      if (!resetEmail) {
        toast.error("Enter your email");
        return;
      }

      setSending(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/password-reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: resetEmail })
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed");
        return;
      }

      toast.success("Reset link sent to your email");
      setShowPasswordModal(false);
      setResetEmail("");

    } catch {
      toast.error("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="auth-container p-3"> {/* Added padding for mobile screen edges */}
      <ToastContainer position="top-center" theme="dark" />

      {/* 🔹 Forgot password modal */}
      {showPasswordModal && (
        <div className="modal-backdrop">
          <div className="modal-box p-4 shadow-lg rounded-4">
            <h3 className="mb-3">Forgot Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="auth-input mb-3"
            />
            <div className="modal-actions d-flex gap-2 justify-content-end">
              <button className="btn-danger btn1 px-4" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
              <button className="btn-success btn1 px-4" onClick={handlePasswordReset} disabled={sending}>
                {sending ? "Sending..." : "Send Link"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Wrapper with responsive max-width */}
      <div 
        className={`auth-card p-4 p-md-5 ${form.role === "recruiters" ? "white-card" : ""}`}
        style={{ maxWidth: "500px", width: "100%", margin: "20px auto" }}
      >
        {/* 🔹 Role tabs */}
        <div className="auth-tabs w-100 d-flex mb-4">
          <button
            className={`auth-tab flex-fill ${form.role === "job seekers" ? "active" : ""}`}
            onClick={() => handleRoleChange("job seekers")}
            style={{ padding: "12px" }}
          >
            Job Seekers
          </button>
          <button
            className={`auth-tab flex-fill ${form.role === "recruiters" ? "active" : ""}`}
            onClick={() => handleRoleChange("recruiters")}
            style={{ padding: "12px" ,marginLeft:"14px"}}
          >
            Recruiters
          </button>
        </div>

        <h2 className="auth-title mb-4">Create an account</h2>

        <form onSubmit={handleSignUp} className="d-flex flex-column gap-3">
          
          {/* First & Last Name row */}
          <div className="d-flex flex-column flex-md-row gap-3">
            <input name="firstName" placeholder="First name" className="auth-input flex-fill"
              value={form.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last name" className="auth-input flex-fill"
              value={form.lastName} onChange={handleChange} required />
          </div>

          <input name="email" type="email" placeholder="Email address"
            className="auth-input" value={form.email}
            onChange={handleChange} required />

          <div className="auth-input-wrapper w-100">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create strong password"
              className="auth-input w-100"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {form.role === "recruiters" && (
            <div className="mb-2">
              <label className="auth-input logo-upload-label d-flex align-items-center justify-content-center gap-2" style={{ cursor: "pointer" }}>
                <FaCloudUploadAlt size={20} />
                {uploadingLogo ? "Uploading..." : "Upload company logo"}
                <input type="file" hidden onChange={handleLogoUpload} />
              </label>
              {form.logo && (
                <div className="text-center mt-2">
                  <img src={form.logo} className="logo-preview shadow-sm" alt="logo" style={{ maxHeight: "60px", borderRadius: "8px" }} />
                </div>
              )}
            </div>
          )}

          <button className="auth-submit-btn mt-2 py-3 fw-bold" disabled={isLoading || uploadingLogo}>
            {isLoading ? "Processing..." : "Create Account"}
          </button>
        </form>

        <div className="divider my-4 text-center text-muted small position-relative">
           <span className="bg-white px-2" style={{ zIndex: 1, position: "relative" ,borderRadius:"50%"}}>OR</span>
           <hr style={{ marginTop: "-10px" }} />
        </div>

        {/* 🔹 Google button */}
        <button style={{borderRadius:"10px"}} className="google-btn w-100 d-flex align-items-center justify-content-center gap-2 mb-3 py-2" onClick={handleGoogleSignup}>
          <FaGoogle style={{color:"red"}}/> Continue with Google
        </button>

        <div className="text-center">
          <button
            className="forgot-link border-0 bg-transparent text-primary small"
            onClick={() => {
              setResetEmail(form.email || "");
              setShowPasswordModal(true);
            }}
          >
            Forgot Password?
          </button>
        </div>

      </div>
    </div>
  );
}