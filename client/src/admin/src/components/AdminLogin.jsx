  import React, { useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { 
    FiMail, 
    FiLock, 
    FiEye, 
    FiEyeOff, 
    FiShield,
    FiArrowRight,
    FiCheck
  } from "react-icons/fi";
  import "./AdminLogin.css";
  import { useNavigate } from "react-router-dom";

  const AdminLogin = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validation
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();

        if (response.ok) {
          // Success notification
          toast.success(`Welcome back, ${data.user.firstName || 'Admin'}!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: <FiCheck />,
          });

          // Store token
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminUser", JSON.stringify(data.user));

          // Redirect after a short delay
          setTimeout(() => {
            navigate("/admin/home");
          }, 2000);
        } else {
          // Error notification
          toast.error(data.message || "Login failed. Please try again.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        toast.error("Server error. Please try again later.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="admin-login-container">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
        <div className="login-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="shield-icon">
              <FiShield />
            </div>
            <h1 className="login-title">Admin Portal</h1>
            <p className="login-subtitle">Secure access for authorized personnel</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className={`input-group ${focusedField === 'email' ? 'focused' : ''}`}>
              <div className="input-wrapper">
                <div className="input-icon">
                  <FiMail />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email address"
                  className="input-field"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className={`input-group ${focusedField === 'password' ? 'focused' : ''}`}>
              <div className="input-wrapper">
                <div className="input-icon">
                  <FiLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="input-field"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="arrow-icon" />
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="footer-text">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default AdminLogin;