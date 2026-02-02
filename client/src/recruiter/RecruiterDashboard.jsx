import React from "react";

export default function RecruiterDashboard() {
  const stats = {
    jobs: 6,
    applications: 42,
    shortlisted: 12,
    closed: 2
  };

  const StatCard = ({ icon, label, value, gradient, delay }) => (
    <div className="dashboard-stat-card" style={{ animationDelay: `${delay}s` }}>
      <div className="stat-icon-wrapper" style={{ background: gradient }}>
        {icon}
      </div>
      <h3 className="stat-card-value">{value}</h3>
      <p className="stat-card-label">{label}</p>
      <div className="stat-card-shine"></div>
    </div>
  );

  return (
    <>
      <style>{`
        .dashboard-stats-wrapper {
          margin-bottom: 2rem;
        }

        .dashboard-stats-title {
          font-size: 2rem;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: titleSlideIn 0.6s ease;
        }

        @keyframes titleSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .dashboard-stats-title::before {
          content: '';
          width: 6px;
          height: 40px;
          background: linear-gradient(135deg, #060729ff 0%, #0c248dff 100%);
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .dashboard-stat-card {
          background: white;
          border-radius: 24px;
          padding: 2.5rem 2rem;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          animation: cardFadeInUp 0.6s ease backwards;
          cursor: pointer;
        }

        @keyframes cardFadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dashboard-stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(135deg, #060729ff 0%, #0c248dff 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s ease;
        }

        .dashboard-stat-card:hover {
          transform: translateY(-15px) scale(1.03);
          box-shadow: 0 25px 60px rgba(102, 126, 234, 0.25);
        }

        .dashboard-stat-card:hover::before {
          transform: scaleX(1);
        }

        .stat-card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            transparent 100%
          );
          transition: left 0.6s ease;
        }

        .dashboard-stat-card:hover .stat-card-shine {
          left: 100%;
        }

        .stat-icon-wrapper {
          width: 85px;
          height: 85px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin: 0 auto 1.5rem;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          z-index: 1;
        }

        .dashboard-stat-card:hover .stat-icon-wrapper {
          transform: scale(1.2) rotate(360deg);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.3);
        }

        .stat-card-value {
          font-size: 3.5rem;
          font-weight: 900;
          color: #2d3748;
          margin-bottom: 0.8rem;
          line-height: 1;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .dashboard-stat-card:hover .stat-card-value {
          background: linear-gradient(135deg, #060729ff 0%, #0c248dff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transform: scale(1.1);
        }

        .stat-card-label {
          font-size: 1.05rem;
          font-weight: 700;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .dashboard-stat-card:hover .stat-card-label {
          color: #667eea;
          transform: translateY(-3px);
        }

        .stats-summary {
          margin-top: 2rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
          border-radius: 20px;
          border: 2px solid rgba(102, 126, 234, 0.15);
          animation: summaryFadeIn 0.8s ease 0.6s backwards;
        }

        @keyframes summaryFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stats-summary-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .summary-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .summary-icon {
          font-size: 1.5rem;
        }

        .summary-highlight {
          font-weight: 800;
          background: linear-gradient(135deg, #060729ff 0%, #0c248dff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.3rem;
        }

        @media (max-width: 768px) {
          .dashboard-stats-title {
            font-size: 1.6rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 1rem;
          }

          .dashboard-stat-card {
            padding: 1.8rem 1.5rem;
          }

          .stat-icon-wrapper {
            width: 65px;
            height: 65px;
            font-size: 28px;
          }

          .stat-card-value {
            font-size: 2.5rem;
          }

          .stat-card-label {
            font-size: 0.9rem;
            letter-spacing: 1px;
          }

          .stats-summary-content {
            flex-direction: column;
            text-align: center;
          }

          .summary-text {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-stat-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <div className="dashboard-stats-wrapper">
        <h4 className="dashboard-stats-title">Recruiter Dashboard</h4>
        
        <div className="stats-grid">
          <StatCard 
            icon="💼" 
            label="Jobs Posted" 
            value={stats.jobs}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            delay={0.1}
          />
          <StatCard 
            icon="👥" 
            label="Applications" 
            value={stats.applications}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            delay={0.2}
          />
          <StatCard 
            icon="✓" 
            label="Shortlisted" 
            value={stats.shortlisted}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            delay={0.3}
          />
          <StatCard 
            icon="✕" 
            label="Closed Jobs" 
            value={stats.closed}
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            delay={0.4}
          />
        </div>

        <div className="stats-summary">
          <div className="stats-summary-content">
            <div className="summary-text">
              <span className="summary-icon">📊</span>
              <span>Total Activity Overview</span>
            </div>
            <div className="summary-text">
              <span>Average Applications per Job:</span>
              <span className="summary-highlight">
                {stats.jobs > 0 ? Math.round(stats.applications / stats.jobs) : 0}
              </span>
            </div>
            <div className="summary-text">
              <span>Shortlist Rate:</span>
              <span className="summary-highlight">
                {stats.applications > 0 ? Math.round((stats.shortlisted / stats.applications) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}