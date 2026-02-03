import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("${import.meta.env.VITE_API_BASE_URL}/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.skills?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Find Jobs</h1>

      <input
        type="text"
        placeholder="Search by role or skill..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.grid}>
        {filteredJobs.map(job => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Location:</b> {job.location}</p>
            <button
              style={styles.btn}
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: { padding: "2rem", minHeight: "100vh", background: "#f4f6fb" },
  heading: { textAlign: "center", marginBottom: "1rem" },
  search: { width: "100%", padding: "12px", marginBottom: "20px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" },
  card: { background: "#fff", padding: "20px", borderRadius: "10px" },
  btn: { marginTop: "10px", padding: "10px", background: "#667eea", color: "#fff", border: "none" }
};

export default JobList;
