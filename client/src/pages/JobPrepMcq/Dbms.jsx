import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaTimesCircle
} from "react-icons/fa";

const QUESTIONS_PER_LEVEL = 20;
const TOTAL_LEVELS = 4;

const Dbms = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

const questions = [
  {
    id: 1,
    question: "What does DBMS stand for?",
    options: [
      "Database Management System",
      "Data Backup Management System",
      "Database Modeling System",
      "Data Migration Software"
    ],
    correctAnswer: "Database Management System"
  },
  {
    id: 2,
    question: "What is a database?",
    options: [
      "A collection of programs",
      "A collection of tables",
      "An organized collection of data",
      "A programming language"
    ],
    correctAnswer: "An organized collection of data"
  },
  {
    id: 3,
    question: "Which of the following is NOT a DBMS?",
    options: ["MySQL", "Oracle", "MongoDB", "C++"],
    correctAnswer: "C++"
  },
  {
    id: 4,
    question: "Which model stores data in tables?",
    options: ["Hierarchical", "Network", "Relational", "Object-oriented"],
    correctAnswer: "Relational"
  },
  {
    id: 5,
    question: "What is a table in DBMS?",
    options: [
      "Collection of rows and columns",
      "Collection of files",
      "Collection of queries",
      "Collection of keys"
    ],
    correctAnswer: "Collection of rows and columns"
  },

  {
    id: 6,
    question: "What is a row in a table called?",
    options: ["Field", "Record", "Column", "Schema"],
    correctAnswer: "Record"
  },
  {
    id: 7,
    question: "What is a column in a table called?",
    options: ["Record", "Tuple", "Field", "Index"],
    correctAnswer: "Field"
  },
  {
    id: 8,
    question: "What uniquely identifies a record in a table?",
    options: ["Foreign key", "Primary key", "Candidate key", "Composite key"],
    correctAnswer: "Primary key"
  },
  {
    id: 9,
    question: "Can a primary key have NULL values?",
    options: ["Yes", "No", "Sometimes", "Depends"],
    correctAnswer: "No"
  },
  {
    id: 10,
    question: "Which key references a primary key of another table?",
    options: ["Primary key", "Candidate key", "Foreign key", "Alternate key"],
    correctAnswer: "Foreign key"
  },

  {
    id: 11,
    question: "What is SQL?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Sequential Query Language",
      "Standard Query Language"
    ],
    correctAnswer: "Structured Query Language"
  },
  {
    id: 12,
    question: "SQL is used to?",
    options: [
      "Design UI",
      "Manage databases",
      "Write backend code",
      "Create servers"
    ],
    correctAnswer: "Manage databases"
  },
  {
    id: 13,
    question: "Which SQL statement is used to fetch data?",
    options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
    correctAnswer: "SELECT"
  },
  {
    id: 14,
    question: "Which SQL clause is used to filter records?",
    options: ["WHERE", "FROM", "SELECT", "ORDER BY"],
    correctAnswer: "WHERE"
  },
  {
    id: 15,
    question: "Which keyword sorts result set?",
    options: ["SORT BY", "ORDER BY", "GROUP BY", "FILTER"],
    correctAnswer: "ORDER BY"
  },

  {
    id: 16,
    question: "Which SQL statement is used to insert data?",
    options: ["ADD", "INSERT INTO", "UPDATE", "PUT"],
    correctAnswer: "INSERT INTO"
  },
  {
    id: 17,
    question: "Which SQL statement updates existing data?",
    options: ["MODIFY", "INSERT", "UPDATE", "CHANGE"],
    correctAnswer: "UPDATE"
  },
  {
    id: 18,
    question: "Which SQL statement deletes records?",
    options: ["REMOVE", "DROP", "DELETE", "TRUNCATE"],
    correctAnswer: "DELETE"
  },
  {
    id: 19,
    question: "Which command removes all records but keeps table?",
    options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
    correctAnswer: "TRUNCATE"
  },
  {
    id: 20,
    question: "Which command removes table completely?",
    options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"],
    correctAnswer: "DROP"
  },

  {
    id: 21,
    question: "What is normalization?",
    options: [
      "Removing redundancy",
      "Adding data",
      "Sorting tables",
      "Creating indexes"
    ],
    correctAnswer: "Removing redundancy"
  },
  {
    id: 22,
    question: "Which is the first normal form?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: "1NF"
  },
  {
    id: 23,
    question: "1NF ensures?",
    options: [
      "No partial dependency",
      "No transitive dependency",
      "Atomic values",
      "No redundancy"
    ],
    correctAnswer: "Atomic values"
  },
  {
    id: 24,
    question: "2NF removes?",
    options: [
      "Transitive dependency",
      "Partial dependency",
      "Duplicate data",
      "Null values"
    ],
    correctAnswer: "Partial dependency"
  },
  {
    id: 25,
    question: "3NF removes?",
    options: [
      "Partial dependency",
      "Transitive dependency",
      "Atomicity",
      "Primary key"
    ],
    correctAnswer: "Transitive dependency"
  },

  {
    id: 26,
    question: "What is a candidate key?",
    options: [
      "Primary key only",
      "Any unique key",
      "Foreign key",
      "Composite key"
    ],
    correctAnswer: "Any unique key"
  },
  {
    id: 27,
    question: "Which key is selected as primary key?",
    options: ["Foreign key", "Candidate key", "Alternate key", "Composite key"],
    correctAnswer: "Candidate key"
  },
  {
    id: 28,
    question: "What is an alternate key?",
    options: [
      "Primary key",
      "Foreign key",
      "Candidate key not chosen as primary",
      "Composite key"
    ],
    correctAnswer: "Candidate key not chosen as primary"
  },
  {
    id: 29,
    question: "What is a composite key?",
    options: [
      "Single column key",
      "Multiple column key",
      "Foreign key",
      "Unique key"
    ],
    correctAnswer: "Multiple column key"
  },
  {
    id: 30,
    question: "What is a schema?",
    options: [
      "Database structure",
      "Table data",
      "SQL query",
      "Index"
    ],
    correctAnswer: "Database structure"
  },

  {
    id: 31,
    question: "Which SQL clause groups rows?",
    options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"],
    correctAnswer: "GROUP BY"
  },
  {
    id: 32,
    question: "HAVING clause is used with?",
    options: ["WHERE", "GROUP BY", "ORDER BY", "SELECT"],
    correctAnswer: "GROUP BY"
  },
  {
    id: 33,
    question: "WHERE clause filters?",
    options: ["Groups", "Rows", "Tables", "Columns"],
    correctAnswer: "Rows"
  },
  {
    id: 34,
    question: "HAVING clause filters?",
    options: ["Rows", "Columns", "Groups", "Tables"],
    correctAnswer: "Groups"
  },
  {
    id: 35,
    question: "Which function counts rows?",
    options: ["SUM()", "COUNT()", "AVG()", "MAX()"],
    correctAnswer: "COUNT()"
  },

  {
    id: 36,
    question: "Which function returns average value?",
    options: ["SUM()", "COUNT()", "AVG()", "MIN()"],
    correctAnswer: "AVG()"
  },
  {
    id: 37,
    question: "Which function returns highest value?",
    options: ["MIN()", "MAX()", "SUM()", "COUNT()"],
    correctAnswer: "MAX()"
  },
  {
    id: 38,
    question: "Which function returns lowest value?",
    options: ["MIN()", "MAX()", "COUNT()", "AVG()"],
    correctAnswer: "MIN()"
  },
  {
    id: 39,
    question: "What is an index?",
    options: [
      "Speeds up data retrieval",
      "Stores data",
      "Deletes data",
      "Updates data"
    ],
    correctAnswer: "Speeds up data retrieval"
  },
  {
    id: 40,
    question: "Index improves?",
    options: ["Insertion", "Deletion", "Search performance", "Storage"],
    correctAnswer: "Search performance"
  },

  {
    id: 41,
    question: "What is a view?",
    options: [
      "Virtual table",
      "Physical table",
      "Index",
      "Schema"
    ],
    correctAnswer: "Virtual table"
  },
  {
    id: 42,
    question: "View stores data?",
    options: ["Yes", "No", "Sometimes", "Depends"],
    correctAnswer: "No"
  },
  {
    id: 43,
    question: "What is a join?",
    options: [
      "Combine tables",
      "Split table",
      "Delete table",
      "Create table"
    ],
    correctAnswer: "Combine tables"
  },
  {
    id: 44,
    question: "Which join returns matching records?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
    correctAnswer: "INNER JOIN"
  },
  {
    id: 45,
    question: "LEFT JOIN returns?",
    options: [
      "Only right table rows",
      "Matching rows only",
      "All left + matching right",
      "All rows"
    ],
    correctAnswer: "All left + matching right"
  },

  {
    id: 46,
    question: "RIGHT JOIN returns?",
    options: [
      "All left rows",
      "All right + matching left",
      "Matching rows",
      "No rows"
    ],
    correctAnswer: "All right + matching left"
  },
  {
    id: 47,
    question: "FULL JOIN returns?",
    options: [
      "Only matching rows",
      "All rows from both tables",
      "Left only",
      "Right only"
    ],
    correctAnswer: "All rows from both tables"
  },
  {
    id: 48,
    question: "Which join has no condition?",
    options: ["INNER JOIN", "EQUI JOIN", "CROSS JOIN", "LEFT JOIN"],
    correctAnswer: "CROSS JOIN"
  },
  {
    id: 49,
    question: "What is transaction?",
    options: [
      "Single logical unit of work",
      "Multiple queries",
      "Single table",
      "Index"
    ],
    correctAnswer: "Single logical unit of work"
  },
  {
    id: 50,
    question: "ACID stands for?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Consistency, Isolation, Durability",
      "Atomicity, Control, Isolation, Data",
      "Access, Control, Integrity, Data"
    ],
    correctAnswer: "Atomicity, Consistency, Isolation, Durability"
  },

  {
    id: 51,
    question: "Which property ensures all or nothing?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: "Atomicity"
  },
  {
    id: 52,
    question: "Consistency ensures?",
    options: [
      "Valid state",
      "Speed",
      "Isolation",
      "Backup"
    ],
    correctAnswer: "Valid state"
  },
  {
    id: 53,
    question: "Isolation ensures?",
    options: [
      "Concurrent transactions do not affect",
      "Data duplication",
      "High speed",
      "Backup"
    ],
    correctAnswer: "Concurrent transactions do not affect"
  },
  {
    id: 54,
    question: "Durability ensures?",
    options: [
      "Permanent commit",
      "Rollback",
      "Concurrency",
      "Security"
    ],
    correctAnswer: "Permanent commit"
  },
  {
    id: 55,
    question: "What is rollback?",
    options: [
      "Undo transaction",
      "Save data",
      "Delete table",
      "Commit data"
    ],
    correctAnswer: "Undo transaction"
  },

  {
    id: 56,
    question: "What is commit?",
    options: [
      "Undo changes",
      "Save changes permanently",
      "Delete changes",
      "Backup data"
    ],
    correctAnswer: "Save changes permanently"
  },
  {
    id: 57,
    question: "Which SQL command controls transactions?",
    options: ["DCL", "DDL", "DML", "TCL"],
    correctAnswer: "TCL"
  },
  {
    id: 58,
    question: "COMMIT belongs to?",
    options: ["DDL", "DML", "DCL", "TCL"],
    correctAnswer: "TCL"
  },
  {
    id: 59,
    question: "ROLLBACK belongs to?",
    options: ["DDL", "DML", "DCL", "TCL"],
    correctAnswer: "TCL"
  },
  {
    id: 60,
    question: "Which command saves transaction?",
    options: ["SAVEPOINT", "COMMIT", "ROLLBACK", "TRUNCATE"],
    correctAnswer: "COMMIT"
  },

  {
    id: 61,
    question: "What is DDL?",
    options: [
      "Data Definition Language",
      "Data Delete Language",
      "Data Display Language",
      "Data Debug Language"
    ],
    correctAnswer: "Data Definition Language"
  },
  {
    id: 62,
    question: "CREATE belongs to?",
    options: ["DDL", "DML", "DCL", "TCL"],
    correctAnswer: "DDL"
  },
  {
    id: 63,
    question: "ALTER belongs to?",
    options: ["DDL", "DML", "DCL", "TCL"],
    correctAnswer: "DDL"
  },
  {
    id: 64,
    question: "What is DML?",
    options: [
      "Data Manipulation Language",
      "Data Model Language",
      "Data Management Language",
      "Data Modify Logic"
    ],
    correctAnswer: "Data Manipulation Language"
  },
  {
    id: 65,
    question: "INSERT belongs to?",
    options: ["DDL", "DML", "DCL", "TCL"],
    correctAnswer: "DML"
  },

  {
    id: 66,
    question: "UPDATE belongs to?",
    options: ["DDL", "DML", "DCL", "TCL"],
    correctAnswer: "DML"
  },
  {
    id: 67,
    question: "DELETE belongs to?",
    options: ["DDL", "DML", "DCL", "TCL"],
    correctAnswer: "DML"
  },
  {
    id: 68,
    question: "What is DCL?",
    options: [
      "Data Control Language",
      "Data Command Language",
      "Data Column Language",
      "Data Code Language"
    ],
    correctAnswer: "Data Control Language"
  },
  {
    id: 69,
    question: "GRANT command is used for?",
    options: [
      "Give permission",
      "Revoke permission",
      "Insert data",
      "Delete data"
    ],
    correctAnswer: "Give permission"
  },
  {
    id: 70,
    question: "REVOKE command is used for?",
    options: [
      "Give permission",
      "Remove permission",
      "Insert data",
      "Update data"
    ],
    correctAnswer: "Remove permission"
  },

  {
    id: 71,
    question: "What is NULL?",
    options: [
      "Zero value",
      "Empty string",
      "Unknown value",
      "False value"
    ],
    correctAnswer: "Unknown value"
  },
  {
    id: 72,
    question: "NULL is same as 0?",
    options: ["Yes", "No", "Sometimes", "Depends"],
    correctAnswer: "No"
  },
  {
    id: 73,
    question: "Which operator checks NULL?",
    options: ["=", "IS NULL", "LIKE", "BETWEEN"],
    correctAnswer: "IS NULL"
  },
  {
    id: 74,
    question: "Which operator checks range?",
    options: ["IN", "LIKE", "BETWEEN", "EXISTS"],
    correctAnswer: "BETWEEN"
  },
  {
    id: 75,
    question: "LIKE operator is used for?",
    options: [
      "Exact match",
      "Pattern matching",
      "Range check",
      "Null check"
    ],
    correctAnswer: "Pattern matching"
  },

  {
    id: 76,
    question: "Wildcard % represents?",
    options: [
      "Single character",
      "Multiple characters",
      "No character",
      "Number"
    ],
    correctAnswer: "Multiple characters"
  },
  {
    id: 77,
    question: "Wildcard _ represents?",
    options: [
      "Multiple characters",
      "Single character",
      "Number",
      "Space"
    ],
    correctAnswer: "Single character"
  },
  {
    id: 78,
    question: "What is subquery?",
    options: [
      "Query inside another query",
      "Main query",
      "Join query",
      "View query"
    ],
    correctAnswer: "Query inside another query"
  },
  {
    id: 79,
    question: "Which subquery returns single value?",
    options: [
      "Scalar subquery",
      "Correlated subquery",
      "Nested subquery",
      "Multi-row subquery"
    ],
    correctAnswer: "Scalar subquery"
  },
  {
    id: 80,
    question: "Which DBMS is used for relational data?",
    options: ["MySQL", "MongoDB", "Redis", "Cassandra"],
    correctAnswer: "MySQL"
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
        <h2>📘 Data Base & SQL MCQ – Level {currentLevel}</h2>
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

export default Dbms;
