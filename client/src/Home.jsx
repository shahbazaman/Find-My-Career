import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import Footer from "./Footer";
import RecrutersPages from "./RecrutersPages";
import JobSeekersPages from "./JobSeekersPages";
import Page1 from "./Page1";
import axios from "axios";
import { getUser } from "./utils/auth";

const Home = () => {
  const [role, setRole] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);


useEffect(() => {
  const user = getUser();

  if (!user) {
    setIsLoggedIn(false);
    return;
  }

  setIsLoggedIn(true);

  if (user.role) {
    setRole(user.role);
    return;
  }

  const fetchRole = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = user.id || user._id;

      const res = await axios.get(
        `http://localhost:5000/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedUser = {
        ...user,
        role: res.data.user.role,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setRole(updatedUser.role);
    } catch (err) {
      console.error("Failed to fetch role", err);
    }
  };

  fetchRole();
}, []);


  return (
    <div>
      <LandingPage />
      <div id="company-section">
        <Page1 />
      </div>

      {/* ✅ ROLE BASED RENDERING */}
      {isLoggedIn && role === "recruiters" && <RecrutersPages />}
{isLoggedIn && role === "job seekers" && <JobSeekersPages />}


      <Footer />
    </div>
  );
};

export default Home;
