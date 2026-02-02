import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaTimesCircle
} from "react-icons/fa";

const QUESTIONS_PER_LEVEL = 20;
const TOTAL_LEVELS = 4;

const ReactJs = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  
const questions = [
  {
    id: 1,
    question: "What is React?",
    options: [
      "A database",
      "A JavaScript library for building UI",
      "A backend framework",
      "A programming language"
    ],
    correctAnswer: "A JavaScript library for building UI"
  },
  {
    id: 2,
    question: "Who developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    correctAnswer: "Facebook"
  },
  {
    id: 3,
    question: "React is mainly used for?",
    options: ["Database management", "Styling", "Building user interfaces", "Server configuration"],
    correctAnswer: "Building user interfaces"
  },
  {
    id: 4,
    question: "What is JSX?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "Java XML"
    ],
    correctAnswer: "JavaScript XML"
  },
  {
    id: 5,
    question: "JSX allows us to write ___ inside JavaScript.",
    options: ["HTML", "CSS", "SQL", "XML only"],
    correctAnswer: "HTML"
  },

  {
    id: 6,
    question: "Which command is used to create a React app?",
    options: [
      "npm create react-app",
      "npx create-react-app",
      "npm install react",
      "react-new-app"
    ],
    correctAnswer: "npx create-react-app"
  },
  {
    id: 7,
    question: "Which file is the entry point of a React app?",
    options: ["App.js", "index.js", "main.js", "package.json"],
    correctAnswer: "index.js"
  },
  {
    id: 8,
    question: "What is a component in React?",
    options: [
      "A function or class that returns UI",
      "A database table",
      "A CSS file",
      "An API"
    ],
    correctAnswer: "A function or class that returns UI"
  },
  {
    id: 9,
    question: "Which type of components are most used today?",
    options: ["Class components", "Functional components", "Pure components", "HOC"],
    correctAnswer: "Functional components"
  },
  {
    id: 10,
    question: "Which hook is used to manage state?",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    correctAnswer: "useState"
  },

  {
    id: 11,
    question: "What does useState return?",
    options: [
      "Only state value",
      "Only setter function",
      "State and setter function",
      "Nothing"
    ],
    correctAnswer: "State and setter function"
  },
  {
    id: 12,
    question: "Which hook is used for side effects?",
    options: ["useState", "useMemo", "useEffect", "useContext"],
    correctAnswer: "useEffect"
  },
  {
    id: 13,
    question: "useEffect runs after?",
    options: [
      "Before render",
      "During render",
      "After render",
      "Before state update"
    ],
    correctAnswer: "After render"
  },
  {
    id: 14,
    question: "Which dependency array makes useEffect run once?",
    options: ["No array", "Empty array []", "With state", "With props"],
    correctAnswer: "Empty array []"
  },
  {
    id: 15,
    question: "Props are?",
    options: [
      "Mutable",
      "Read-only",
      "State variables",
      "Functions only"
    ],
    correctAnswer: "Read-only"
  },

  {
    id: 16,
    question: "Props are used to?",
    options: [
      "Store component data",
      "Pass data to components",
      "Update state",
      "Call hooks"
    ],
    correctAnswer: "Pass data to components"
  },
  {
    id: 17,
    question: "State is?",
    options: [
      "Read-only",
      "Immutable",
      "Mutable",
      "Passed from parent"
    ],
    correctAnswer: "Mutable"
  },
  {
    id: 18,
    question: "Which hook shares data without props drilling?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: "useContext"
  },
  {
    id: 19,
    question: "What is Virtual DOM?",
    options: [
      "Real DOM copy",
      "Lightweight copy of real DOM",
      "Browser DOM",
      "HTML template"
    ],
    correctAnswer: "Lightweight copy of real DOM"
  },
  {
    id: 20,
    question: "Why does React use Virtual DOM?",
    options: [
      "Security",
      "Faster UI updates",
      "Memory storage",
      "Server rendering"
    ],
    correctAnswer: "Faster UI updates"
  },

  {
    id: 21,
    question: "What is reconciliation?",
    options: [
      "Updating state",
      "Comparing Virtual DOM with Real DOM",
      "Rendering JSX",
      "Unmounting component"
    ],
    correctAnswer: "Comparing Virtual DOM with Real DOM"
  },
  {
    id: 22,
    question: "Key prop is used for?",
    options: [
      "Styling",
      "Routing",
      "Identifying list items",
      "State management"
    ],
    correctAnswer: "Identifying list items"
  },
  {
    id: 23,
    question: "Keys should be?",
    options: [
      "Indexes",
      "Random numbers",
      "Unique and stable",
      "Optional"
    ],
    correctAnswer: "Unique and stable"
  },
  {
    id: 24,
    question: "Which method is used to render lists?",
    options: ["for loop", "map()", "filter()", "reduce()"],
    correctAnswer: "map()"
  },
  {
    id: 25,
    question: "Which hook is used for complex state logic?",
    options: ["useState", "useReducer", "useEffect", "useRef"],
    correctAnswer: "useReducer"
  },

  {
    id: 26,
    question: "What is useRef mainly used for?",
    options: [
      "State update",
      "DOM access",
      "Side effects",
      "API calls"
    ],
    correctAnswer: "DOM access"
  },
  {
    id: 27,
    question: "useRef value persists between renders?",
    options: ["Yes", "No", "Sometimes", "Only once"],
    correctAnswer: "Yes"
  },
  {
    id: 28,
    question: "Which hook memoizes values?",
    options: ["useEffect", "useMemo", "useRef", "useContext"],
    correctAnswer: "useMemo"
  },
  {
    id: 29,
    question: "Which hook memoizes functions?",
    options: ["useCallback", "useEffect", "useReducer", "useMemo"],
    correctAnswer: "useCallback"
  },
  {
    id: 30,
    question: "Controlled components are?",
    options: [
      "Handled by DOM",
      "Handled by React state",
      "Stateless",
      "Read-only"
    ],
    correctAnswer: "Handled by React state"
  },

  {
    id: 31,
    question: "Uncontrolled components use?",
    options: ["State", "Props", "Refs", "Context"],
    correctAnswer: "Refs"
  },
  {
    id: 32,
    question: "What is lifting state up?",
    options: [
      "Moving state to child",
      "Moving state to parent",
      "Deleting state",
      "Copying state"
    ],
    correctAnswer: "Moving state to parent"
  },
  {
    id: 33,
    question: "Conditional rendering is done using?",
    options: [
      "if / else",
      "ternary operator",
      "logical &&",
      "All of these"
    ],
    correctAnswer: "All of these"
  },
  {
    id: 34,
    question: "Fragments are used to?",
    options: [
      "Add styling",
      "Wrap elements without extra DOM",
      "Manage state",
      "Create routes"
    ],
    correctAnswer: "Wrap elements without extra DOM"
  },
  {
    id: 35,
    question: "React.Fragment shorthand is?",
    options: ["[]", "<></>", "{}", "()"],
    correctAnswer: "<></>"
  },

  {
    id: 36,
    question: "What is prop drilling?",
    options: [
      "Passing props through many components",
      "Updating props",
      "Deleting props",
      "Cloning props"
    ],
    correctAnswer: "Passing props through many components"
  },
  {
    id: 37,
    question: "Which tool handles routing in React?",
    options: ["Redux", "Axios", "React Router", "Bootstrap"],
    correctAnswer: "React Router"
  },
  {
    id: 38,
    question: "Which component is used for routing?",
    options: ["<Link>", "<Route>", "<Nav>", "<RouterLink>"],
    correctAnswer: "<Route>"
  },
  {
    id: 39,
    question: "Which hook gives access to route params?",
    options: ["useParams", "useRoute", "useLocation", "useNavigate"],
    correctAnswer: "useParams"
  },
  {
    id: 40,
    question: "Which hook is used for navigation?",
    options: ["useHistory", "useNavigate", "useParams", "useLocation"],
    correctAnswer: "useNavigate"
  },

  {
    id: 41,
    question: "Axios is used for?",
    options: [
      "Routing",
      "Styling",
      "HTTP requests",
      "State management"
    ],
    correctAnswer: "HTTP requests"
  },
  {
    id: 42,
    question: "Which lifecycle hook replaces componentDidMount?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    correctAnswer: "useEffect"
  },
  {
    id: 43,
    question: "What is cleanup function in useEffect?",
    options: [
      "Runs before unmount",
      "Runs after render",
      "Runs on click",
      "Runs once"
    ],
    correctAnswer: "Runs before unmount"
  },
  {
    id: 44,
    question: "Higher Order Component is?",
    options: [
      "Component inside component",
      "Function that takes component and returns new component",
      "Child component",
      "Parent component"
    ],
    correctAnswer: "Function that takes component and returns new component"
  },
  {
    id: 45,
    question: "Custom hooks are?",
    options: [
      "Built-in hooks",
      "Reusable logic",
      "Libraries",
      "Components"
    ],
    correctAnswer: "Reusable logic"
  },

  {
    id: 46,
    question: "Redux is used for?",
    options: [
      "Routing",
      "Global state management",
      "Styling",
      "API calls"
    ],
    correctAnswer: "Global state management"
  },
  {
    id: 47,
    question: "Redux store holds?",
    options: ["Components", "State", "Props", "Reducers"],
    correctAnswer: "State"
  },
  {
    id: 48,
    question: "Reducer is a?",
    options: [
      "Function that returns new state",
      "Component",
      "Hook",
      "Middleware"
    ],
    correctAnswer: "Function that returns new state"
  },
  {
    id: 49,
    question: "Action contains?",
    options: ["type", "payload", "both", "none"],
    correctAnswer: "both"
  },
  {
    id: 50,
    question: "Which hook connects Redux to React?",
    options: ["useStore", "useDispatch", "useSelector", "Both useDispatch & useSelector"],
    correctAnswer: "Both useDispatch & useSelector"
  },

  {
    id: 51,
    question: "What is SPA?",
    options: [
      "Single Page Application",
      "Simple Page App",
      "Static Page App",
      "Server Page App"
    ],
    correctAnswer: "Single Page Application"
  },
  {
    id: 52,
    question: "React is?",
    options: [
      "Framework",
      "Library",
      "Language",
      "Database"
    ],
    correctAnswer: "Library"
  },
  {
    id: 53,
    question: "Which file defines dependencies?",
    options: ["index.js", "App.js", "package.json", "webpack.config.js"],
    correctAnswer: "package.json"
  },
  {
    id: 54,
    question: "npm stands for?",
    options: [
      "Node Package Manager",
      "New Package Module",
      "Node Program Manager",
      "Next Package Manager"
    ],
    correctAnswer: "Node Package Manager"
  },
  {
    id: 55,
    question: "Which command starts React app?",
    options: ["npm start", "npm run dev", "npm serve", "react start"],
    correctAnswer: "npm start"
  },

  {
    id: 56,
    question: "What is strict mode?",
    options: [
      "Checks code for potential problems",
      "Optimizes performance",
      "Builds app",
      "Runs tests"
    ],
    correctAnswer: "Checks code for potential problems"
  },
  {
    id: 57,
    question: "StrictMode runs effects how many times in dev?",
    options: ["Once", "Twice", "Never", "Random"],
    correctAnswer: "Twice"
  },
  {
    id: 58,
    question: "Error boundaries catch errors in?",
    options: [
      "Render phase",
      "Event handlers",
      "Hooks",
      "Async code"
    ],
    correctAnswer: "Render phase"
  },
  {
    id: 59,
    question: "React.memo is used for?",
    options: [
      "Routing",
      "Preventing re-renders",
      "State update",
      "Side effects"
    ],
    correctAnswer: "Preventing re-renders"
  },
  {
    id: 60,
    question: "Lazy loading improves?",
    options: [
      "SEO",
      "Performance",
      "Security",
      "Design"
    ],
    correctAnswer: "Performance"
  },

  {
    id: 61,
    question: "Suspense is used with?",
    options: ["useState", "useEffect", "React.lazy", "Redux"],
    correctAnswer: "React.lazy"
  },
  {
    id: 62,
    question: "What is hydration?",
    options: [
      "Client attaching events to server-rendered HTML",
      "Rendering JSX",
      "Fetching data",
      "Updating state"
    ],
    correctAnswer: "Client attaching events to server-rendered HTML"
  },
  {
    id: 63,
    question: "What is portal used for?",
    options: [
      "Routing",
      "Rendering outside root DOM",
      "State management",
      "API calls"
    ],
    correctAnswer: "Rendering outside root DOM"
  },
  {
    id: 64,
    question: "Which hook measures previous value?",
    options: ["useRef", "useState", "useMemo", "useEffect"],
    correctAnswer: "useRef"
  },
  {
    id: 65,
    question: "Which tool is used for styling in React?",
    options: ["CSS", "Styled-components", "Tailwind", "All of these"],
    correctAnswer: "All of these"
  },

  {
    id: 66,
    question: "What is immutability in React?",
    options: [
      "State cannot change directly",
      "State can mutate",
      "Props update",
      "Hooks rule"
    ],
    correctAnswer: "State cannot change directly"
  },
  {
    id: 67,
    question: "Which method updates state correctly?",
    options: ["state = value", "setState()", "this.state()", "updateState()"],
    correctAnswer: "setState()"
  },
  {
    id: 68,
    question: "Which hook replaces shouldComponentUpdate?",
    options: ["React.memo", "useEffect", "useReducer", "useCallback"],
    correctAnswer: "React.memo"
  },
  {
    id: 69,
    question: "What is batching?",
    options: [
      "Grouping state updates",
      "Grouping components",
      "Grouping hooks",
      "Grouping props"
    ],
    correctAnswer: "Grouping state updates"
  },
  {
    id: 70,
    question: "Which hook is best for async operations?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    correctAnswer: "useEffect"
  },

  {
    id: 71,
    question: "What is SSR?",
    options: [
      "Server Side Rendering",
      "Simple Server Rendering",
      "State Side Rendering",
      "Static Server Rendering"
    ],
    correctAnswer: "Server Side Rendering"
  },
  {
    id: 72,
    question: "Next.js is built on?",
    options: ["Vue", "Angular", "React", "Svelte"],
    correctAnswer: "React"
  },
  {
    id: 73,
    question: "CSR stands for?",
    options: [
      "Client Side Rendering",
      "Central Side Rendering",
      "Code Side Rendering",
      "Client Server Rendering"
    ],
    correctAnswer: "Client Side Rendering"
  },
  {
    id: 74,
    question: "Which improves SEO?",
    options: ["CSR", "SSR", "SPA", "Hooks"],
    correctAnswer: "SSR"
  },
  {
    id: 75,
    question: "Hydration happens in?",
    options: ["Server", "Client", "Database", "API"],
    correctAnswer: "Client"
  },

  {
    id: 76,
    question: "What is React DevTools?",
    options: [
      "Browser extension",
      "CLI tool",
      "Testing library",
      "Bundler"
    ],
    correctAnswer: "Browser extension"
  },
  {
    id: 77,
    question: "Which library is used for testing React?",
    options: ["Jest", "React Testing Library", "Enzyme", "All of these"],
    correctAnswer: "All of these"
  },
  {
    id: 78,
    question: "Which hook handles form inputs?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    correctAnswer: "useState"
  },
  {
    id: 79,
    question: "Which rule must hooks follow?",
    options: [
      "Call inside loops",
      "Call conditionally",
      "Call at top level",
      "Call anywhere"
    ],
    correctAnswer: "Call at top level"
  },
  {
    id: 80,
    question: "React follows which architecture?",
    options: ["MVC", "MVVM", "Component-based", "Layered"],
    correctAnswer: "Component-based"
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
        <h2>📘 React Js MCQ – Level {currentLevel}</h2>
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

export default ReactJs;
