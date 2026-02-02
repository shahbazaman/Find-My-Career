import React from "react";

export default function Interviews() {
  const interviews = [
    {
      id: "i1",
      candidate: "Rahul Sharma",
      role: "Frontend Developer",
      date: "2025-02-12",
      mode: "Video",
      status: "Scheduled"
    },
    {
      id: "i2",
      candidate: "Priya Patel",
      role: "Backend Developer",
      date: "2025-02-15",
      mode: "Video",
      status: "Completed"
    },
    {
      id: "i3",
      candidate: "Amit Kumar",
      role: "Full Stack Developer",
      date: "2025-02-18",
      mode: "In-Person",
      status: "Scheduled"
    }
  ];

  const getStatusColor = (status) => {
    return status === "Scheduled" 
      ? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      : "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)";
  };

  const getModeIcon = (mode) => {
    return mode === "Video" ? "🎥" : "🏢";
  };

  return (
    <>
      <style>{`
        .interviews-wrapper {
          margin-bottom: 2rem;
        }

        .interviews-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .interviews-title::before {
          content: '';
          width: 5px;
          height: 35px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }

        .interviews-container {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: interviewsSlideIn 0.6s ease;
        }

        @keyframes interviewsSlideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .interviews-table-wrapper {
          overflow-x: auto;
          border-radius: 16px;
        }

        .interviews-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .interviews-table thead th {
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

        .interviews-table thead th:first-child {
          border-top-left-radius: 12px;
        }

        .interviews-table thead th:last-child {
          border-top-right-radius: 12px;
        }

        .interviews-table tbody tr {
          background: white;
          transition: all 0.3s ease;
          border-bottom: 1px solid #e2e8f0;
          animation: interviewRowFadeIn 0.5s ease backwards;
        }

        .interviews-table tbody tr:nth-child(1) { animation-delay: 0.1s; }
        .interviews-table tbody tr:nth-child(2) { animation-delay: 0.2s; }
        .interviews-table tbody tr:nth-child(3) { animation-delay: 0.3s; }

        @keyframes interviewRowFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .interviews-table tbody tr:hover {
          background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          transform: scale(1.01);
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }

        .interviews-table tbody td {
          padding: 1.5rem 1rem;
          color: #4a5568;
          font-weight: 500;
          text-align: center;
          vertical-align: middle;
          border: none;
        }

        .interviews-table tbody tr:last-child td:first-child {
          border-bottom-left-radius: 12px;
        }

        .interviews-table tbody tr:last-child td:last-child {
          border-bottom-right-radius: 12px;
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

        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-radius: 20px;
          font-weight: 600;
          color: #2d3748;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .mode-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.2rem;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
          transition: all 0.3s ease;
        }

        .mode-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 172, 254, 0.5);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.4rem;
          color: white;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          animation: statusGlow 2s ease-in-out infinite;
        }

        @keyframes statusGlow {
          0%, 100% {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
          }
        }

        .status-badge::before {
          content: '●';
          font-size: 1.2rem;
          animation: statusPulse 1.5s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .action-buttons {
          display: flex;
          gap: 0.8rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .done-btn {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
          box-shadow: 0 5px 15px rgba(17, 153, 142, 0.3);
          white-space: nowrap;
        }

        .done-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(17, 153, 142, 0.5);
          background: linear-gradient(135deg, #38ef7d 0%, #11998e 100%);
        }

        .done-btn:active {
          transform: translateY(-1px);
        }

        .cancel-btn {
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

        .cancel-btn:hover {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
        }

        .cancel-btn:active {
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

        @media (max-width: 768px) {
          .interviews-title {
            font-size: 1.5rem;
          }

          .interviews-container {
            padding: 1rem;
            border-radius: 16px;
          }

          .interviews-table thead th,
          .interviews-table tbody td {
            padding: 1rem 0.5rem;
            font-size: 0.85rem;
          }

          .action-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }

          .done-btn,
          .cancel-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
            width: 100%;
            justify-content: center;
          }

          .mode-badge,
          .status-badge,
          .date-badge {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
          }
        }
      `}</style>

      <div className="interviews-wrapper">
        <h4 className="interviews-title">Interview Management</h4>

        <div className="interviews-container">
          <div className="interviews-table-wrapper">
            {interviews.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📅</div>
                <div className="empty-state-text">No interviews scheduled</div>
              </div>
            ) : (
              <table className="interviews-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Mode</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {interviews.map(i => (
                    <tr key={i.id}>
                      <td className="candidate-name">{i.candidate}</td>
                      <td className="role-text">{i.role}</td>
                      <td>
                        <span className="date-badge">
                          📆 {i.date}
                        </span>
                      </td>
                      <td>
                        <span className="mode-badge">
                          {getModeIcon(i.mode)} {i.mode}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ background: getStatusColor(i.status) }}
                        >
                          {i.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="done-btn">
                            ✓ Done
                          </button>
                          <button className="cancel-btn">
                            ✕ Cancel
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