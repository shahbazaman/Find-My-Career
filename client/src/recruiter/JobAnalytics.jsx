import React from "react";

export default function JobAnalytics() {
  const data = {
    total: 100,
    shortlisted: 30,
    interviews: 12,
    hired: 3
  };

  const percent = (v) => Math.round((v / data.total) * 100);

  return (
    <>
      <style>{`
        .analytics-wrapper {
          margin-bottom: 2rem;
        }

        .analytics-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .analytics-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .analytics-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          animation: statFadeIn 0.6s ease backwards;
        }

        .stat-card:nth-child(1) { 
          animation-delay: 0.1s;
        }
        .stat-card:nth-child(2) { 
          animation-delay: 0.2s;
        }
        .stat-card:nth-child(3) { 
          animation-delay: 0.3s;
        }
        .stat-card:nth-child(4) { 
          animation-delay: 0.4s;
        }

        @keyframes statFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          transition: transform 0.5s ease;
          transform-origin: left;
          transform: scaleX(0);
        }

        .stat-card:nth-child(1)::before {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }

        .stat-card:nth-child(2)::before {
          background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
        }

        .stat-card:nth-child(3)::before {
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
        }

        .stat-card:nth-child(4)::before {
          background: linear-gradient(90deg, #11998e 0%, #38ef7d 100%);
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .stat-card:hover::before {
          transform: scaleX(1);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .stat-card:nth-child(1) .stat-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .stat-card:nth-child(2) .stat-icon {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .stat-card:nth-child(3) .stat-icon {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .stat-card:nth-child(4) .stat-icon {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.15) rotate(10deg);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .stat-title {
          font-size: 1rem;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .funnel-card {
          background: white;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
          animation: funnelSlideUp 0.6s ease 0.5s backwards;
        }

        @keyframes funnelSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .funnel-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .funnel-title::before {
          content: '';
          width: 4px;
          height: 30px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }

        .progress-item {
          margin-bottom: 2rem;
        }

        .progress-item:last-child {
          margin-bottom: 0;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }

        .progress-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .progress-percentage {
          font-size: 1.3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .progress-bar-container {
          height: 30px;
          background: #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 20px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .progress-bar-fill::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .progress-bar-fill.shortlisted {
          background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
          box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
        }

        .progress-bar-fill.interviews {
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
          box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
        }

        .progress-bar-fill.hired {
          background: linear-gradient(90deg, #11998e 0%, #38ef7d 100%);
          box-shadow: 0 5px 15px rgba(17, 153, 142, 0.4);
        }

        .progress-item-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .analytics-title {
            font-size: 1.5rem;
          }

          .analytics-stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          .stat-card {
            padding: 1.5rem;
          }

          .stat-icon {
            width: 50px;
            height: 50px;
            font-size: 22px;
          }

          .stat-value {
            font-size: 2rem;
          }

          .funnel-card {
            padding: 1.5rem;
          }

          .funnel-title {
            font-size: 1.3rem;
          }

          .progress-label {
            font-size: 1rem;
          }

          .progress-percentage {
            font-size: 1.1rem;
          }

          .progress-bar-container {
            height: 25px;
          }
        }
      `}</style>

      <div className="analytics-wrapper">
        <h4 className="analytics-title">
          <div className="analytics-icon">📊</div>
          Job Analytics
        </h4>

        <div className="analytics-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <h3 className="stat-value">{data.total}</h3>
            <p className="stat-title">Applied</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <h3 className="stat-value">{data.shortlisted}</h3>
            <p className="stat-title">Shortlisted</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎙️</div>
            <h3 className="stat-value">{data.interviews}</h3>
            <p className="stat-title">Interviews</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎉</div>
            <h3 className="stat-value">{data.hired}</h3>
            <p className="stat-title">Hired</p>
          </div>
        </div>
      </div>
    </>
  );
}