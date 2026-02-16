import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaUserCircle, 
  FaEnvelope, 
  FaUserTag, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaLink 
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/users/${id}`,
          {
            headers: {
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`
}
          }
        );
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Fetching user profile...</p>
    </div>
  );

  if (!user) return <div className="error-state">User not found</div>;

  return (
    <div className="view-container">
      <style>{`
        .view-container {
          padding: 20px;
          max-width: 800px;
          margin: 40px auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .profile-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          overflow: hidden;
          animation: fadeIn 0.5s ease;
        }

        .card-header {
          background: #f8fafc;
          padding: 20px 30px;
          border-bottom: 1px solid #edf2f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6366f1;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s;
        }

        .back-link:hover { transform: translateX(-5px); }

        .profile-body {
          padding: 30px;
        }

        .user-intro {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .profile-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #6366f1;
        }

        .default-avatar {
          font-size: 80px;
          color: #cbd5e0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .info-item {
          padding: 15px;
          background: #fdfdfd;
          border: 1px solid #f1f5f9;
          border-radius: 8px;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }

        .info-value {
          font-weight: 600;
          color: #2d3748;
          font-size: 1.05rem;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          text-transform: capitalize;
        }

        .status-approved { background: #def7ec; color: #03543f; }
        .status-pending { background: #fef3c7; color: #92400e; }

        /* Responsiveness */
        @media (max-width: 768px) {
          .info-grid { grid-template-columns: 1fr; }
          .view-container { margin: 10px; padding: 10px; }
          .user-intro { flex-direction: column; text-align: center; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loader-container { text-align: center; padding: 50px; }
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          width: 40px; height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 15px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      <div className="profile-card">
        <div className="card-header">
          <div className="back-link" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Return to Dashboard
          </div>
          <h3 style={{ margin: 0, color: "#4a5568" }}>User Profile</h3>
        </div>

        <div className="profile-body">
          <div className="user-intro">
            {user.logo ? (
              <img src={user.logo} alt="Profile" className="profile-img" />
            ) : (
              <FaUserCircle className="default-avatar" />
            )}
            <div>
              <h2 style={{ margin: 0, color: "#1a202c" }}>{user.firstName} {user.lastName}</h2>
              <span className={`status-badge status-${user.approvalStatus}`}>
                {user.approvalStatus}
              </span>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <div className="info-label"><FaEnvelope /> Email Address</div>
              <div className="info-value">{user.email}</div>
            </div>

            <div className="info-item">
              <div className="info-label"><FaUserTag /> Role</div>
              <div className="info-value">{user.role}</div>
            </div>

            <div className="info-item">
              <div className="info-label"><FaShieldAlt /> Auth Provider</div>
              <div className="info-value">{user.provider}</div>
            </div>

            <div className="info-item">
              <div className="info-label"><FaCalendarAlt /> Joined Date</div>
              <div className="info-value">
                {new Date(user.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            {user.role === "recruiters" && (
                <div className="info-item" style={{ gridColumn: "span 2" }}>
                    <div className="info-label"><FaLink /> Logo URL / Asset</div>
                    <div className="info-value" style={{ fontSize: '0.85rem', wordBreak: 'break-all', color: '#6366f1' }}>
                        {user.logo || "No logo uploaded"}
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewUser;