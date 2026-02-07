import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaEdit,
  FaCamera,
  FaShieldAlt,
  FaBell,
  FaLock,
  FaGlobe,
  FaTrash
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountSettings = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
const loginMethodLabel =
  storedUser?.provider === "google" ? "Google Login" : "Email Login";
const [savingField, setSavingField] = useState(null);
// values: "name" | "contact" | null
const navigate = useNavigate();
const loginMethodColor =
  storedUser?.provider === "google" ? "#16a34a" : "#2563eb";

  const isGoogleUser =
    storedUser?.provider === "google" &&
    storedUser?.hasLocalPassword === false;

  const shouldShowPasswordAction =
  storedUser?.provider !== "google" ||
  storedUser?.hasLocalPassword === false;
const [resetEmail, setResetEmail] = useState("");

  const [profile, setProfile] = useState({
    avatar: "",
    name: "",
    email: "",
    location: "",
    phone: "",
    joined: ""
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [sending, setSending] = useState(false);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = storedUser?.id || storedUser?._id;
        if (!userId) return;

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`);
        const data = await res.json();

        setProfile({
  avatar: data.photoUrl || "",
  name: data.name || "",
  email: data.email || "",
  location: data.location || "",
  phone: data.mobile || "",
  joined: data.createdAt
    ? new Date(data.createdAt).toLocaleString("en-US", {
        month: "long",
        year: "numeric"
      })
    : ""
});
        setResetEmail(data.email || "");
      } catch (err) {
        console.error("Profile load failed", err);
      }
    };

    fetchProfile();
  }, []);

  /* ================= AVATAR CHANGE (UI ONLY) ================= */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, avatar: URL.createObjectURL(file) });
    }
  };
const confirmDeleteWithToast = (onConfirm) => {
  toast.warn(
    <div>
      <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
        This will permanently delete your account.
      </p>
      <p style={{ fontSize: "0.85rem", marginBottom: "0.75rem" }}>
        This action cannot be undone.
      </p>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          style={{
            background: "#dc2626",
            color: "white",
            padding: "0.3rem 0.75rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Delete
        </button>

        <button
          onClick={() => toast.dismiss()}
          style={{
            background: "#e5e7eb",
            color: "#111827",
            padding: "0.3rem 0.75rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false
    }
  );
};

const handleDeleteAccount = async () => {
  confirmDeleteWithToast(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status !== 200) {
        const err = await res.json();
        throw new Error(err.message);
      }

      localStorage.clear();
      window.location.href = "/login";
    } catch {
      toast.error("Failed to delete account");
    }
  });
};

  /* ================= PASSWORD HANDLER ================= */
const handlePasswordAction = async () => {
  try {
    setSending(true);

    // 🟢 GOOGLE USER → SET PASSWORD
    if (isGoogleUser) {
      if (!newPassword || newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/set-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ password: newPassword })
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to set password");
        return;
      }

      toast.success("Password set successfully. You can now login using email.");
      setShowPasswordModal(false);
      return;
    }

    // 🔵 EMAIL USER → AUTO SEND RESET LINK
const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/password-reset`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: profile.email })
  }
);
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Failed to send reset email");
      return;
    }

    toast.success("Password reset link sent to your email");
    setShowPasswordModal(false);
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  } finally {
    setSending(false);
  }
};

const quickActions = [
  ...(shouldShowPasswordAction
    ? [
        {
          icon: FaLock,
          label: isGoogleUser ? "Set Password" : "Change Password",
          color: "from-blue-500 to-cyan-500",
          onClick: () => setShowPasswordModal(true),
        },
      ]
    : []),
  {
    icon: FaShieldAlt,
    label: "Privacy Settings",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FaBell,
    label: "Notifications",
    color: "from-green-500 to-emerald-500",
    onClick: () => navigate("/notification"),
  },
  {
    icon: FaGlobe,
    label: "Language",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: FaTrash,
    label: "Delete Account",
    color: "from-orange-500 to-red-500",
    onClick: handleDeleteAccount,
  },
];

let debounceTimer;

