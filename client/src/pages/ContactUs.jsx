import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Send, CheckCircle, User, FileText, MessageSquare } from 'lucide-react';
import axios from "axios";
import { getUserId } from "../../../client/src/utils/auth.js";

const ContactUs = () => {
  // --- Form Logic & States ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const userId = getUserId();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/queries/user/${userId}`, formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Query submit error:", error);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <style>{`
        .contact-page-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #060729 0%, #0c248d 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }

        .main-card {
          display: flex;
          background: white;
          width: 100%;
          max-width: 800px;
          height: 520px; /* Adjusted height to fit content */
          border-radius: 30px;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        /* Left Side */
        .image-section {
          flex: 1;
          background: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80');
          background-size: cover;
          background-position: center;
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
          position: relative;
        }

        .info-card {
          position: absolute;
          left: -30px;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          width: 260px;
          z-index: 10;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .info-icon { color: #4f46e5; font-size: 1.1rem; }
        .info-text h4 { margin: 0; font-size: 0.9rem; color: #1e293b; }
        .info-text p { margin: 2px 0 0; font-size: 0.8rem; color: #64748b; line-height: 1.3; }

        /* Right Side Form */
        .form-section {
          flex: 1.2;
          padding: 30px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .form-section h2 { margin: 0 0 15px 0; font-size: 1.6rem; color: #1e293b; }

        .input-group { margin-bottom: 12px; }
        .input-group label { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          margin-bottom: 5px; 
          font-weight: 600; 
          color: #475569; 
          font-size: 0.85rem; 
        }

        .input-group input, .input-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: none;
          background: #f1f5f9;
          border-radius: 10px;
          font-size: 0.9rem;
          outline: none;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: 0.3s;
          margin-top: 5px;
        }

        .submit-btn.success { background: #10b981; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        @media (max-width: 850px) {
          .main-card { flex-direction: column; height: auto; max-height: none; }
          .info-card { position: relative; left: 0; transform: none; width: auto; margin: 10px; }
          .image-section { min-height: 200px; border-radius: 30px 30px 0 0; }
        }
      `}</style>

      <div className="main-card">
        <div className="image-section">
          <div className="info-card">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div className="info-text">
                <h4>Location</h4>
                <p>UL Cyber Park, Calicut</p>
              </div>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div className="info-text">
                <h4>Mail</h4>
                <p>support@findmycareer.com</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <div className="info-text">
                <h4>Phone</h4>
                <p>+91 9567194946</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "10px", justifyContent: "center" }}>
              <a href="https://wa.me/qr/BNL67C4NRDVEL1" target="_blank" rel="noreferrer" style={{ color: "#25D366", fontSize: "20px" }}><FaWhatsapp /></a>
              <a href="https://www.instagram.com/directaxistech?igsh=MXB0bjJqeHZpa3ZwMA==" target="_blank" rel="noreferrer" style={{ color: "#E4405F", fontSize: "20px" }}><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Submit Your Query</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label><User size={14} /> Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
            </div>

            <div className="input-group">
              <label><FaEnvelope size={14} /> Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>

            <div className="input-group">
              <label><FileText size={14} /> Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required />
            </div>

            <div className="input-group">
              <label><MessageSquare size={14} /> Your Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Describe your query..." required />
            </div>

            <button type="submit" className={`submit-btn ${submitted ? 'success' : ''}`} disabled={submitted}>
              {submitted ? (
                <><CheckCircle size={20} /> Sent Successfully!</>
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;