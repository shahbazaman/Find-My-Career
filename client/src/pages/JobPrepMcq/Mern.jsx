import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaTimesCircle
} from "react-icons/fa";

const QUESTIONS_PER_LEVEL = 20;
const TOTAL_LEVELS = 4;

const Mern = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  
const questions = [
  {
    id: 1,
    question: "What does MERN stand for?",
    options: [
      "MongoDB, Express, React, Node",
      "MySQL, Express, React, Node",
      "MongoDB, Express, Redux, Node",
      "MongoDB, Ember, React, Node"
    ],
    correctAnswer: "MongoDB, Express, React, Node"
  },
  {
    id: 2,
    question: "Which layer handles the frontend in MERN stack?",
    options: ["MongoDB", "Node.js", "React", "Express"],
    correctAnswer: "React"
  },
  {
    id: 3,
    question: "Which component acts as the backend runtime?",
    options: ["React", "MongoDB", "Node.js", "CSS"],
    correctAnswer: "Node.js"
  },
  {
    id: 4,
    question: "Which framework is built on top of Node.js?",
    options: ["React", "Angular", "Express", "Vue"],
    correctAnswer: "Express"
  },
  {
    id: 5,
    question: "MongoDB is a ___ database.",
    options: ["Relational", "NoSQL", "Graph", "Hierarchical"],
    correctAnswer: "NoSQL"
  },

  {
    id: 6,
    question: "MongoDB stores data in the form of?",
    options: ["Tables", "Rows", "Documents", "Columns"],
    correctAnswer: "Documents"
  },
  {
    id: 7,
    question: "Which format does MongoDB use internally?",
    options: ["XML", "CSV", "BSON", "SQL"],
    correctAnswer: "BSON"
  },
  {
    id: 8,
    question: "Which command starts a Node.js application?",
    options: ["node app.js", "npm install", "npm start only", "node install"],
    correctAnswer: "node app.js"
  },
  {
    id: 9,
    question: "Which HTTP method is used to fetch data?",
    options: ["POST", "PUT", "DELETE", "GET"],
    correctAnswer: "GET"
  },
  {
    id: 10,
    question: "Which HTTP method is used to create data?",
    options: ["GET", "PUT", "POST", "DELETE"],
    correctAnswer: "POST"
  },

  {
    id: 11,
    question: "Which HTTP method updates existing data?",
    options: ["POST", "PATCH", "PUT", "Both PATCH and PUT"],
    correctAnswer: "Both PATCH and PUT"
  },
  {
    id: 12,
    question: "Which HTTP method removes data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: "DELETE"
  },
  {
    id: 13,
    question: "Express.js is mainly used for?",
    options: [
      "Database connection",
      "Routing and middleware",
      "UI design",
      "State management"
    ],
    correctAnswer: "Routing and middleware"
  },
  {
    id: 14,
    question: "Middleware in Express is?",
    options: [
      "Database",
      "Function that executes during request-response",
      "Frontend logic",
      "Server file"
    ],
    correctAnswer: "Function that executes during request-response"
  },
  {
    id: 15,
    question: "Which middleware parses JSON data?",
    options: ["body-parser", "cors", "morgan", "dotenv"],
    correctAnswer: "body-parser"
  },

  {
    id: 16,
    question: "What is REST API?",
    options: [
      "Database",
      "Architecture style for APIs",
      "Framework",
      "Library"
    ],
    correctAnswer: "Architecture style for APIs"
  },
  {
    id: 17,
    question: "REST APIs are stateless?",
    options: ["Yes", "No", "Sometimes", "Depends"],
    correctAnswer: "Yes"
  },
  {
    id: 18,
    question: "Which status code means success?",
    options: ["200", "400", "401", "500"],
    correctAnswer: "200"
  },
  {
    id: 19,
    question: "Which status code means resource created?",
    options: ["200", "201", "400", "500"],
    correctAnswer: "201"
  },
  {
    id: 20,
    question: "Which status code means unauthorized?",
    options: ["200", "201", "401", "404"],
    correctAnswer: "401"
  },

  {
    id: 21,
    question: "Which library is used to connect MongoDB with Node?",
    options: ["mongoose", "axios", "cors", "jsonwebtoken"],
    correctAnswer: "mongoose"
  },
  {
    id: 22,
    question: "Mongoose is used for?",
    options: [
      "State management",
      "ODM for MongoDB",
      "Routing",
      "Authentication"
    ],
    correctAnswer: "ODM for MongoDB"
  },
  {
    id: 23,
    question: "Schema in Mongoose defines?",
    options: [
      "UI structure",
      "Database structure",
      "Routes",
      "Controllers"
    ],
    correctAnswer: "Database structure"
  },
  {
    id: 24,
    question: "Model in Mongoose represents?",
    options: [
      "Collection",
      "Schema",
      "Document",
      "Database"
    ],
    correctAnswer: "Collection"
  },
  {
    id: 25,
    question: "Which keyword makes field mandatory in schema?",
    options: ["required", "mandatory", "must", "validate"],
    correctAnswer: "required"
  },

  {
    id: 26,
    question: "Which package handles environment variables?",
    options: ["cors", "dotenv", "axios", "nodemon"],
    correctAnswer: "dotenv"
  },
  {
    id: 27,
    question: "Which tool auto-restarts Node server?",
    options: ["npm", "nodemon", "webpack", "pm2"],
    correctAnswer: "nodemon"
  },
  {
    id: 28,
    question: "CORS stands for?",
    options: [
      "Cross Origin Resource Sharing",
      "Cross Origin Routing System",
      "Client Origin Response System",
      "Central Origin Request Service"
    ],
    correctAnswer: "Cross Origin Resource Sharing"
  },
  {
    id: 29,
    question: "Why is CORS needed?",
    options: [
      "Security",
      "Allow cross-origin requests",
      "Performance",
      "Database access"
    ],
    correctAnswer: "Allow cross-origin requests"
  },
  {
    id: 30,
    question: "Which library is commonly used for API calls in React?",
    options: ["mongoose", "axios", "cors", "express"],
    correctAnswer: "axios"
  },

  {
    id: 31,
    question: "Where should API calls be made in React?",
    options: ["Constructor", "useEffect", "render()", "CSS file"],
    correctAnswer: "useEffect"
  },
  {
    id: 32,
    question: "What is JWT?",
    options: [
      "Java Web Token",
      "JSON Web Token",
      "JavaScript Web Tool",
      "JSON Wide Token"
    ],
    correctAnswer: "JSON Web Token"
  },
  {
    id: 33,
    question: "JWT is mainly used for?",
    options: [
      "Styling",
      "Authentication",
      "Routing",
      "Database storage"
    ],
    correctAnswer: "Authentication"
  },
  {
    id: 34,
    question: "JWT contains?",
    options: ["Header", "Payload", "Signature", "All of these"],
    correctAnswer: "All of these"
  },
  {
    id: 35,
    question: "Where is JWT usually stored on client?",
    options: ["Session", "Cookie or LocalStorage", "Database", "Redux only"],
    correctAnswer: "Cookie or LocalStorage"
  },

  {
    id: 36,
    question: "Which middleware verifies JWT?",
    options: ["bcrypt", "jsonwebtoken", "cors", "axios"],
    correctAnswer: "jsonwebtoken"
  },
  {
    id: 37,
    question: "bcrypt is used for?",
    options: [
      "Token creation",
      "Password hashing",
      "API calls",
      "Session storage"
    ],
    correctAnswer: "Password hashing"
  },
  {
    id: 38,
    question: "Hashing passwords is important for?",
    options: ["Performance", "Security", "Speed", "Design"],
    correctAnswer: "Security"
  },
  {
    id: 39,
    question: "Which HTTP header carries token?",
    options: ["Authorization", "Content-Type", "Accept", "Host"],
    correctAnswer: "Authorization"
  },
  {
    id: 40,
    question: "Bearer token is sent in?",
    options: ["Body", "Params", "Headers", "Cookies only"],
    correctAnswer: "Headers"
  },

  {
    id: 41,
    question: "MVC architecture stands for?",
    options: [
      "Model View Controller",
      "Module View Component",
      "Model Variable Control",
      "Main View Code"
    ],
    correctAnswer: "Model View Controller"
  },
  {
    id: 42,
    question: "In MERN, controllers handle?",
    options: [
      "Business logic",
      "Database only",
      "UI only",
      "Routing only"
    ],
    correctAnswer: "Business logic"
  },
  {
    id: 43,
    question: "Routes define?",
    options: [
      "API endpoints",
      "Database schema",
      "UI layout",
      "State"
    ],
    correctAnswer: "API endpoints"
  },
  {
    id: 44,
    question: "Which tool manages global state in React apps?",
    options: ["Redux", "Axios", "Express", "MongoDB"],
    correctAnswer: "Redux"
  },
  {
    id: 45,
    question: "Redux follows which principle?",
    options: [
      "Single source of truth",
      "Multiple stores",
      "Mutable state",
      "Class based state"
    ],
    correctAnswer: "Single source of truth"
  },

  {
    id: 46,
    question: "Which hook accesses Redux store?",
    options: ["useStore", "useSelector", "useContext", "useState"],
    correctAnswer: "useSelector"
  },
  {
    id: 47,
    question: "Which hook dispatches actions?",
    options: ["useDispatch", "useSelector", "useEffect", "useReducer"],
    correctAnswer: "useDispatch"
  },
  {
    id: 48,
    question: "Which environment is Node.js single-threaded?",
    options: ["Blocking", "Event-driven", "Synchronous", "Multi-threaded"],
    correctAnswer: "Event-driven"
  },
  {
    id: 49,
    question: "Node.js handles multiple requests using?",
    options: ["Threads", "Event loop", "Processes", "Workers only"],
    correctAnswer: "Event loop"
  },
  {
    id: 50,
    question: "Which module handles file system in Node?",
    options: ["http", "fs", "path", "os"],
    correctAnswer: "fs"
  },

  {
    id: 51,
    question: "What is API?",
    options: [
      "Application Programming Interface",
      "Advanced Program Interface",
      "Application Process Integration",
      "Applied Programming Input"
    ],
    correctAnswer: "Application Programming Interface"
  },
  {
    id: 52,
    question: "Which HTTP status code is client error?",
    options: ["200", "300", "400", "500"],
    correctAnswer: "400"
  },
  {
    id: 53,
    question: "Which status code is server error?",
    options: ["200", "300", "400", "500"],
    correctAnswer: "500"
  },
  {
    id: 54,
    question: "Which database is commonly used with MERN?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    correctAnswer: "MongoDB"
  },
  {
    id: 55,
    question: "Which API testing tool is popular?",
    options: ["Postman", "Figma", "VS Code", "Chrome"],
    correctAnswer: "Postman"
  },

  {
    id: 56,
    question: "Which hook is used for form handling?",
    options: ["useState", "useEffect", "useRef", "useContext"],
    correctAnswer: "useState"
  },
  {
    id: 57,
    question: "Controlled components mean?",
    options: [
      "DOM controls input",
      "React controls input value",
      "Inputs are read-only",
      "CSS controlled"
    ],
    correctAnswer: "React controls input value"
  },
  {
    id: 58,
    question: "Which approach improves scalability?",
    options: ["Monolith", "MVC structure", "Single file", "Inline logic"],
    correctAnswer: "MVC structure"
  },
  {
    id: 59,
    question: "Which command installs dependencies?",
    options: ["node install", "npm start", "npm install", "npm run dev"],
    correctAnswer: "npm install"
  },
  {
    id: 60,
    question: "Which file stores environment variables?",
    options: [".env", "config.js", "package.json", "env.json"],
    correctAnswer: ".env"
  },

  {
    id: 61,
    question: "Which deployment platform is popular for MERN?",
    options: ["Netlify", "Vercel", "Render", "All of these"],
    correctAnswer: "All of these"
  },
  {
    id: 62,
    question: "Which service is used for image upload?",
    options: ["AWS S3", "Cloudinary", "Firebase", "All of these"],
    correctAnswer: "All of these"
  },
  {
    id: 63,
    question: "Which tool bundles React code?",
    options: ["Webpack", "Babel", "ESLint", "Nodemon"],
    correctAnswer: "Webpack"
  },
  {
    id: 64,
    question: "Babel is used for?",
    options: [
      "Transpiling JS",
      "Bundling code",
      "Styling",
      "API testing"
    ],
    correctAnswer: "Transpiling JS"
  },
  {
    id: 65,
    question: "What is production build command?",
    options: ["npm start", "npm run build", "npm install", "node build"],
    correctAnswer: "npm run build"
  },

  {
    id: 66,
    question: "Which security practice prevents XSS?",
    options: ["Input validation", "Password hashing", "CORS", "JWT"],
    correctAnswer: "Input validation"
  },
  {
    id: 67,
    question: "Which security practice prevents SQL injection?",
    options: ["Prepared queries", "JWT", "CORS", "Redux"],
    correctAnswer: "Prepared queries"
  },
  {
    id: 68,
    question: "Which attack uses stolen tokens?",
    options: ["XSS", "CSRF", "Man-in-the-middle", "Replay"],
    correctAnswer: "CSRF"
  },
  {
    id: 69,
    question: "CSRF protection uses?",
    options: ["Tokens", "Encryption", "Hashing", "CORS only"],
    correctAnswer: "Tokens"
  },
  {
    id: 70,
    question: "HTTPS provides?",
    options: ["Encryption", "Authentication", "Integrity", "All of these"],
    correctAnswer: "All of these"
  },

  {
    id: 71,
    question: "What is Monorepo?",
    options: [
      "Single repository for frontend and backend",
      "Multiple repos",
      "Single file",
      "Database only"
    ],
    correctAnswer: "Single repository for frontend and backend"
  },
  {
    id: 72,
    question: "Which tool manages packages?",
    options: ["npm", "git", "node", "express"],
    correctAnswer: "npm"
  },
  {
    id: 73,
    question: "Which version control system is used?",
    options: ["Git", "SVN", "Mercurial", "CVS"],
    correctAnswer: "Git"
  },
  {
    id: 74,
    question: "Which command uploads code to repo?",
    options: ["git push", "git pull", "git commit", "git add"],
    correctAnswer: "git push"
  },
  {
    id: 75,
    question: "Which branching strategy is common?",
    options: ["Git Flow", "Random", "Single branch", "No branches"],
    correctAnswer: "Git Flow"
  },

  {
    id: 76,
    question: "What is CI/CD?",
    options: [
      "Continuous Integration / Continuous Deployment",
      "Code Integration / Code Deployment",
      "Continuous Internet Delivery",
      "Central Integration Data"
    ],
    correctAnswer: "Continuous Integration / Continuous Deployment"
  },
  {
    id: 77,
    question: "CI ensures?",
    options: [
      "Code builds automatically",
      "Manual testing",
      "Manual deployment",
      "Design changes"
    ],
    correctAnswer: "Code builds automatically"
  },
  {
    id: 78,
    question: "CD ensures?",
    options: [
      "Automatic deployment",
      "Manual deploy",
      "Only testing",
      "Only build"
    ],
    correctAnswer: "Automatic deployment"
  },
  {
    id: 79,
    question: "Which platform supports CI/CD easily?",
    options: ["GitHub Actions", "Jenkins", "GitLab", "All of these"],
    correctAnswer: "All of these"
  },
  {
    id: 80,
    question: "MERN stack is best for?",
    options: [
      "Static websites",
      "Full-stack web applications",
      "Desktop apps",
      "Embedded systems"
    ],
    correctAnswer: "Full-stack web applications"
  }
];
  const currentLevelQuestions = useMemo(() => {
    const start = (currentLevel - 1) * QUESTIONS_PER_LEVEL;
    return questions.slice(start, start + QUESTIONS_PER_LEVEL);
  }, [currentLevel]);

  const handleOptionSelect = (qid, option) => {
    if (selectedAnswers[qid]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const levelScore = useMemo(() => {
    let correct = 0;
    let wrong = 0;

    currentLevelQuestions.forEach((q) => {
      if (!selectedAnswers[q.id]) return;
      selectedAnswers[q.id] === q.correctAnswer
        ? correct++
        : wrong++;
    });

    return {
      correct,
      wrong,
      attempted: correct + wrong,
      total: currentLevelQuestions.length
    };
  }, [selectedAnswers, currentLevelQuestions]);

  const isLevelCompleted =
    levelScore.attempted === QUESTIONS_PER_LEVEL;

  const getOptionClass = (q, opt) => {
    const selected = selectedAnswers[q.id];
    if (!selected) return "mcq-option";
    if (opt === q.correctAnswer) return "mcq-option correct";
    if (opt === selected) return "mcq-option wrong";
    return "mcq-option disabled";
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-header">
        <h2>📘 MERN Stack MCQ – Level {currentLevel}</h2>
        <p>
          Level {currentLevel} of {TOTAL_LEVELS} • {QUESTIONS_PER_LEVEL} Questions
        </p>
      </div>

      {currentLevelQuestions.map((q) => (
        <div key={q.id} className="question-card">
          <h4>{q.id}. {q.question}</h4>

          <div className="options-grid">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className={getOptionClass(q, opt)}
                onClick={() => handleOptionSelect(q.id, opt)}
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={selectedAnswers[q.id] === opt}
                  readOnly
                />
                <span className="radio-ui" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
<div className="submit-wrapper sticky-submit">
  <button
    className="submit-btn"
    onClick={() => setShowSummary(true)}
  >
    Submit Answers
  </button>
</div>

      {/* ===================== MODAL ===================== */}
      {showSummary && (
        <div className="modal-overlay">
          <div className="modal-card">
            <FaCheckCircle className="modal-icon" />
            <h3>Level {currentLevel} Completed</h3>

            <p className="modal-score">
  Attempted: <b>{levelScore.attempted}</b> / {QUESTIONS_PER_LEVEL}
  <br />
  Correct: <b>{levelScore.correct}</b>
</p>

            <div className="modal-actions">
              <button
                className="modal-btn home"
                onClick={() => window.location.href = "/jobPrep"}
              >
                <FaHome /> Home
              </button>

              <button
                className="modal-btn next"
                onClick={() => {
                  setShowSummary(false);
                  setCurrentLevel((prev) => prev + 1);
                }}
              >
                Next Level <FaArrowRight />
              </button>
            </div>

            <button
              className="modal-close"
              onClick={() => setShowSummary(false)}
            >
              <FaTimesCircle />
            </button>
          </div>
        </div>
      )}

      <style>{`
/* ===================== GLOBAL ===================== */
body {
  background: #f4f6fb;
}

.quiz-wrapper {
  max-width: 900px;
  margin: auto;
  padding: 30px 16px 80px;
  font-family: "Segoe UI", system-ui, -apple-system;
}

/* ===================== HEADER ===================== */
.quiz-header {
  background: linear-gradient(135deg, #0d6efd, #6610f2);
  color: white;
  padding: 28px;
  border-radius: 18px;
  margin-bottom: 30px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.quiz-header h2 {
  margin: 0;
  font-weight: 700;
}

.quiz-header p {
  opacity: 0.9;
  margin-top: 6px;
}

/* ===================== QUESTION CARD ===================== */
.question-card {
  background: white;
  border-radius: 16px;
  padding: 22px;
  margin-bottom: 18px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.question-card h4 {
  margin-bottom: 14px;
  color: #1f2937;
  font-weight: 700;
}

/* ===================== OPTIONS ===================== */
.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.mcq-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.25s ease;
  background: #fafafa;
}

.mcq-option:hover {
  border-color: #0d6efd;
  transform: translateY(-2px);
}

.mcq-option input {
  display: none;
}

.radio-ui {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid #9ca3af;
  position: relative;
}

.radio-ui::after {
  content: "";
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

/* ---------- OPTION STATES ---------- */
.mcq-option.correct {
  background: #e8f8ee;
  border-color: #198754;
  color: #198754;
}

.mcq-option.correct .radio-ui {
  border-color: #198754;
}

.mcq-option.correct .radio-ui::after {
  background: #198754;
  opacity: 1;
}

.mcq-option.wrong {
  background: #fdecea;
  border-color: #dc3545;
  color: #dc3545;
}

.mcq-option.wrong .radio-ui {
  border-color: #dc3545;
}

.mcq-option.wrong .radio-ui::after {
  background: #dc3545;
  opacity: 1;
}

.mcq-option.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.option-text {
  font-weight: 600;
}

/* ===================== SUBMIT BUTTON ===================== */
/* ===================== STICKY SUBMIT ===================== */
.sticky-submit {
  position: sticky;
  bottom: 0;
  z-index: 50;
  background: linear-gradient(
    to top,
    rgba(244,246,251,0.98),
    rgba(244,246,251,0.85),
    transparent
  );
  padding: 18px 0 12px;
  margin-top: 40px;
}

.submit-wrapper {
  display: flex;
  justify-content: center;
}

/* Button */
.submit-btn {
  padding: 14px 34px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 8px 20px rgba(34,197,94,0.35);
  transition: all 0.25s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(34,197,94,0.45);
}

/* Mobile */
@media (max-width: 480px) {
  .submit-btn {
    width: 92%;
    max-width: 360px;
  }
}

/* ===================== MOBILE TWEAK ===================== */
@media (max-width: 480px) {
  .submit-btn {
    width: 92%;
    max-width: 360px;
  }
}

/* ===================== MODAL OVERLAY ===================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(6px);
  padding: 16px;
}

/* ===================== MODAL CARD ===================== */
.modal-card {
  background: white;
  padding: 30px 26px 28px;
  border-radius: 24px;
  text-align: center;
  width: 100%;
  max-width: 420px;
  position: relative;
  animation: popup 0.35s ease;
}

.modal-icon {
  font-size: 58px;
  color: #22c55e;
  margin-bottom: 10px;
}

.modal-card h3 {
  margin: 10px 0;
  font-weight: 800;
  color: #111827;
}

.modal-score {
  font-size: 18px;
  margin: 14px 0 26px;
  color: #374151;
}

/* ===================== MODAL BUTTONS ===================== */
.modal-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

.modal-btn {
  padding: 12px 22px;
  border-radius: 30px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s ease;
}

.modal-btn.home {
  background: #e5e7eb;
  color: #111827;
}

.modal-btn.home:hover {
  background: #d1d5db;
}

.modal-btn.next {
  background: #4f46e5;
  color: white;
}

.modal-btn.next:hover {
  background: #4338ca;
}

/* ===================== CLOSE BUTTON ===================== */
.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #9ca3af;
}

.modal-close:hover {
  color: #374151;
}

/* ===================== ANIMATION ===================== */
@keyframes popup {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 768px) {
  .quiz-header {
    padding: 22px;
  }

  .question-card {
    padding: 18px;
  }
}

@media (max-width: 480px) {
  .modal-card {
    padding: 22px 18px;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-btn {
    width: 100%;
    justify-content: center;
  }
}
`}</style>

    </div>
  );
};

export default Mern;
