import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ApplicantProfile() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [app, setApp] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/applications/${id}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setApp(res.data))
      .catch(err => console.error(err));
  }, [id, token]);

  if (!app) return <p>Loading profile...</p>;

  const { user, status } = app;
  const profile = user.profile || {};

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2>{user.firstName} {user.lastName}</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Status:</b> {status}</p>

      <hr />

      <h4>Skills</h4>
      <p>{profile.skills || "—"}</p>

      <h4>Experience</h4>
      <p>{profile.experience || "—"}</p>

      <h4>Education</h4>
      <p>{profile.education || "—"}</p>

      {profile.resumeUrl && (
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="pdf-btn">View Resume</button>
        </a>
      )}
      <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Interview notes..."
            />

            <button onClick={saveNotes}>Save Notes</button>

    </div>
  );
}
