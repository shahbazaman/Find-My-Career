import React from "react";

export default function ShortlistedCandidates() {
  const candidates = [
    {
      id: "c1",
      name: "Rahul Sharma",
      role: "Frontend Developer",
      experience: "2 Years",
      status: "Shortlisted"
    },
    {
      id: "c2",
      name: "Priya Patel",
      role: "Backend Developer",
      experience: "3 Years",
      status: "Shortlisted"
    },
    {
      id: "c3",
      name: "Amit Kumar",
      role: "Full Stack Developer",
      experience: "4 Years",
      status: "Shortlisted"
    }
  ];

  return (
    <>
      <style>{`
        .shortlisted-wrapper {
          margin-bottom: 2rem;
        }

        .shortlisted-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .shortlisted-title::before {
          content: '';
          width: 5px;
          height: 35px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }

        .shortlisted-container {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: shortlistedSlideIn 0.6s ease;
        }

        @keyframes shortlistedSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .shortlisted-table-wrapper {
          overflow-x: auto;
          border-radius: 16px;
        }

        .shortlisted-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .shortlisted-table thead th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.3rem 1rem;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 1px;
          text-align: center;
          border: none;
          white-space: nowrap;
        }

        .shortlisted-table thead th:first-child {
          border-top-left-radius: 12px;
          text-align: left;
          padding-left: 1.5rem;
        }

        .shortlisted-table thead th:last-child {
          border-top-right-radius: 12px;
        }

        .shortlisted-table tbody tr {
          background: white;
          transition: all 0.3s ease;
          border-bottom: 1px solid #e2e8f0;
          animation: candidateRowFadeIn 0.5s ease backwards;
        }

        .shortlisted-table tbody tr:nth-child(1) { animation-delay: 0.1s; }
        .shortlisted-table tbody tr:nth-child(2) { animation-delay: 0.2s; }
        .shortlisted-table tbody tr:nth-child(3) { animation-delay: 0.3s; }

        @keyframes candidateRowFadeIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .shortlisted-table tbody tr:hover {
          background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          transform: scale(1.01);
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        .shortlisted-table tbody td {
          padding: 1.5rem 1rem;
          color: #4a5568;
          font-weight: 500;
          text-align: center;
          vertical-align: middle;
          border: none;
        }

        .shortlisted-table tbody td:first-child {
          text-align: left;
          padding-left: 1.5rem;
        }

        .shortlisted-table tbody tr:last-child td:first-child {
          border-bottom-left-radius: 12px;
        }

        .shortlisted-table tbody tr:last-child td:last-child {
          border-bottom-right-radius: 12px;
        }

        .candidate-name-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .candidate-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
          transition: transform 0.3s ease;
        }

        .shortlisted-table tbody tr:hover .candidate-avatar {
          transform: scale(1.15) rotate(5deg);
        }

        .candidate-name {
          font-weight: 700;
          color: #2d3748;
          font-size: 1.05rem;
        }

        .role-text {
          color: #667eea;
          font-weight: 600;
        }

        .experience-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-radius: 20px;
          font-weight: 600;
          color: #2d3748;
          border: 2px solid rgba(102, 126, 234, 0.2);
          transition: all 0.3s ease;
        }

        .experience-badge::before {
          content: '⭐';
          font-size: 1rem;
        }

        .experience-badge:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          transform: scale(1.05);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.5rem;
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 5px 15px rgba(17, 153, 142, 0.3);
          animation: statusGlow 2s ease-in-out infinite;
        }

        @keyframes statusGlow {
          0%, 100% {
            box-shadow: 0 5px 15px rgba(17, 153, 142, 0.3);
          }
          50% {
            box-shadow: 0 8px 25px rgba(17, 153, 142, 0.6);
          }
        }

        .status-badge::before {
          content: '✓';
          font-size: 1.2rem;
          font-weight: bold;
        }

        .action-buttons {
          display: flex;
          gap: 0.8rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .interview-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
          white-space: nowrap;
        }

        .interview-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }

        .interview-btn:active {
          transform: translateY(-1px);
        }

        .reject-btn {
          background: transparent;
          color: #ff6b6b;
          border: 2px solid #ff6b6b;
          padding: 0.7rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          white-space: nowrap;
        }

        .reject-btn:hover {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
        }

        .reject-btn:active {
          transform: translateY(-1px);
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #718096;
        }

        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state-text {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .candidates-count {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-radius: 20px;
          font-weight: 700;
          color: #667eea;
          font-size: 0.95rem;
          margin-left: 0.8rem;
        }

        @media (max-width: 768px) {
          .shortlisted-title {
            font-size: 1.5rem;
          }

          .shortlisted-container {
            padding: 1rem;
            border-radius: 16px;
          }

          .shortlisted-table thead th,
          .shortlisted-table tbody td {
            padding: 1rem 0.5rem;
            font-size: 0.85rem;
          }

          .shortlisted-table tbody td:first-child,
          .shortlisted-table thead th:first-child {
            padding-left: 1rem;
          }

          .candidate-name-cell {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .candidate-avatar {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .candidate-name {
            font-size: 0.95rem;
          }

          .action-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }

          .interview-btn,
          .reject-btn {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
            width: 100%;
            justify-content: center;
          }

          .experience-badge,
          .status-badge {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
          }
        }
      `}</style>

      <div className="shortlisted-wrapper">
        <h4 className="shortlisted-title">
          Shortlisted Candidates
          <span className="candidates-count">
            {candidates.length} {candidates.length === 1 ? 'Candidate' : 'Candidates'}
          </span>
        </h4>

        <div className="shortlisted-container">
          <div className="shortlisted-table-wrapper">
            {candidates.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🎯</div>
                <div className="empty-state-text">No shortlisted candidates yet</div>
              </div>
            ) : (
              <table className="shortlisted-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Role</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {candidates.map(c => (
                    <tr key={c.id}>
                      <td>
                        <div className="candidate-name-cell">
                          <div className="candidate-avatar">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="candidate-name">{c.name}</span>
                        </div>
                      </td>
                      <td className="role-text">{c.role}</td>
                      <td>
                        <span className="experience-badge">
                          {c.experience}
                        </span>
                      </td>
                      <td>
                        <span className="status-badge">
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="interview-btn">
                            📅 Schedule Interview
                          </button>
                          <button className="reject-btn">
                            ✕ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}