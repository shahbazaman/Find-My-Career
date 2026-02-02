import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FaUserEdit, 
  FaSave, 
  FaArrowLeft, 
  FaEnvelope, 
  FaUser, 
  FaImage, 
  FaCheckCircle 
} from "react-icons/fa";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get(
      `http://localhost:5000/api/admin/users/${id}`,
      {
        headers: {
          "x-admin-key": import.meta.env.VITE_ADMIN_SECRET
        }
      }
    )
    .then(res => setFormData(res.data))
    .catch(() => toast.error("Failed to fetch user data"));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}`,
        formData,
        {
          headers: {
            "x-admin-key": import.meta.env.VITE_ADMIN_SECRET
          }
        }
      );
      toast.success("User updated successfully!");
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      toast.error("Error updating user details");
    } finally {
      setSaving(false);
    }
  };

  if (!formData) return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading User Data...</p>
    </div>
  );

  return (
    <div className="container">
      <style>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          font-family: 'Inter', -apple-system, sans-serif;
          background: #f4f7fe;
        }

        .edit-card {
          background: #ffffff;
          width: 100%;
          max-width: 550px;
          padding: 35px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .header-section {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .back-btn {
          background: #f1f5f9;
          border: none;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          color: #475569;
          transition: 0.2s;
        }

        .back-btn:hover { background: #e2e8f0; }

        .form-group {
          margin-bottom: 20px;
        }

        /* Label and Icon Styling */
        label {
          display: flex;
          align-items: center;
          gap: 8px; /* Gap between icon and text */
          font-weight: 600;
          margin-bottom: 8px;
          color: #334155;
          font-size: 0.9rem;
        }

        .label-icon {
          color: #6366f1;
          font-size: 0.85rem;
        }

        input, select {
          width: 100%;
          padding: 12px 15px; /* Clean padding without absolute icons */
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.95rem;
          box-sizing: border-box;
          outline: none;
          color: #1e293b;
          transition: all 0.2s ease;
        }

        input:focus, select:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
          transition: opacity 0.2s;
        }

        .btn-primary:hover { background: #4338ca; }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Loader */
        .loader-container { text-align: center; padding: 50px; }
        .loader { 
          border: 3px solid #f3f3f3; border-top: 3px solid #4f46e5; 
          border-radius: 50%; width: 30px; height: 30px; 
          animation: spin 1s linear infinite; margin: 0 auto 10px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Responsive Breakpoints */
        @media (max-width: 600px) {
          .edit-card { padding: 20px; border-radius: 8px; }
          .container { padding: 10px; }
        }
      `}</style>

      <div className="edit-card">
        <div className="header-section">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.25rem" }}>
            Edit User Profile
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaUser className="label-icon" /> First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. John"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaUser className="label-icon" /> Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope className="label-icon" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaCheckCircle className="label-icon" /> Account Status
            </label>
            <select
              name="approvalStatus"
              value={formData.approvalStatus}
              onChange={handleChange}
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {formData.role === "recruiters" && (
            <div className="form-group">
              <label>
                <FaImage className="label-icon" /> Company Logo URL
              </label>
              <input
                type="text"
                name="logo"
                value={formData.logo || ""}
                onChange={handleChange}
                placeholder="https://link-to-image.com/logo.png"
              />
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={saving}>
            <FaSave /> {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default EditUser;