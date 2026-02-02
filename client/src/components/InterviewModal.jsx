import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const InterviewModal = ({ isOpen, onClose, onSave, selectedApplicants }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const companyName = `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();

  const [form, setForm] = useState({
    date: "",
    time: "",
    mode: "Online",
    location: "",
    notes: ""
  });

  useEffect(() => {
    if (!isOpen) {
      setForm({
        date: "",
        time: "",
        mode: "Online",
        location: "",
        notes: ""
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const jobTitle = selectedApplicants[0]?.jobTitle || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.date || !form.time || !form.location) {
      alert("Please fill required fields");
      return;
    }

    onSave({
      ...form,
      companyName,
      jobTitle,
      applicationIds: selectedApplicants.map(a => a._id)
    });
  };

  return (
    <div className="resume-modal-backdrop">
      <div className="resume-modal">
        <button className="modal-close-btn" onClick={onClose}>
          <FiX />
        </button>

        <h3>Schedule Interview</h3>

        <label>Company</label>
        <input disabled value={companyName} />

        <label>Job Role</label>
        <input disabled value={jobTitle} />

        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} />

        <label>Time</label>
        <input type="time" name="time" value={form.time} onChange={handleChange} />

        <label>Mode</label>
        <select name="mode" value={form.mode} onChange={handleChange}>
          <option>Online</option>
          <option>In-person</option>
        </select>

        <label>{form.mode === "Online" ? "Meet Link" : "Location"}</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <label>Notes</label>
        <textarea
          rows={3}
          name="notes"
          value={form.notes}
          onChange={handleChange}
        />

        <div style={{ display:"flex", justifyContent:"flex-end", gap:"0.5rem" }}>
          <button className="btn delete" onClick={onClose}>Cancel</button>
          <button className="btn view" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default InterviewModal;
