import React, { useEffect, useState, useRef } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
/* ================= CUSTOM DATE PICKER ================= */
const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

function CustomDatePicker({ value, onChange, name }) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [mode, setMode] = useState("day"); // "day" | "month" | "year"
  const ref = useRef(null);

  const selected = value ? new Date(value + "T00:00:00") : null;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setMode("day"); } };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (selected) { setViewYear(selected.getFullYear()); setViewMonth(selected.getMonth()); }
  }, [value]);

  const fire = (y, m, d) => {
    onChange({ target: { name, value: `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}` } });
    setOpen(false); setMode("day");
  };

  const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const totalDays   = daysInMonth(viewMonth, viewYear);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const isSelected = (d) => selected && selected.getFullYear()===viewYear && selected.getMonth()===viewMonth && selected.getDate()===d;
  const isToday    = (d) => { const t=new Date(); return t.getFullYear()===viewYear && t.getMonth()===viewMonth && t.getDate()===d; };

  const displayValue = selected ? `${selected.getDate()} ${MONTHS[selected.getMonth()]} ${selected.getFullYear()}` : "";

  // Year grid: show 12 years centered around viewYear
  const startYear = Math.floor(viewYear / 12) * 12;
  const yearGrid  = Array.from({ length: 12 }, (_, i) => startYear + i);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", width: "100%" }}>
      {/* Trigger */}
      <div onClick={() => { setOpen(o => !o); setMode("day"); }}
        style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"8px 12px", border:"1px solid #ced4da", borderRadius:"8px",
          background:"white", cursor:"pointer", fontSize:"14px",
          color: displayValue ? "#333" : "#aaa", userSelect:"none" }}>
        <span>{displayValue || "Select date"}</span>
        <span style={{ fontSize:"16px" }}>📅</span>
      </div>

      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, zIndex:9999,
          background:"white", border:"1px solid #e0e0e0", borderRadius:"12px",
          boxShadow:"0 8px 24px rgba(0,0,0,0.12)", padding:"16px", width:"280px" }}>

          {/* ── Header ── */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
            {/* Prev */}
            <button onClick={() => {
              if (mode==="day")  { viewMonth===0 ? (setViewMonth(11),setViewYear(y=>y-1)) : setViewMonth(m=>m-1); }
              if (mode==="month") setViewYear(y=>y-1);
              if (mode==="year")  setViewYear(y=>y-12);
            }} style={navBtn}>‹</button>

            {/* Title — clickable to switch mode */}
            <div style={{ display:"flex", gap:"6px" }}>
              <span onClick={() => setMode(m => m==="month" ? "day" : "month")}
                style={{ fontWeight:600, fontSize:"14px", color:"#4f46e5", cursor:"pointer",
                  padding:"2px 8px", borderRadius:"6px", background: mode==="month"?"#eef2ff":"transparent" }}>
                {MONTHS[viewMonth]}
              </span>
              <span onClick={() => setMode(m => m==="year" ? "day" : "year")}
                style={{ fontWeight:600, fontSize:"14px", color:"#4f46e5", cursor:"pointer",
                  padding:"2px 8px", borderRadius:"6px", background: mode==="year"?"#eef2ff":"transparent" }}>
                {mode==="year" ? `${startYear}–${startYear+11}` : viewYear}
              </span>
            </div>

            {/* Next */}
            <button onClick={() => {
              if (mode==="day")  { viewMonth===11 ? (setViewMonth(0),setViewYear(y=>y+1)) : setViewMonth(m=>m+1); }
              if (mode==="month") setViewYear(y=>y+1);
              if (mode==="year")  setViewYear(y=>y+12);
            }} style={navBtn}>›</button>
          </div>

          {/* ── MONTH PICKER ── */}
          {mode==="month" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"6px" }}>
              {MONTHS.map((m, i) => (
                <div key={m} onClick={() => { setViewMonth(i); setMode("day"); }}
                  style={{ textAlign:"center", padding:"8px 4px", borderRadius:"8px", cursor:"pointer", fontSize:"13px",
                    fontWeight: i===viewMonth ? 700 : 400,
                    background: i===viewMonth ? "#4f46e5" : "#f8f9fa",
                    color: i===viewMonth ? "white" : "#333" }}
                  onMouseEnter={e=>{ if(i!==viewMonth) e.currentTarget.style.background="#eef2ff"; }}
                  onMouseLeave={e=>{ if(i!==viewMonth) e.currentTarget.style.background="#f8f9fa"; }}>
                  {m}
                </div>
              ))}
            </div>
          )}

          {/* ── YEAR PICKER ── */}
          {mode==="year" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"6px" }}>
              {yearGrid.map(y => (
                <div key={y} onClick={() => { setViewYear(y); setMode("month"); }}
                  style={{ textAlign:"center", padding:"8px 4px", borderRadius:"8px", cursor:"pointer", fontSize:"13px",
                    fontWeight: y===viewYear ? 700 : 400,
                    background: y===viewYear ? "#4f46e5" : "#f8f9fa",
                    color: y===viewYear ? "white" : "#333" }}
                  onMouseEnter={e=>{ if(y!==viewYear) e.currentTarget.style.background="#eef2ff"; }}
                  onMouseLeave={e=>{ if(y!==viewYear) e.currentTarget.style.background="#f8f9fa"; }}>
                  {y}
                </div>
              ))}
            </div>
          )}

          {/* ── DAY GRID ── */}
          {mode==="day" && (<>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:"6px" }}>
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                <div key={d} style={{ textAlign:"center", fontSize:"11px", fontWeight:600, color:"#999", padding:"4px 0" }}>{d}</div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px" }}>
              {cells.map((d, i) => (
                <div key={i} onClick={() => d && fire(viewYear, viewMonth, d)}
                  style={{ textAlign:"center", padding:"7px 0", fontSize:"13px", borderRadius:"50%",
                    cursor: d ? "pointer" : "default",
                    background: d && isSelected(d) ? "#4f46e5" : "transparent",
                    color: d && isSelected(d) ? "white" : d && isToday(d) ? "#4f46e5" : d ? "#333" : "transparent",
                    fontWeight: d && (isSelected(d)||isToday(d)) ? 700 : 400,
                    border: d && isToday(d) && !isSelected(d) ? "1px solid #4f46e5" : "1px solid transparent",
                    transition:"background 0.15s" }}
                  onMouseEnter={e=>{ if(d&&!isSelected(d)) e.currentTarget.style.background="#f0f0f0"; }}
                  onMouseLeave={e=>{ if(d&&!isSelected(d)) e.currentTarget.style.background="transparent"; }}>
                  {d||""}
                </div>
              ))}
            </div>
          </>)}

          {/* Clear */}
          {selected && (
            <div onClick={() => { onChange({ target:{name,value:""} }); setOpen(false); setMode("day"); }}
              style={{ marginTop:"10px", textAlign:"center", fontSize:"12px", color:"#999", cursor:"pointer" }}>
              ✕ Clear
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const navBtn = {
  background: "none", border: "none", cursor: "pointer",
  fontSize: "20px", color: "#555", padding: "0 6px", lineHeight: 1
};

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