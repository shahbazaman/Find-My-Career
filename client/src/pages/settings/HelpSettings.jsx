import { useState } from 'react';
import {
  HelpCircle,
  Send,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  User,
  FileText,
  CheckCircle,
  Clock,
  Headphones,
  Globe
} from 'lucide-react';
import axios from "axios";
import { getUserId } from "../../utils/auth.js";

const HelpSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const userId = getUserId();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!userId) return;

  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/queries/user/${userId}`,
      formData
    );

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 3000);
  } catch (error) {
    console.error("Query submit error:", error);
  }
};

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@findmycareer.com',
      subtext: 'We reply within 24 hours',
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+91 9567194946',
      subtext: 'Mon-Fri, 9AM-6PM IST',
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: 'Malappuram, Kerala, India',
      subtext: 'Visit us for in-person help',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50'
    },
    {
      icon: Globe,
      title: 'Live Chat',
      details: 'Available 24/7',
      subtext: 'Get instant responses',
      color: 'from-orange-500 to-red-500',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="help-container mt-5">
      {/* Header */}
      <div className="settings-header fade-in">
        <div className="header-icon-wrapper">
          <div className="header-icon-glow"></div>
          <div className="header-icon">
            <HelpCircle className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h1 className="settings-title">Help & Guidance</h1>
          <p className="settings-subtitle">We're here to help! Submit your query below or reach out through any of our contact channels</p>
        </div>
      </div>

      <div className="content-grid">
        {/* Query Form */}
        <div className="form-column">
          <div className="settings-card fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="card-header">
              <div className="header-content">
                <div className="header-icon-small">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="card-title">Submit Your Query</h2>
                  <p className="card-subtitle">We'll get back to you as soon as possible</p>
                </div>
              </div>
            </div>

            <div className="card-content">
              <div className="form-sections">
                {/* Name Field */}
                <div className="form-field slide-right" style={{animationDelay: '0.3s'}}>
                  <label className="field-label">
                    <User className="w-4 h-4 text-blue-500" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`form-input ${focusedField === 'name' ? 'focused' : ''}`}
                  />
                </div>

                {/* Email Field */}
                <div className="form-field slide-right" style={{animationDelay: '0.4s'}}>
                  <label className="field-label">
                    <Mail className="w-4 h-4 text-purple-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your mail"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`form-input ${focusedField === 'email' ? 'focused' : ''}`}
                  />
                </div>

                {/* Subject Field */}
                <div className="form-field slide-right" style={{animationDelay: '0.5s'}}>
                  <label className="field-label">
                    <FileText className="w-4 h-4 text-pink-500" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className={`form-input ${focusedField === 'subject' ? 'focused' : ''}`}
                  />
                </div>

                {/* Message Field */}
                <div className="form-field slide-right" style={{animationDelay: '0.6s'}}>
                  <label className="field-label">
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Please describe your query in detail..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows="6"
                    className={`form-textarea ${focusedField === 'message' ? 'focused' : ''}`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitted}
                  className={`submit-btn ${submitted ? 'success' : ''}`}
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-6 h-6 animate-bounce" />
                      <span>Query Submitted!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Response Time Info */}
                <div className="info-box">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span><strong>Average Response Time:</strong> Within 2-4 hours during business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-column">
          <h3 className="contact-title fade-in" style={{animationDelay: '0.2s'}}>
            <Phone className="w-6 h-6 text-purple-600" />
            Contact Information
          </h3>

          <div className="contact-cards">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={index} className="contact-card fade-in" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
                  <div className={`contact-content ${contact.bg}`}>
                    <div className="contact-header">
                      <div className={`contact-icon ${contact.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="contact-details">
                        <h4 className="contact-card-title">{contact.title}</h4>
                        <p className="contact-main">{contact.details}</p>
                        <p className="contact-sub">{contact.subtext}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Working Hours Card */}
          <div className="hours-card fade-in" style={{animationDelay: '0.7s'}}>
            <div className="hours-header">
              <Clock className="w-6 h-6" />
              <h4 className="hours-title">Working Hours</h4>
            </div>
            <div className="hours-list">
              <div className="hours-row">
                <span>Monday - Friday:</span>
                <span className="hours-time">9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Saturday:</span>
                <span className="hours-time">10:00 AM - 4:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Sunday:</span>
                <span className="hours-time">Closed</span>
              </div>
            </div>
          </div>

          {/* Emergency Support */}
          <div className="emergency-card fade-in" style={{animationDelay: '0.8s'}}>
            <div className="emergency-header">
              <Headphones className="w-5 h-5 text-red-600" />
              <h4 className="emergency-title">Emergency Support</h4>
            </div>
            <p className="emergency-text">For urgent issues, call our 24/7 emergency line:</p>
            <p className="emergency-number">+91 9567194946</p>
          </div>
        </div>
      </div>

      <style>{`
        . mt-5 {
          max-width: 88rem;
          margin: 0 auto;
        }

        /* Header */
        .settings-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .header-icon-wrapper {
          position: relative;
        }

        .header-icon-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 0.75rem;
          filter: blur(8px);
          opacity: 0.5;
        }

        .header-icon {
          position: relative;
          padding: 0.75rem;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settings-title {
          font-size: 1.875rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .settings-subtitle {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0.25rem 0 0 0;
        }

        /* Quick Links */
        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .quick-link-btn {
          padding: 1rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quick-link-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .link-icon {
          width: 1.5rem;
          height: 1.5rem;
          margin: 0 auto 0.5rem;
          transition: transform 0.3s ease;
        }

        .quick-link-btn:hover .link-icon {
          transform: scale(1.1);
        }

        .link-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .content-grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        /* Card */
        .settings-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(226, 232, 240, 0.5);
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          padding: 1.5rem 2rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-icon-small {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 0.75rem;
        }

        .header-icon-small {
          color: white;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .card-subtitle {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0.25rem 0 0 0;
        }

        .card-content {
          padding: 2rem;
        }

        .form-sections {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 1rem;
          color: #1e293b;
          transition: all 0.3s ease;
        }

        .form-textarea {
          resize: none;
        }

        .form-input:hover,
        .form-textarea:hover {
          border-color: #cbd5e1;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          background: white;
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .form-input.focused,
        .form-textarea.focused {
          background: white;
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .submit-btn {
          width: 100%;
          padding: 1.25rem 2rem;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        .submit-btn.success {
          background: #10b981;
        }

        .info-box {
          padding: 1rem;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border: 2px solid #93c5fd;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: #1e3a8a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Contact Column */
        .contact-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .contact-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-card {
          background: white;
          border-radius: 1rem;
          border: 2px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .contact-content {
          padding: 0.91rem;
        }

        .contact-header {
          display: flex;
          align-items: start;
          gap: 1rem;
        }

        .contact-icon {
          padding: 0.75rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .contact-icon.from-blue-500 {
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
        }

        .contact-icon.from-green-500 {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .contact-icon.from-purple-500 {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
        }

        .contact-icon.from-orange-500 {
          background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        }

        .contact-details {
          flex: 1;
        }

        .contact-card-title {
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .contact-main {
          font-weight: 600;
          color: #1e293b;
          margin: 0.25rem 0;
        }

        .contact-sub {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0.25rem 0 0 0;
        }

        /* Hours Card */
        .hours-card {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 1rem;
          color: white;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .hours-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .hours-title {
          font-weight: 700;
          font-size: 1.125rem;
          margin: 0;
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .hours-time {
          font-weight: 600;
        }

        /* Emergency Card */
        .emergency-card {
          margin-top: 1rem;
          padding: 1.5rem;
          background: #fef2f2;
          border: 2px solid #fecaca;
          border-radius: 1rem;
        }

        .emergency-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .emergency-title {
          font-weight: 700;
          color: #7f1d1d;
          margin: 0;
        }

        .emergency-text {
          font-size: 0.875rem;
          color: #991b1b;
          margin: 0 0 0.5rem 0;
        }

        .emergency-number {
          font-size: 1.125rem;
          font-weight: 700;
          color: #7f1d1d;
          margin: 0;
        }

        /* Animations */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .slide-right {
          animation: slide-right 0.5s ease-out backwards;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .settings-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .quick-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .card-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HelpSettings;