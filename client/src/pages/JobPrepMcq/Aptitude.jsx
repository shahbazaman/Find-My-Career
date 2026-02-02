import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaTimesCircle
} from "react-icons/fa";

const QUESTIONS_PER_LEVEL = 20;
const TOTAL_LEVELS = 4;

const Aptitude = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const questions = [
  {
    id: 1,
    question: "What is the next number in the series: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "64"],
    correctAnswer: "32"
  },
  {
    id: 2,
    question: "If A = 1, B = 2, then Z = ?",
    options: ["24", "25", "26", "27"],
    correctAnswer: "26"
  },
  {
    id: 3,
    question: "What is 25% of 200?",
    options: ["25", "40", "50", "75"],
    correctAnswer: "50"
  },
  {
    id: 4,
    question: "If a train runs at 60 km/hr, how much distance will it cover in 2 hours?",
    options: ["60 km", "90 km", "120 km", "180 km"],
    correctAnswer: "120 km"
  },
  {
    id: 5,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    correctAnswer: "12"
  },

  {
    id: 6,
    question: "Which number is missing: 1, 4, 9, 16, ?",
    options: ["20", "24", "25", "36"],
    correctAnswer: "25"
  },
  {
    id: 7,
    question: "What is the average of first 5 natural numbers?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3"
  },
  {
    id: 8,
    question: "What is 15 × 4?",
    options: ["45", "50", "60", "65"],
    correctAnswer: "60"
  },
  {
    id: 9,
    question: "If the perimeter of a square is 40 cm, what is the length of one side?",
    options: ["5 cm", "8 cm", "10 cm", "12 cm"],
    correctAnswer: "10 cm"
  },
  {
    id: 10,
    question: "What is the value of 7²?",
    options: ["14", "21", "49", "77"],
    correctAnswer: "49"
  },

  {
    id: 11,
    question: "Which number is divisible by 3?",
    options: ["14", "21", "25", "32"],
    correctAnswer: "21"
  },
  {
    id: 12,
    question: "What is the LCM of 4 and 6?",
    options: ["6", "8", "12", "24"],
    correctAnswer: "12"
  },
  {
    id: 13,
    question: "What is the HCF of 12 and 18?",
    options: ["3", "6", "9", "12"],
    correctAnswer: "6"
  },
  {
    id: 14,
    question: "If x + 5 = 12, what is x?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    id: 15,
    question: "What is 60% of 150?",
    options: ["60", "75", "90", "120"],
    correctAnswer: "90"
  },

  {
    id: 16,
    question: "What comes next: A, C, E, G, ?",
    options: ["H", "I", "J", "K"],
    correctAnswer: "I"
  },
  {
    id: 17,
    question: "If today is Monday, what day will it be after 7 days?",
    options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
    correctAnswer: "Monday"
  },
  {
    id: 18,
    question: "What is the simple interest on Rs.1000 at 10% for 2 years?",
    options: ["100", "150", "200", "250"],
    correctAnswer: "200"
  },
  {
    id: 19,
    question: "Which one is an even number?",
    options: ["11", "13", "15", "18"],
    correctAnswer: "18"
  },
  {
    id: 20,
    question: "What is 100 divided by 4?",
    options: ["20", "25", "30", "40"],
    correctAnswer: "25"
  },

  {
    id: 21,
    question: "What is the next prime number after 7?",
    options: ["8", "9", "10", "11"],
    correctAnswer: "11"
  },
  {
    id: 22,
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6"
  },
  {
    id: 23,
    question: "What is the cube of 3?",
    options: ["6", "9", "27", "81"],
    correctAnswer: "27"
  },
  {
    id: 24,
    question: "If 5 pens cost Rs.25, what is the cost of 1 pen?",
    options: ["Rs.3", "Rs.4", "Rs.5", "Rs.6"],
    correctAnswer: "Rs.5"
  },
  {
    id: 25,
    question: "Which fraction is equal to 0.5?",
    options: ["1/3", "1/4", "1/2", "2/3"],
    correctAnswer: "1/2"
  },

  {
    id: 26,
    question: "What is the value of 9 × 9?",
    options: ["72", "81", "90", "99"],
    correctAnswer: "81"
  },
  {
    id: 27,
    question: "Which angle is 90 degrees?",
    options: ["Acute", "Obtuse", "Right", "Straight"],
    correctAnswer: "Right"
  },
  {
    id: 28,
    question: "What is the sum of angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    correctAnswer: "180°"
  },
  {
    id: 29,
    question: "What is 20% of 50?",
    options: ["5", "10", "15", "20"],
    correctAnswer: "10"
  },
  {
    id: 30,
    question: "Which number is a perfect square?",
    options: ["12", "15", "16", "20"],
    correctAnswer: "16"
  },

  {
    id: 31,
    question: "What is the ratio of 2:4 in simplest form?",
    options: ["1:4", "1:3", "1:2", "2:3"],
    correctAnswer: "1:2"
  },
  {
    id: 32,
    question: "What is the next number: 5, 10, 15, ?",
    options: ["18", "20", "25", "30"],
    correctAnswer: "20"
  },
  {
    id: 33,
    question: "How many minutes are there in 2 hours?",
    options: ["60", "90", "120", "150"],
    correctAnswer: "120"
  },
  {
    id: 34,
    question: "What is the value of π (approx)?",
    options: ["2.14", "3.14", "4.14", "5.14"],
    correctAnswer: "3.14"
  },
  {
    id: 35,
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2"
  },

  {
    id: 36,
    question: "What is 45 divided by 5?",
    options: ["5", "7", "9", "11"],
    correctAnswer: "9"
  },
  {
    id: 37,
    question: "Which month has 28 days?",
    options: ["February", "January", "All months", "Only leap year"],
    correctAnswer: "All months"
  },
  {
    id: 38,
    question: "If speed = distance / time, then distance = ?",
    options: ["speed × time", "speed / time", "time / speed", "speed + time"],
    correctAnswer: "speed × time"
  },
  {
    id: 39,
    question: "Which number is odd?",
    options: ["20", "22", "24", "27"],
    correctAnswer: "27"
  },
  {
    id: 40,
    question: "What is 3³?",
    options: ["6", "9", "27", "81"],
    correctAnswer: "27"
  },

  {
    id: 41,
    question: "What is the percentage equivalent of 1/4?",
    options: ["20%", "25%", "50%", "75%"],
    correctAnswer: "25%"
  },
  {
    id: 42,
    question: "If a car travels 100 km in 2 hours, what is its speed?",
    options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
    correctAnswer: "50 km/h"
  },
  {
    id: 43,
    question: "Which number is divisible by 5?",
    options: ["23", "37", "40", "41"],
    correctAnswer: "40"
  },
  {
    id: 44,
    question: "What is the average of 10 and 20?",
    options: ["10", "15", "20", "25"],
    correctAnswer: "15"
  },
  {
    id: 45,
    question: "How many zeros are there in one thousand?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3"
  },

  {
    id: 46,
    question: "What is the next term: 3, 6, 9, 12, ?",
    options: ["14", "15", "18", "21"],
    correctAnswer: "15"
  },
  {
    id: 47,
    question: "Which is the largest number?",
    options: ["0.5", "0.75", "1", "0.25"],
    correctAnswer: "1"
  },
  {
    id: 48,
    question: "What is 8 × 7?",
    options: ["48", "54", "56", "64"],
    correctAnswer: "56"
  },
  {
    id: 49,
    question: "Which unit is used to measure distance?",
    options: ["Kg", "Liter", "Meter", "Second"],
    correctAnswer: "Meter"
  },
  {
    id: 50,
    question: "What is the value of 1000 ÷ 10?",
    options: ["10", "50", "100", "1000"],
    correctAnswer: "100"
  },

  {
    id: 51,
    question: "Which number comes next: 1, 1, 2, 3, 5, ?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8"
  },
  {
    id: 52,
    question: "What is the square of 9?",
    options: ["18", "27", "81", "99"],
    correctAnswer: "81"
  },
  {
    id: 53,
    question: "How many days are there in a week?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    id: 54,
    question: "Which number is smallest?",
    options: ["-1", "0", "1", "2"],
    correctAnswer: "-1"
  },
  {
    id: 55,
    question: "What is 50% of 80?",
    options: ["20", "30", "40", "50"],
    correctAnswer: "40"
  },

  {
    id: 56,
    question: "What is 2 + 2 × 2?",
    options: ["6", "8", "4", "10"],
    correctAnswer: "6"
  },
  {
    id: 57,
    question: "What is the perimeter of a rectangle with length 5 and width 3?",
    options: ["8", "10", "16", "20"],
    correctAnswer: "16"
  },
  {
    id: 58,
    question: "Which number is not a prime?",
    options: ["2", "3", "5", "9"],
    correctAnswer: "9"
  },
  {
    id: 59,
    question: "What is the value of 6 × 6?",
    options: ["30", "36", "42", "48"],
    correctAnswer: "36"
  },
  {
    id: 60,
    question: "What is the next multiple of 7 after 21?",
    options: ["24", "28", "35", "42"],
    correctAnswer: "28"
  },

  {
    id: 61,
    question: "Which shape has four equal sides?",
    options: ["Rectangle", "Square", "Triangle", "Circle"],
    correctAnswer: "Square"
  },
  {
    id: 62,
    question: "What is 1 hour equal to?",
    options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
    correctAnswer: "60 minutes"
  },
  {
    id: 63,
    question: "What is the value of 12 ÷ 3?",
    options: ["2", "3", "4", "6"],
    correctAnswer: "4"
  },
  {
    id: 64,
    question: "Which number is a multiple of 10?",
    options: ["15", "25", "30", "35"],
    correctAnswer: "30"
  },
  {
    id: 65,
    question: "What is the sum of 1 + 2 + 3?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6"
  },

  {
    id: 66,
    question: "What is the next number: 10, 20, 30, ?",
    options: ["35", "40", "45", "50"],
    correctAnswer: "40"
  },
  {
    id: 67,
    question: "Which fraction is smallest?",
    options: ["1/2", "1/3", "1/4", "1/5"],
    correctAnswer: "1/5"
  },
  {
    id: 68,
    question: "What is the value of 2⁴?",
    options: ["8", "12", "16", "32"],
    correctAnswer: "16"
  },
  {
    id: 69,
    question: "Which angle is greater than 90°?",
    options: ["Acute", "Right", "Obtuse", "Straight"],
    correctAnswer: "Obtuse"
  },
  {
    id: 70,
    question: "What is 90% of 100?",
    options: ["70", "80", "90", "100"],
    correctAnswer: "90"
  },

  {
    id: 71,
    question: "Which number is divisible by 2?",
    options: ["11", "15", "18", "21"],
    correctAnswer: "18"
  },
  {
    id: 72,
    question: "What is the next letter: B, D, F, ?",
    options: ["G", "H", "I", "J"],
    correctAnswer: "H"
  },
  {
    id: 73,
    question: "What is the area of a square with side 4?",
    options: ["8", "12", "16", "20"],
    correctAnswer: "16"
  },
  {
    id: 74,
    question: "What is 100 − 45?",
    options: ["45", "50", "55", "60"],
    correctAnswer: "55"
  },
  {
    id: 75,
    question: "Which number is the largest?",
    options: ["99", "101", "100", "98"],
    correctAnswer: "101"
  },

  {
    id: 76,
    question: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3"
  },
  {
    id: 77,
    question: "What is the value of 5 × 0?",
    options: ["0", "1", "5", "10"],
    correctAnswer: "0"
  },
  {
    id: 78,
    question: "Which number is negative?",
    options: ["1", "0", "-3", "5"],
    correctAnswer: "-3"
  },
  {
    id: 79,
    question: "What is the next number: 100, 90, 80, ?",
    options: ["75", "70", "60", "50"],
    correctAnswer: "70"
  },
  {
    id: 80,
    question: "What is 2 × (5 + 5)?",
    options: ["10", "15", "20", "25"],
    correctAnswer: "20"
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
        <h2>📘 Technical Aptitude MCQ – Level {currentLevel}</h2>
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

export default Aptitude;
