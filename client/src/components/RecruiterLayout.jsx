import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RecruiterLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      {/* recruiter header / navbar can go here */}

      <Outlet />
    </div>
  );
};

export default RecruiterLayout;
