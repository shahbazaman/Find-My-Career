import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`)
      .then(res => setJob(res.data))
      .catch(err => console.error(err));
  }, [jobId]);

  const handleApply = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return navigate("/login");

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}/apply`, { userId })
      .then(() => toast.success("Applied successfully", { position: "top-center" }))
      .catch(() => toast.error("Failed to apply", { position: "top-center" }));
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div style={styles.wrapper}>
      <h1>{job.title}</h1>
      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Description:</b></p>
      <p>{job.description}</p>

      <button style={styles.btn} onClick={handleApply}>
        Apply Now
      </button>
      <ToastContainer />
    </div>
  );
};

const styles = {
  wrapper: { padding: "2rem", maxWidth: "800px", margin: "auto" },
  btn: { padding: "12px 20px", background: "#764ba2", color: "#fff", border: "none" }
};

export default JobDetails;
