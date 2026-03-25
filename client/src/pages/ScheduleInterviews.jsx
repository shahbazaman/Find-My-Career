import React, { useState, useEffect , useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, FiCalendar, FiX, FiUsers, FiClock, 
  FiVideo, FiMapPin, FiInfo, FiCheckCircle 
} from "react-icons/fi";

import { toast } from "react-toastify";
const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];
const navBtn = {
  background: "none", border: "none", cursor: "pointer",
  fontSize: "20px", color: "#555", padding: "0 6px", lineHeight: 1
};
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

const ScheduleInterview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Consolidate applicants from state
  const selectedApplicants = state?.applicants || [];

  const [form, setForm] = useState({
    date: "",
    time: "",
    mode: "Online",
    locationOrLink: "",
    notes: ""
  });

  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Safety: prevent direct access if no applicants are passed
  // Redirects to previous page instead of a hardcoded path that might not exist
  useEffect(() => {
    if (!selectedApplicants || selectedApplicants.length === 0) {
      toast.warn("Please select applicants first");
      navigate(-1); 
    }
  }, [selectedApplicants, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  console.log("🟡 [FRONTEND] Submit clicked");
  console.log("🟡 [FRONTEND] Selected applicants:", selectedApplicants);
  console.log("🟡 [FRONTEND] Form data:", form);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const companyName =
    storedUser.companyName ||
    `${storedUser.firstName} ${storedUser.lastName}`;

  const jobTitle = selectedApplicants[0]?.jobTitle || "Position";
  const jobId =
    state?.jobId ||
    selectedApplicants[0]?.jobId ||
    selectedApplicants[0]?.job?._id;

  // const payload = {
  //   applicationIds: selectedApplicants.map(a => a._id),
  //   applicants: selectedApplicants.map(a => ({
  //     name: a.name,
  //     email: a.email
  //   })),
  //   companyName,
  //   jobTitle,
  //   interviewDate: form.date,
  //   interviewTime: form.time,
  //   mode: form.mode,
  //   locationOrLink: form.locationOrLink,
  //   notes: form.notes
  // };
const payload = {
  applicationIds: selectedApplicants.map(a => a.applicationId),
  applicants: selectedApplicants.map(a => ({
  name: a.name,
  email: a.email,
  userId: a.userId
})),

  companyName,
  jobTitle,
  interviewDate: form.date,
  interviewTime: form.time,
  mode: form.mode,
  locationOrLink: form.locationOrLink,
  notes: form.notes
};

  console.log("🟡 [FRONTEND] Payload being sent:", payload);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/interviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      }
    );

    console.log("🟢 [FRONTEND] Response received:", response.status);

    const data = await response.json();
    console.log("🟢 [FRONTEND] Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "Interview failed");
    }

    navigate(`/recruiter/applicants/${jobId}`);
  } catch (error) {
    console.error("🔴 [FRONTEND] Submit error:", error);
  } finally {
    setLoading(false);
  }
};

  // Prevent rendering if redirecting
  if (!selectedApplicants.length) return null;

  const styles = {
    container: {
      padding: "clamp(1rem, 5vw, 2.5rem)",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Inter', sans-serif"
    },
    card: {
    background: "#fff",
    padding: "clamp(1.25rem, 4vw, 2rem)",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    border: "1px solid #f0f0f0",
    overflow: "hidden",
    width: "100%",
    boxSizing: "border-box"
  },
    inputGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem",
    width: "100%",
    boxSizing: "border-box"
  },
    label: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#4a5568",
      marginBottom: "0.5rem"
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
      maxWidth: "100%",
      height: "46px"
    },
    badge: {
      background: "#ebf4ff",
      color: "#4c51bf",
      padding: "4px 12px",
      borderRadius: "99px",
      fontSize: "0.85rem",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Navigation */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "none",
          background: "none",
          cursor: "pointer",
          marginBottom: "1.5rem",
          color: "#667eea",
          fontWeight: "600",
          fontSize: "1rem"
        }}
      >
        <FiArrowLeft /> Back
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "#1a202c", display: "flex", alignItems: "center", gap: "12px" }}>
            <FiCalendar style={{ color: "#667eea" }} /> Schedule Interview
          </h1>
          <p style={{ color: "#718096", marginTop: "0.5rem" }}>
            Setting up interviews for <strong>{selectedApplicants[0]?.jobTitle || "the selected role"}</strong>
          </p>
        </div>
        <div style={styles.badge}>
          <FiUsers /> {selectedApplicants.length} Selected
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowApplicantsModal(true)}
        style={{
          marginBottom: "2rem",
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          border: "1px dashed #667eea",
          background: "#f7fafc",
          color: "#667eea",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        View Selected Candidate List
      </button>

      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.inputGroup}>
  <div>
    <label style={styles.label}><FiCalendar /> Interview Date</label>
    <CustomDatePicker
      name="date"
      value={form.date}
      onChange={(e) => setForm({ ...form, date: e.target.value })}
    />
  </div>
  <div>
    <label style={styles.label}><FiClock /> Interview Time</label>
    <input 
      type="time" 
      name="time" 
      style={{ ...styles.input }} 
      required 
      onChange={handleChange} 
    />
  </div>
</div>
{/* , display: "block", width: "100%", minWidth: 0 */}
        <div style={styles.inputGroup}>
          <div>
            <label style={styles.label}><FiVideo /> Interview Mode</label>
            <select 
              name="mode" 
              value={form.mode} 
              onChange={handleChange} 
              style={styles.input}
            >
              <option value="Online">Online (Zoom/Google Meet)</option>
              <option value="In-person">In-person (At Office)</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>
              {form.mode === "Online" ? <><FiVideo /> Meeting Link</> : <><FiMapPin /> Office Location</>}
            </label>
            <input
              type="text"
              name="locationOrLink"
              style={styles.input}
              placeholder={form.mode === "Online" ? "https://meet.google.com/..." : "123 Business Street, Suite 4B"}
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={styles.label}><FiInfo /> Additional Instructions (Optional)</label>
          <textarea 
            name="notes" 
            rows={4} 
            style={{ ...styles.input, height: "auto", resize: "vertical" }} 
            placeholder="Tell candidates what to prepare..."
            onChange={handleChange} 
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "1rem",
            border: "none",
            borderRadius: "10px",
            background: loading ? "#a0aec0" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "transform 0.2s"
          }}
        >
          {loading ? "Processing..." : <><FiCheckCircle /> Confirm & Send Invitations</>}
        </button>
      </form>

      {/* ===== APPLICANTS MODAL ===== */}
      {showApplicantsModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26, 32, 44, 0.8)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            background: "#fff",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "16px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>Review Candidates</h3>
              <FiX style={{ cursor: "pointer", fontSize: "1.5rem" }} onClick={() => setShowApplicantsModal(false)} />
            </div>
            <div style={{ overflowY: "auto", flex: 1, paddingRight: "5px" }}>
              {selectedApplicants.map((a) => (
                <div key={a._id} style={{
                  padding: "1rem",
                  borderBottom: "1px solid #edf2f7",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#667eea", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                    {a.name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <div style={{ fontWeight: "600" }}>{a.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#718096" }}>{a.email}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowApplicantsModal(false)}
              style={{
                marginTop: "1.5rem",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "none",
                background: "#f7fafc",
                color: "#4a5568",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Close List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleInterview;