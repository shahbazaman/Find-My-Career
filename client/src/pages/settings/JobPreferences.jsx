import { useState } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Wrench,
  Clock,
  Laptop,
  Save,
  CheckCircle,
  Building,
  X
} from "lucide-react";

const JobPreferences = () => {
  const [preferences, setPreferences] = useState({
    roles: "",
    locations: "",
    jobType: "Full-time",
    workMode: "Onsite",
    experienceLevel: "Fresher",
    expectedSalary: "",
    skills: "",
    availability: "Immediate"
  });

  const [saved, setSaved] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleClear = (fieldName) => {
    setPreferences({ ...preferences, [fieldName]: "" });
  };

  const handleClearAll = () => {
    setPreferences({
      roles: "",
      locations: "",
      jobType: "Full-time",
      workMode: "Onsite",
      experienceLevel: "Fresher",
      expectedSalary: "",
      skills: "",
      availability: "Immediate"
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Preferences:", preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const jobRoles = [
    "Select a role...",
    "MERN Stack Developer",
    "React Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "DevOps Engineer",
    "UI/UX Designer"
  ];

  const locations = [
    "Select location...",
    "Bangalore",
    "Kochi",
    "Remote",
    "Calicut",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Pune"
  ];

  return (
    <div className="job-pref-container mt-5">
      {/* Header */}
      <div className="settings-header fade-in">
        <div className="header-icon-wrapper">
          <div className="header-icon-glow"></div>
          <div className="header-icon">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h2 className="settings-title">Job Preferences</h2>
          <p className="settings-subtitle">Tell us what you're looking for and we'll match you with the perfect opportunities</p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="settings-card fade-in-up">
        <div className="settings-card-content">
          <div className="form-sections">
            {/* Job Role Section */}
            <div className="form-section slide-right" style={{animationDelay: '0.1s'}}>
              <label className="section-label">
                <div className="label-icon indigo">
                  <Briefcase className="w-5 h-5" />
                </div>
                Preferred Job Role
              </label>

              <div className="input-wrapper">
                <select
                  name="roles"
                  value={preferences.roles}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('roles')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-select ${focusedField === 'roles' ? 'focused indigo-focus' : ''}`}
                >
                  {jobRoles.map((role) => (
                    <option key={role} value={role === "Select a role..." ? "" : role}>
                      {role}
                    </option>
                  ))}
                </select>
                {preferences.roles && (
                  <button onClick={() => handleClear('roles')} className="clear-btn">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Location Section */}
            <div className="form-section slide-right" style={{animationDelay: '0.2s'}}>
              <label className="section-label">
                <div className="label-icon purple">
                  <MapPin className="w-5 h-5" />
                </div>
                Preferred Location
              </label>

              <div className="input-wrapper">
                <select
                  name="locations"
                  value={preferences.locations}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('locations')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-select ${focusedField === 'locations' ? 'focused purple-focus' : ''}`}
                >
                  {locations.map((location) => (
                    <option key={location} value={location === "Select location..." ? "" : location}>
                      {location}
                    </option>
                  ))}
                </select>
                {preferences.locations && (
                  <button onClick={() => handleClear('locations')} className="clear-btn">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Job Type & Work Mode Row */}
            <div className="form-row slide-right" style={{animationDelay: '0.3s'}}>
              <div className="form-section">
                <label className="section-label">
                  <Clock className="w-5 h-5 text-green-500" />
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={preferences.jobType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="form-section">
                <label className="section-label">
                  <Laptop className="w-5 h-5 text-blue-500" />
                  Work Mode
                </label>
                <select
                  name="workMode"
                  value={preferences.workMode}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>Onsite</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>

            {/* Experience & Salary Row */}
            <div className="form-row slide-right" style={{animationDelay: '0.4s'}}>
              <div className="form-section">
                <label className="section-label">
                  <Building className="w-5 h-5 text-orange-500" />
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={preferences.experienceLevel}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>Fresher</option>
                  <option>1–2 Years</option>
                  <option>3–5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>

              <div className="form-section">
                <label className="section-label">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Expected Salary
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="expectedSalary"
                    placeholder="₹ 5,00,000 / Year"
                    value={preferences.expectedSalary}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('salary')}
                    onBlur={() => setFocusedField(null)}
                    className={`form-input ${focusedField === 'salary' ? 'focused green-focus' : ''}`}
                  />
                  {preferences.expectedSalary && (
                    <button onClick={() => handleClear('expectedSalary')} className="clear-btn">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="form-section slide-right" style={{animationDelay: '0.5s'}}>
              <label className="section-label">
                <Wrench className="w-5 h-5 text-pink-500" />
                Skills / Tech Stack
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="skills"
                  placeholder="React, Node.js, MongoDB, Express, TypeScript..."
                  value={preferences.skills}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('skills')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-input ${focusedField === 'skills' ? 'focused pink-focus' : ''}`}
                />
                {preferences.skills && (
                  <button onClick={() => handleClear('skills')} className="clear-btn">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Availability Section */}
            <div className="form-section slide-right" style={{animationDelay: '0.6s'}}>
              <label className="section-label">
                <Clock className="w-5 h-5 text-teal-500" />
                Availability
              </label>
              <select
                name="availability"
                value={preferences.availability}
                onChange={handleChange}
                className="form-select"
              >
                <option>Immediate</option>
                <option>15 Days</option>
                <option>30 Days</option>
                <option>60 Days</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="button-group fade-in" style={{animationDelay: '0.7s'}}>
              <button
                onClick={handleSubmit}
                disabled={saved}
                className={`primary-btn ${saved ? 'success' : ''}`}
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-5 h-5 animate-bounce" />
                    <span>Preferences Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Preferences</span>
                  </>
                )}
              </button>

              <button onClick={handleClearAll} className="secondary-btn clear-all">
                <X className="w-5 h-5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Info Card */}
            <div className="info-card fade-in" style={{animationDelay: '0.8s'}}>
              <span className="info-icon">💡</span>
              <span>Your preferences help us recommend the most relevant job opportunities tailored to your skills and interests.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .job-pref-container {
          max-width: 80rem;
          margin: 0 auto;
        }

        /* Header */
        .settings-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .header-icon-wrapper {
          position: relative;
        }

        .header-icon-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 0.75rem;
          filter: blur(8px);
          opacity: 0.5;
        }

        .header-icon {
          position: relative;
          padding: 0.75rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settings-title {
          font-size: 1.875rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .settings-subtitle {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0.25rem 0 0 0;
        }

        /* Card */
        .settings-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(226, 232, 240, 0.5);
          overflow: hidden;
        }

        .settings-card-content {
          padding: 2rem;
        }

        .form-sections {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .label-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .label-icon.indigo {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        }

        .label-icon.purple {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        }

        .input-wrapper {
          position: relative;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 500;
          color: #1e293b;
          transition: all 0.3s ease;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.25rem;
          padding-right: 3rem;
        }

        .form-input:hover,
        .form-select:hover {
          border-color: #cbd5e1;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          background: white;
        }

        .form-input.focused.indigo-focus,
        .form-select.focused.indigo-focus {
          border-color: #6366f1;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }

        .form-input.focused.purple-focus,
        .form-select.focused.purple-focus {
          border-color: #a855f7;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.15);
        }

        .form-input.focused.green-focus {
          border-color: #10b981;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }

        .form-input.focused.pink-focus {
          border-color: #ec4899;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.15);
        }

        .clear-btn {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          padding: 0.375rem;
          background: #fee2e2;
          border: none;
          border-radius: 0.5rem;
          color: #dc2626;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-btn:hover {
          background: #fecaca;
          transform: translateY(-50%) rotate(90deg);
        }

        /* Buttons */
        .button-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .primary-btn,
        .secondary-btn {
          padding: 1.25rem 2rem;
          border-radius: 0.75rem;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .primary-btn {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        .primary-btn.success {
          background: #10b981;
        }

        .secondary-btn {
          background: white;
          color: #1e293b;
          border: 2px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .secondary-btn.clear-all {
          color: #dc2626;
          border-color: #dc2626;
        }

        .secondary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .secondary-btn.clear-all:hover {
          background: #dc2626;
          color: white;
        }

        /* Info Card */
        .info-card {
          padding: 1rem;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border: 2px solid #93c5fd;
          border-radius: 1rem;
          font-size: 0.875rem;
          color: #1e3a8a;
          display: flex;
          align-items: start;
          gap: 0.75rem;
        }

        .info-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        /* Animations */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .slide-right {
          animation: slide-right 0.5s ease-out backwards;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .settings-card-content {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .button-group {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default JobPreferences;