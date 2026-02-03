import React, { useEffect, useState } from "react";
import "./css/NavigationBar.css";
import logo from "./assets/logo1.png";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { getUser, logout } from "./utils/auth";
import { IoIosNotifications } from "react-icons/io";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(getUser());
  const [anchorEl, setAnchorEl] = useState(null);
  const [imgError, setImgError] = useState(false); // ✅ NEW

  // 🔁 Re-read user on route change (login / logout fix)
  useEffect(() => {
    setUser(getUser());
    setImgError(false); // reset image error on user change
  }, [location.pathname]);

  const role = user?.role;

  const userLogo =
    user?.logo &&
    typeof user.logo === "string" &&
    user.logo.trim() !== "" &&
    !imgError
      ? user.logo
      : null;

  const handleLogout = () => {
    setAnchorEl(null);
    Swal.fire({
      title: "Logout confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      confirmButtonColor: "#f40076",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: "success",
          title: "Logged out",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderUserAvatar = () =>
    userLogo ? (
      <img
        src={userLogo}
        alt="user"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #eee",
        }}
        onError={() => setImgError(true)} // ✅ SAFE FALLBACK
      />
    ) : (
      <FaUser
        style={{
          width: "40px",
          height: "26px",
          color: "#2c2b2b",
        }}
      />
    );

  return (
    <div className="navigation-wrapper">
      <Navbar
        expand="lg"
        className="px-lg-5 px-3 py-3 sticky-top shadow-sm bg-white"
        collapseOnSelect
      >
        {/* BRAND LOGO */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} alt="logo" height="40" />
          <span
            className="d-none d-sm-inline-block"
            style={{ fontWeight: "bold", marginLeft: "8px", color: "#222" }}
          >
            FIND MY CAREER
          </span>
        </Navbar.Brand>

        {/* 📱 MOBILE ICONS */}
        <div className="d-flex align-items-center d-lg-none ms-auto">
          {user && (
            <Nav.Link as={Link} to="/notification" className="p-0">
              <IoIosNotifications
                className="me-3"
                style={{ fontSize: "26px", color: "#333" }}
              />
            </Nav.Link>
          )}
          <div onClick={handleMenuOpen} style={{ cursor: "pointer" }}>
            {renderUserAvatar()}
          </div>
        </div>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="ms-2 border-0 shadow-none"
        />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* CENTER LINKS */}
          <Nav className="mx-auto gap-lg-4 text-center text-lg-start mt-3 mt-lg-0">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link href="/#jobs-section" className="nav-link-custom">
              Jobs
            </Nav.Link>
            <Nav.Link href="/companies" className="nav-link-custom">
              Companies
            </Nav.Link>
            <Nav.Link href="/jobPrep">Job Prep</Nav.Link>
            <Nav.Link href="/contactUs">Contact Us</Nav.Link>
          </Nav>

          {/* 💻 DESKTOP ACTIONS */}
          <div className="d-none d-lg-flex align-items-center">
            {user && (
              <>
                <Nav.Link as={Link} to="/notification">
                  <IoIosNotifications
                    className="me-4"
                    style={{ fontSize: "28px", color: "#333" }}
                  />
                </Nav.Link>

                <Button
                  className="px-4 py-2 me-3"
                  style={{
                    background:
                      "linear-gradient(90deg, #f40076, #ff7a18)",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                  onClick={() =>
                    role === "job seekers"
                      ? navigate("/profile")
                      : navigate("/CompanyProfileForm")
                  }
                >
                  COMPLETE PROFILE
                </Button>
              </>
            )}

            <div onClick={handleMenuOpen} style={{ cursor: "pointer" }}>
              {renderUserAvatar()}
            </div>
          </div>

          {/* 📱 MOBILE ACTIONS */}
          <div className="d-lg-none mt-3 pb-3">
            {user ? (
              <Button
                className="w-100 py-2"
                style={{
                  background:
                    "linear-gradient(90deg, #f40076, #ff7a18)",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
                onClick={() =>
                  role === "job seekers"
                    ? navigate("/profile")
                    : navigate("/CompanyProfileForm")
                }
              >
                COMPLETE PROFILE
              </Button>
            ) : (
              <div className="d-flex flex-column gap-2">
                <Button
                  variant="outline-dark"
                  className="w-100"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="dark"
                  className="w-100"
                  onClick={() => navigate("/signUp")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* USER MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            marginTop: "10px",
            borderRadius: "12px",
            minWidth: "160px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        {!user ? (
          [
            <MenuItem
              key="register"
              onClick={() => {
                handleMenuClose();
                navigate("/signUp");
              }}
            >
              Register
            </MenuItem>,
            <MenuItem
              key="login"
              onClick={() => {
                handleMenuClose();
                navigate("/login");
              }}
            >
              Login
            </MenuItem>,
          ]
        ) : (
          [
            <MenuItem
              key="profile"
              onClick={() => {
                handleMenuClose();
                role === "job seekers"
                  ? navigate("/manage")
                  : navigate("/manageCompany");
              }}
            >
              Profile Management
            </MenuItem>,
            <MenuItem
              key="settings"
              onClick={() => {
                handleMenuClose();
                role === "job seekers"
                  ? navigate("/settings")
                  : navigate("/settingsCompany");
              }}
            >
              Account Settings
            </MenuItem>,
            <hr key="divider" style={{ margin: "8px 0" }} />,
            <MenuItem
              key="logout"
              onClick={handleLogout}
              style={{ color: "#dc3545", fontWeight: "bold" }}
            >
              Logout
            </MenuItem>,
          ]
        )}
      </Menu>
    </div>
  );
};

export default React.memo(NavigationBar);