const saveNameToBackend = async () => {
  const [firstName, ...rest] = profile.name.trim().split(" ");
  const lastName = rest.join(" ");

  // ❌ Do nothing if unchanged
  if (
    firstName === storedUser?.firstName &&
    lastName === storedUser?.lastName
  ) {
    return;
  }

  try {
    setSavingField("name");

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/update-name`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ firstName, lastName })
    });

    if (!res.ok) throw new Error();

    localStorage.setItem(
      "user",
      JSON.stringify({ ...storedUser, firstName, lastName })
    );

    toast.success("Name updated");
  } catch {
    toast.error("Failed to update name");
  } finally {
    setSavingField(null);
  }
};


const debouncedSaveName = () => {
  setIsEditingName(false);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(saveNameToBackend, 600);
};

  return (
    <div className="account-container">
          <ToastContainer position="top-center" />
<div className="settings-header fade-in">
  <div className="header-icon-wrapper">
    <div className="header-icon-glow"></div>
    <div className="header-icon">
      <FaUser className="w-6 h-6" />
    </div>
  </div>
  <div>
    <h2 className="settings-title">Account Settings</h2>
    <p className="settings-subtitle">
      Manage your profile and account preferences
    </p>
  </div>
</div>

{/* ================= MAIN CARD ================= */}
<div className="settings-card fade-in-up">
  {/* ================= PROFILE SECTION ================= */}
  <div className="profile-section">
    <div className="profile-header">
      <div className="avatar-name-group">
        <div className="avatar-wrapper">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="User Avatar"
              className="avatar-img"
            />
          ) : (
            <div className="avatar-placeholder">
              <FaUser className="avatar-icon" />
            </div>
          )}

          <label
              className="avatar-upload-btn"
              title="Avatar upload coming soon"
              style={{ cursor: "not-allowed", opacity: 0.6 }}
              onClick={(e) => e.preventDefault()}
            >
              <FaCamera className="w-4 h-4" />
            </label>

        </div>

        <div className="profile-info">
          <div className="name-section">
            {isEditingName ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              onBlur={debouncedSaveName}
                autoFocus
                className="name-input"
              />
            ) : (
              <h3 className="profile-name">
  {profile.name}
  {savingField === "name" && (
    <span style={{ fontSize: "0.75rem", marginLeft: "0.5rem", color: "#64748b" }}>
      Saving...
    </span>
  )}
</h3>

            )}

            <button
              onClick={() => setIsEditingName(true)}
              className="edit-name-btn"
            >
              <FaEdit className="w-4 h-4" />
            </button>
          </div>

          <p className="profile-joined">
            {profile.joined && `Member since ${profile.joined}`}
          </p>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-icon-wrapper email">
            <FaEnvelope className="contact-icon" />
          </div>
          <div className="contact-details">
            <span className="contact-label">Email</span>
            <span className="contact-value">{profile.email}</span>
            <div style={{ marginTop: "0.25rem" }}>
  <span
    style={{
      fontSize: "0.7rem",
      padding: "0.2rem 0.5rem",
      borderRadius: "999px",
      background: loginMethodColor,
      color: "white",
      fontWeight: 600
    }}
  >
    {loginMethodLabel}
  </span>
</div>

          </div>
        </div>

        <div className="contact-card">
          <div className="contact-icon-wrapper location">
            <FaMapMarkerAlt className="contact-icon" />
          </div>
          <div className="contact-details">
            <span className="contact-label">Location</span>
            <input
  className="contact-value border-0"
  value={profile.location}
  placeholder="Add location"
  onChange={(e) =>
    setProfile({ ...profile, location: e.target.value })
  }
  onBlur={async () => {
  // ❌ skip if unchanged
  if (
    profile.phone === storedUser?.phone &&
    profile.location === storedUser?.location
  ) {
    return;
  }

  try {
    setSavingField("contact");

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/update-contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        phone: profile.phone,
        location: profile.location
      })
    });

    toast.success("Contact updated");
  } catch {
    toast.error("Failed to update contact");
  } finally {
    setSavingField(null);
  }
}}

/>
{savingField === "contact" && (
  <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
    Saving...
  </span>
)}
          </div>
        </div>

        <div className="contact-card">
          <div className="contact-icon-wrapper phone">
            <FaPhone className="contact-icon" />
          </div>
          <div className="contact-details">
            <span className="contact-label">Phone</span>
            <input
  className="contact-value border-0"
  value={profile.phone}
  placeholder="Add phone"
  onChange={(e) =>
    setProfile({ ...profile, phone: e.target.value })
  }
  onBlur={async () => {
  // ❌ skip if unchanged
  if (
    profile.phone === storedUser?.phone &&
    profile.location === storedUser?.location
  ) {
    return;
  }

  try {
    setSavingField("contact");

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/update-contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        phone: profile.phone,
        location: profile.location
      })
    });

    toast.success("Contact updated");
  } catch {
    toast.error("Failed to update contact");
  } finally {
    setSavingField(null);
  }
}}

/>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* ================= QUICK ACTIONS ================= */}
  <div className="actions-section">
    <h3 className="section-title">Quick Actions</h3>
    <div className="actions-grid fade-in" style={{ animationDelay: "0.4s" }}>
      {quickActions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            className="action-btn"
            onClick={action.onClick}
          >
            <div className={`action-icon-bg ${action.color}`}>
              <Icon className="action-icon" />
            </div>
            <span className="action-label">{action.label}</span>
          </button>
        );
      })}
    </div>
  </div>
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
              {isGoogleUser ? "Set Password" : "Change Password"}
            </h3>

            {isGoogleUser ? (
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 6 chars)"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                  marginTop: "1rem"
                }}
              />
            ) : (
              <div>{!isGoogleUser && (
  <p
    style={{
      marginTop: "1rem",
      marginBottom: "1rem",
      fontSize: "0.95rem",
      color: "#334155"
    }}
  >
    Are you sure you want to change your password?
    <br />
    A password reset link will be sent to:
    <br />
    <strong>{profile.email}</strong>
  </p>
)}
</div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button onClick={() => setShowPasswordModal(false)} className="btn-danger btn1">Cancel</button>
              <button onClick={handlePasswordAction} disabled={sending} className="btn-success btn1">
                {sending
                  ? "Processing..."
                  : isGoogleUser
                  ? "Set Password"
                  : "Sure"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔵 YOUR ORIGINAL STYLE BLOCK IS PRESERVED BELOW */}
       <style>{`
        .account-container {
          max-width: 88rem;
          margin: 0 auto;
          padding: 1rem;
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

        /* Main Card */
        .settings-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(226, 232, 240, 0.5);
          overflow: hidden;
        }

        /* Profile Section */
        .profile-section {
          padding: 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
          border-bottom: 1px solid #e2e8f0;
        }

        .profile-header {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .profile-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }

        .avatar-name-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .avatar-name-group {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        .avatar-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .avatar-icon {
          width: 3rem;
          height: 3rem;
          color: #64748b;
        }

        .avatar-upload-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          padding: 0.75rem;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
          color: white;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-upload-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
        }

        .profile-info {
          flex: 1;
          text-align: center;
        }

        @media (min-width: 640px) {
          .profile-info {
            text-align: left;
          }
        }

        .name-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 640px) {
          .name-section {
            justify-content: flex-start;
          }
        }

        .profile-name {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .name-input {
          padding: 0.5rem 1rem;
          border: 2px solid #3b82f6;
          border-radius: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          background: white;
          min-width: 200px;
        }

        .name-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .edit-name-btn {
          padding: 0.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
        }

        .edit-name-btn:hover {
          transform: scale(1.1);
        }

        .profile-joined {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        /* Contact Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          max-width: 520px;
          width: 100%;
        }

        @media (min-width: 640px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 1rem;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .contact-icon-wrapper {
          padding: 0.75rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-icon-wrapper.email {
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
        }

        .contact-icon-wrapper.location {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
        }

        .contact-icon-wrapper.phone {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .contact-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #fff;
        }

        .contact-details {
          flex: 1;
          min-width: 0;
        }

        .contact-label {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 0.125rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .contact-value {
          display: block;
          font-size: 0.875rem;
          color: #1e293b;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Actions Section */
        .actions-section {
          padding: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-title::before {
          content: '';
          width: 4px;
          height: 1.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 2px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .actions-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
          .btn1 {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          padding: 0.01rem 0.51rem;
          border: 2px solid #f1f1f1;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn1:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }
        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem 1rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .action-icon-bg {
          padding: 1rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-icon-bg.from-blue-500 {
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
        }

        .action-icon-bg.from-purple-500 {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
        }

        .action-icon-bg.from-green-500 {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .action-icon-bg.from-orange-500 {
          background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        }

        .action-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: white;
        }

        .action-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
          text-align: center;
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

        .fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .settings-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .profile-section {
            padding: 1.5rem;
          }

          .actions-section {
            padding: 1.5rem;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
 
    </div>
  );
};

export default AccountSettings;