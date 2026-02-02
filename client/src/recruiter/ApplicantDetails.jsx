import React from "react";

export default function ApplicantDetails() {
  const applicant = {
    name: "Rahul Sharma",
    experience: "2 Years",
    skills: ["React", "JS", "Node"],
    status: "Shortlisted"
  };

  return (
    <>
      <style>{`
        .applicant-details-wrapper {
          margin-bottom: 2rem;
        }

        .applicant-section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .applicant-section-title::before {
          content: '';
          width: 5px;
          height: 35px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }

        .applicant-card {
          background: white;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
          border: none;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: applicantFadeIn 0.6s ease;
        }

        @keyframes applicantFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .applicant-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }

        .applicant-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 70px rgba(102, 126, 234, 0.25);
        }

        .applicant-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .applicant-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: white;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          transition: transform 0.3s ease;
        }

        .applicant-card:hover .applicant-avatar {
          transform: scale(1.1) rotate(5deg);
        }

        .applicant-info {
          flex: 1;
        }

        .applicant-name {
          font-size: 2rem;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .applicant-details-grid {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .detail-row:hover {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          transform: translateX(5px);
        }

        .detail-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .detail-content {
          flex: 1;
        }

        .detail-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.3rem;
        }

        .detail-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 0.5rem;
        }

        .skill-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.6rem 1.2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
          animation: skillPop 0.4s ease backwards;
        }

        .skill-badge:nth-child(1) { animation-delay: 0.1s; }
        .skill-badge:nth-child(2) { animation-delay: 0.2s; }
        .skill-badge:nth-child(3) { animation-delay: 0.3s; }

        @keyframes skillPop {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .skill-badge:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
        }

        .status-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 2px solid rgba(102, 126, 234, 0.1);
          margin-bottom: 1.5rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.8rem;
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 25px rgba(17, 153, 142, 0.4);
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% {
            box-shadow: 0 8px 25px rgba(17, 153, 142, 0.4);
          }
          50% {
            box-shadow: 0 12px 35px rgba(17, 153, 142, 0.6);
          }
        }

        .status-badge::before {
          content: '✓';
          font-size: 1.2rem;
          font-weight: bold;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .download-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 16px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .download-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }

        .download-btn:active {
          transform: translateY(-2px);
        }

        .download-icon {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .download-btn:hover .download-icon {
          transform: translateY(3px);
        }

        @media (max-width: 768px) {
          .applicant-section-title {
            font-size: 1.5rem;
          }

          .applicant-card {
            padding: 1.5rem;
          }

          .applicant-header {
            flex-direction: column;
            text-align: center;
          }

          .applicant-avatar {
            width: 70px;
            height: 70px;
            font-size: 2rem;
          }

          .applicant-name {
            font-size: 1.5rem;
          }

          .status-section {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .action-buttons {
            width: 100%;
          }

          .download-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="applicant-details-wrapper">
        <h4 className="applicant-section-title">Applicant Details</h4>

        <div className="applicant-card">
          <div className="applicant-header">
            <div className="applicant-avatar">
              {applicant.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="applicant-info">
              <h2 className="applicant-name">{applicant.name}</h2>
            </div>
          </div>

          <div className="applicant-details-grid">
            <div className="detail-row">
              <div className="detail-icon">💼</div>
              <div className="detail-content">
                <div className="detail-label">Experience</div>
                <div className="detail-value">{applicant.experience}</div>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-icon">🎯</div>
              <div className="detail-content">
                <div className="detail-label">Skills</div>
                <div className="skills-container">
                  {applicant.skills.map(skill => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="status-section">
            <span className="status-badge">{applicant.status}</span>
            <div className="action-buttons">
              <button className="download-btn">
                <span className="download-icon">📥</span>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}