import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaCheckCircle,
  FaImage,
  FaPlus,
  FaCloudUploadAlt
} from "react-icons/fa";
import "../css/AddUserForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CLOUD_NAME = "dcfdc10zg";
const UPLOAD_PRESET = "findMyCareer";

const AddUserForm = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "job seekers",
    approvalStatus: "approved",
    logo: "",
    provider: "local"
  });


  /* ===================== HANDLE CHANGE ===================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ===================== CLOUDINARY UPLOAD ===================== */
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    setUploading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        data
      );
      setFormData((prev) => ({ ...prev, logo: res.data.secure_url }));
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ===================== SUBMIT ===================== */
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const request = axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.promise(request, {
      pending: "Creating user...",
      success: "User added successfully 🚀",
      error: {
        render({ data }) {
          return (
            data.response?.data?.message ||
            "User creation failed"
          );
        },
      },
    });

    await request;

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "job seekers",
      approvalStatus: "approved",
      logo: "",
      provider: "local",
    });

    navigate("/admin/home");

  } catch (error) {
    console.error("Create user error:", error);
  }
};

  return (
    <div className="form-container">
      <div className="page-header">
        <h1>Create New User</h1>
      </div>

      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label><FaUser /> First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label><FaUser /> Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label><FaEnvelope /> Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label><FaLock /> Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label><FaUserTag /> Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="job seekers">job seekers</option>
              <option value="recruiters">recruiters</option>
            </select>
          </div>

          <div className="form-group">
            <label><FaCheckCircle /> Approval Status</label>
            <select
              name="approvalStatus"
              value={formData.approvalStatus}
              onChange={handleChange}
            >
              <option value="approved">approved</option>
              <option value="pending">pending</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label><FaImage /> Profile Image</label>
            <div className="logo-upload-container">
              <input
                type="text"
                name="logo"
                value={formData.logo}
                placeholder="Image URL"
                onChange={handleChange}
              />
              <label className="cloudinary-button">
                {uploading ? "..." : <FaCloudUploadAlt />}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-add-user"
          disabled={uploading}
        >
          <FaPlus /> Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
