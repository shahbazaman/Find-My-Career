import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyProfile = () => {
  const token = localStorage.getItem("token");

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/companies/me/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setCompany(res.data);
      } catch (err) {
        console.error("FETCH COMPANY ERROR:", err);
        setError(
          err?.response?.data?.message || "Company profile not found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [token]);

  if (loading) return <p>Loading company profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!company) return <p>No company profile available.</p>;

  return (
    <div>
      <h2>{company.name}</h2>

      {company.description && (
        <p>{company.description}</p>
      )}

      <ul>
        <li><b>Industry:</b> {company.industry || "N/A"}</li>
        <li><b>Headquarters:</b> {company.headquarters || "N/A"}</li>
        <li><b>Company Size:</b> {company.companySize || "N/A"}</li>
        <li><b>Founded:</b> {company.foundedYear || "N/A"}</li>
        <li><b>Hiring:</b> {company.isHiring ? "Yes" : "No"}</li>
        {company.website && (
          <li>
            <b>Website:</b>{" "}
            <a href={company.website} target="_blank" rel="noreferrer">
              {company.website}
            </a>
          </li>
        )}
      </ul>

      {company.logo && (
        <img
          src={company.logo}
          alt="Company Logo"
          style={{ maxWidth: 120, marginTop: 12 }}
        />
      )}
    </div>
  );
};

export default CompanyProfile;
