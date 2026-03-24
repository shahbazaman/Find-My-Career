import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

/* ================= CUSTOM DATE PICKER ================= */
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function CustomDatePicker({ value, onChange, name }) {
  const parsed = value ? value.split("-") : ["", "", ""];
  const [year,  setYear]  = useState(parsed[0] || "");
  const [month, setMonth] = useState(parsed[1] ? parseInt(parsed[1], 10) : "");
  const [day,   setDay]   = useState(parsed[2] ? parseInt(parsed[2], 10) : "");

  useEffect(() => {
    if (value) {
      const parts = value.split("-");
      setYear(parts[0] || "");
      setMonth(parts[1] ? parseInt(parts[1], 10) : "");
      setDay(parts[2]   ? parseInt(parts[2], 10) : "");
    } else {
      setYear(""); setMonth(""); setDay("");
    }
  }, [value]);

  const daysInMonth = (m, y) => (!m || !y) ? 31 : new Date(y, m, 0).getDate();
  const maxDay      = daysInMonth(month, year);
  const dayOptions  = Array.from({ length: maxDay }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
  { length: 30 },
  (_, i) => currentYear - i
);

  const fireChange = (y, m, d) => {
    if (y && m && d) {
      onChange({
        target: {
          name,
          value: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
        }
      });
    } else {
      onChange({ target: { name, value: "" } });
    }
  };

  const handleMonth = (e) => {
    const m = e.target.value ? parseInt(e.target.value, 10) : "";
    setMonth(m);
    const maxD       = daysInMonth(m, year);
    const clampedDay = day > maxD ? maxD : day;
    if (day > maxD) setDay(maxD);
    fireChange(year, m, clampedDay);
  };

  const handleDay = (e) => {
    const d = e.target.value ? parseInt(e.target.value, 10) : "";
    setDay(d);
    fireChange(year, month, d);
  };

  const handleYear = (e) => {
    const y = e.target.value;
    setYear(y);
    fireChange(y, month, day);
  };

  const sel = {
    padding: "7px 10px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "14px",
    background: "white",
    cursor: "pointer",
    color: "#333",
    flex: 1,
    minWidth: 0
  };

  const inputStyle = {
    padding: "7px 10px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "14px",
    background: "white",
    color: "#333",
    outline: "none"
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>

      {/* Month — dropdown (only 12 items, fine as-is) */}
      <select
        value={month}
        onChange={handleMonth}
        style={{ ...inputStyle, flex: 1, minWidth: "110px", cursor: "pointer" }}
      >
        <option value="">Month</option>
        {MONTHS.map((m, i) => (
          <option key={m} value={i + 1}>{m}</option>
        ))}
      </select>

      {/* Day — number input instead of 31-item dropdown */}
      <input
        type="number"
        min="1"
        max={maxDay}
        placeholder="DD"
        value={day}
        onChange={(e) => {
          const d = e.target.value ? parseInt(e.target.value, 10) : "";
          if (d === "" || (d >= 1 && d <= maxDay)) {
            setDay(d);
            fireChange(year, month, d);
          }
        }}
        style={{ ...inputStyle, width: "70px", textAlign: "center" }}
      />

      {/* Year — number input instead of 85-item dropdown */}
      <input
        type="number"
        min="1940"
        max={new Date().getFullYear()}
        placeholder="YYYY"
        value={year}
        onChange={(e) => {
          const y = e.target.value;
          setYear(y);
          if (y.length === 4) fireChange(y, month, day);
        }}
        style={{ ...inputStyle, width: "90px", textAlign: "center" }}
      />

    </div>
  );
}

/* ================= INTERVIEW MODAL ================= */
const InterviewModal = ({ isOpen, onClose, onSave, selectedApplicants }) => {
  const storedUser  = JSON.parse(localStorage.getItem("user")) || {};
  const companyName = `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();

  const [form, setForm] = useState({
    date:     "",
    time:     "",
    mode:     "Online",
    location: "",
    notes:    ""
  });

  useEffect(() => {
    if (!isOpen) {
      setForm({
        date:     "",
        time:     "",
        mode:     "Online",
        location: "",
        notes:    ""
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
      toast.warning("Please fill required fields", { position: "top-center" });
      return;
    }

    onSave({
      ...form,
      companyName,
      jobTitle,
      applicationIds: selectedApplicants.map((a) => a._id)
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
        <CustomDatePicker name="date" value={form.date} onChange={handleChange} />

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

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
          <button className="btn delete" onClick={onClose}>Cancel</button>
          <button className="btn view" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default InterviewModal;