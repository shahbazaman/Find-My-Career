import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaTimesCircle
} from "react-icons/fa";

const QUESTIONS_PER_LEVEL = 20;
const TOTAL_LEVELS = 4;

const English = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);


const questions = [
  {
    id: 1,
    question: "She ___ to the office every day. (fill in the blank)",
    options: ["go", "goes", "gone", "going"],
    correctAnswer: "goes"
  },
  {
    id: 2,
    question: "He ___ playing football yesterday. (fill in the blank)",
    options: ["is", "was", "were", "has"],
    correctAnswer: "was"
  },
  {
    id: 3,
    question: "I have ___ my homework already. (fill in the blank)",
    options: ["do", "did", "done", "doing"],
    correctAnswer: "done"
  },
  {
    id: 4,
    question: "She is ___ honest person. (fill in the blank)",
    options: ["a", "an", "the", "no article"],
    correctAnswer: "an"
  },
  {
    id: 5,
    question: "They ___ finished the work before evening. (fill in the blank)",
    options: ["has", "have", "having", "had"],
    correctAnswer: "have"
  },

  {
    id: 6,
    question: "He is good ___ mathematics. (fill in the blank)",
    options: ["in", "on", "at", "with"],
    correctAnswer: "at"
  },
  {
    id: 7,
    question: "She was absent ___ Monday. (fill in the blank)",
    options: ["on", "in", "at", "by"],
    correctAnswer: "on"
  },
  {
    id: 8,
    question: "We will meet ___ the evening. (fill in the blank)",
    options: ["on", "at", "in", "by"],
    correctAnswer: "in"
  },
  {
    id: 9,
    question: "He arrived ___ the airport early. (fill in the blank)",
    options: ["to", "in", "at", "on"],
    correctAnswer: "at"
  },
  {
    id: 10,
    question: "She is interested ___ music. (fill in the blank)",
    options: ["in", "on", "at", "for"],
    correctAnswer: "in"
  },

  {
    id: 11,
    question: "Neither Ram nor his friends ___ coming. (fill in the blank)",
    options: ["is", "are", "was", "be"],
    correctAnswer: "are"
  },
  {
    id: 12,
    question: "Each of the students ___ present. (fill in the blank)",
    options: ["are", "were", "is", "have"],
    correctAnswer: "is"
  },
  {
    id: 13,
    question: "The news ___ very shocking. (fill in the blank)",
    options: ["are", "were", "is", "have"],
    correctAnswer: "is"
  },
  {
    id: 14,
    question: "My father ___ a doctor. (fill in the blank)",
    options: ["are", "were", "is", "has"],
    correctAnswer: "is"
  },
  {
    id: 15,
    question: "There ___ many books on the table. (fill in the blank)",
    options: ["is", "was", "are", "has"],
    correctAnswer: "are"
  },

  {
    id: 16,
    question: "She ___ tea every morning. (fill in the blank)",
    options: ["drink", "drinks", "drank", "drinking"],
    correctAnswer: "drinks"
  },
  {
    id: 17,
    question: "He did not ___ the movie. (fill in the blank)",
    options: ["liked", "likes", "like", "liking"],
    correctAnswer: "like"
  },
  {
    id: 18,
    question: "They were ___ to see the result. (fill in the blank)",
    options: ["happy", "happily", "happiness", "happier"],
    correctAnswer: "happy"
  },
  {
    id: 19,
    question: "She speaks ___ than her sister. (fill in the blank)",
    options: ["clear", "clearly", "more clear", "clearest"],
    correctAnswer: "more clear"
  },
  {
    id: 20,
    question: "This is the ___ book I have ever read. (fill in the blank)",
    options: ["good", "better", "best", "very good"],
    correctAnswer: "best"
  },

  {
    id: 21,
    question: "He is ___ honest man. (fill in the blank)",
    options: ["a", "an", "the", "no article"],
    correctAnswer: "an"
  },
  {
    id: 22,
    question: "The sun ___ in the east. (fill in the blank)",
    options: ["rise", "rises", "rose", "rising"],
    correctAnswer: "rises"
  },
  {
    id: 23,
    question: "She is afraid ___ dogs. (fill in the blank)",
    options: ["from", "of", "with", "for"],
    correctAnswer: "of"
  },
  {
    id: 24,
    question: "He is senior ___ me. (fill in the blank)",
    options: ["than", "to", "from", "with"],
    correctAnswer: "to"
  },
  {
    id: 25,
    question: "I prefer tea ___ coffee. (fill in the blank)",
    options: ["from", "than", "to", "over"],
    correctAnswer: "to"
  },

  {
    id: 26,
    question: "She ___ finished her lunch. (fill in the blank)",
    options: ["have", "has", "had", "having"],
    correctAnswer: "has"
  },
  {
    id: 27,
    question: "We ___ watching TV when he arrived. (fill in the blank)",
    options: ["are", "were", "was", "have"],
    correctAnswer: "were"
  },
  {
    id: 28,
    question: "He ran ___ than his brother. (fill in the blank)",
    options: ["fast", "faster", "fastest", "more fast"],
    correctAnswer: "faster"
  },
  {
    id: 29,
    question: "She is the ___ student in the class. (fill in the blank)",
    options: ["tall", "taller", "tallest", "very tall"],
    correctAnswer: "tallest"
  },
  {
    id: 30,
    question: "He apologized ___ his mistake. (fill in the blank)",
    options: ["for", "to", "on", "with"],
    correctAnswer: "for"
  },

  {
    id: 31,
    question: "The train ___ late today. (fill in the blank)",
    options: ["are", "were", "is", "has"],
    correctAnswer: "is"
  },
  {
    id: 32,
    question: "She ___ been to Delhi. (fill in the blank)",
    options: ["have", "has", "had", "having"],
    correctAnswer: "has"
  },
  {
    id: 33,
    question: "He speaks ___ English. (fill in the blank)",
    options: ["fluent", "fluently", "fluency", "fluentely"],
    correctAnswer: "fluently"
  },
  {
    id: 34,
    question: "I am looking forward ___ meeting you. (fill in the blank)",
    options: ["to", "for", "with", "at"],
    correctAnswer: "to"
  },
  {
    id: 35,
    question: "She is ___ MBA student. (fill in the blank)",
    options: ["a", "an", "the", "no article"],
    correctAnswer: "an"
  },

  {
    id: 36,
    question: "He does his work ___. (fill in the blank)",
    options: ["careful", "carefully", "care", "caring"],
    correctAnswer: "carefully"
  },
  {
    id: 37,
    question: "The meeting was cancelled ___ rain. (fill in the blank)",
    options: ["because", "because of", "due", "for"],
    correctAnswer: "because of"
  },
  {
    id: 38,
    question: "She is fond ___ reading books. (fill in the blank)",
    options: ["in", "of", "for", "at"],
    correctAnswer: "of"
  },
  {
    id: 39,
    question: "He is responsible ___ the project. (fill in the blank)",
    options: ["to", "for", "with", "on"],
    correctAnswer: "for"
  },
  {
    id: 40,
    question: "I will call you ___ I reach home. (fill in the blank)",
    options: ["when", "while", "since", "because"],
    correctAnswer: "when"
  },

  {
    id: 41,
    question: "She hardly ___ any mistakes. (fill in the blank)",
    options: ["make", "makes", "made", "making"],
    correctAnswer: "makes"
  },
  {
    id: 42,
    question: "He succeeded ___ hard work. (fill in the blank)",
    options: ["by", "with", "in", "through"],
    correctAnswer: "through"
  },
  {
    id: 43,
    question: "She is ___ than her cousin. (fill in the blank)",
    options: ["intelligent", "more intelligent", "most intelligent", "very intelligent"],
    correctAnswer: "more intelligent"
  },
  {
    id: 44,
    question: "They have been waiting ___ an hour. (fill in the blank)",
    options: ["since", "for", "from", "by"],
    correctAnswer: "for"
  },
  {
    id: 45,
    question: "He stopped ___ when the teacher entered. (fill in the blank)",
    options: ["talk", "talked", "talking", "to talk"],
    correctAnswer: "talking"
  },

  {
    id: 46,
    question: "She prefers walking ___ driving. (fill in the blank)",
    options: ["than", "to", "over", "from"],
    correctAnswer: "to"
  },
  {
    id: 47,
    question: "The child cried ___ hunger. (fill in the blank)",
    options: ["for", "from", "due", "because"],
    correctAnswer: "from"
  },
  {
    id: 48,
    question: "He is proud ___ his achievements. (fill in the blank)",
    options: ["of", "for", "to", "with"],
    correctAnswer: "of"
  },
  {
    id: 49,
    question: "She ___ finished the report by now. (fill in the blank)",
    options: ["will have", "has", "had", "was"],
    correctAnswer: "will have"
  },
  {
    id: 50,
    question: "The teacher asked us to ___ silent. (fill in the blank)",
    options: ["be", "being", "been", "is"],
    correctAnswer: "be"
  },

  {
    id: 51,
    question: "He did not know ___ to say. (fill in the blank)",
    options: ["what", "which", "that", "how"],
    correctAnswer: "what"
  },
  {
    id: 52,
    question: "She speaks English ___ confidence. (fill in the blank)",
    options: ["with", "in", "by", "for"],
    correctAnswer: "with"
  },
  {
    id: 53,
    question: "The boy is afraid ___ the dark. (fill in the blank)",
    options: ["from", "of", "for", "with"],
    correctAnswer: "of"
  },
  {
    id: 54,
    question: "This is ___ useful information. (fill in the blank)",
    options: ["a", "an", "the", "no article"],
    correctAnswer: "no article"
  },
  {
    id: 55,
    question: "She is good ___ singing. (fill in the blank)",
    options: ["at", "in", "on", "for"],
    correctAnswer: "at"
  },

  {
    id: 56,
    question: "He hardly ___ time for rest. (fill in the blank)",
    options: ["have", "has", "had", "having"],
    correctAnswer: "has"
  },
  {
    id: 57,
    question: "The work must be finished ___ today. (fill in the blank)",
    options: ["by", "till", "since", "from"],
    correctAnswer: "by"
  },
  {
    id: 58,
    question: "She speaks ___ politely. (fill in the blank)",
    options: ["very", "much", "too", "so"],
    correctAnswer: "very"
  },
  {
    id: 59,
    question: "He is not ___ strong to lift the box. (fill in the blank)",
    options: ["very", "too", "enough", "so"],
    correctAnswer: "enough"
  },
  {
    id: 60,
    question: "They congratulated him ___ his success. (fill in the blank)",
    options: ["on", "for", "with", "to"],
    correctAnswer: "on"
  },

  {
    id: 61,
    question: "She is ___ tired to continue. (fill in the blank)",
    options: ["very", "so", "too", "enough"],
    correctAnswer: "too"
  },
  {
    id: 62,
    question: "He requested me ___ help him. (fill in the blank)",
    options: ["for", "to", "with", "on"],
    correctAnswer: "to"
  },
  {
    id: 63,
    question: "She is waiting ___ the bus. (fill in the blank)",
    options: ["for", "to", "of", "on"],
    correctAnswer: "for"
  },
  {
    id: 64,
    question: "The doctor advised him ___ smoking. (fill in the blank)",
    options: ["stop", "to stop", "stopping", "stopped"],
    correctAnswer: "to stop"
  },
  {
    id: 65,
    question: "He is keen ___ learning English. (fill in the blank)",
    options: ["in", "on", "for", "at"],
    correctAnswer: "on"
  },

  {
    id: 66,
    question: "She insisted ___ paying the bill. (fill in the blank)",
    options: ["on", "for", "to", "at"],
    correctAnswer: "on"
  },
  {
    id: 67,
    question: "He succeeded ___ his efforts. (fill in the blank)",
    options: ["by", "with", "through", "in"],
    correctAnswer: "through"
  },
  {
    id: 68,
    question: "She is ___ than her brother. (fill in the blank)",
    options: ["short", "shorter", "shortest", "very short"],
    correctAnswer: "shorter"
  },
  {
    id: 69,
    question: "They were late ___ the traffic. (fill in the blank)",
    options: ["because", "because of", "due", "since"],
    correctAnswer: "because of"
  },
  {
    id: 70,
    question: "He speaks ___ slowly. (fill in the blank)",
    options: ["too", "very", "much", "so"],
    correctAnswer: "very"
  },

  {
    id: 71,
    question: "She has no choice ___ agree. (fill in the blank)",
    options: ["but to", "except", "than", "for"],
    correctAnswer: "but to"
  },
  {
    id: 72,
    question: "He is capable ___ doing the job. (fill in the blank)",
    options: ["of", "for", "to", "with"],
    correctAnswer: "of"
  },
  {
    id: 73,
    question: "She is familiar ___ this software. (fill in the blank)",
    options: ["to", "with", "for", "on"],
    correctAnswer: "with"
  },
  {
    id: 74,
    question: "They apologized ___ the delay. (fill in the blank)",
    options: ["for", "to", "on", "with"],
    correctAnswer: "for"
  },
  {
    id: 75,
    question: "He prevented her ___ falling. (fill in the blank)",
    options: ["from", "of", "to", "for"],
    correctAnswer: "from"
  },

  {
    id: 76,
    question: "She looks forward ___ hearing from you. (fill in the blank)",
    options: ["to", "for", "with", "at"],
    correctAnswer: "to"
  },
  {
    id: 77,
    question: "He is known ___ his honesty. (fill in the blank)",
    options: ["for", "to", "with", "on"],
    correctAnswer: "for"
  },
  {
    id: 78,
    question: "The room is ___ large for us. (fill in the blank)",
    options: ["too", "very", "so", "much"],
    correctAnswer: "too"
  },
  {
    id: 79,
    question: "She made him ___ the truth. (fill in the blank)",
    options: ["tell", "to tell", "telling", "told"],
    correctAnswer: "tell"
  },
  {
    id: 80,
    question: "He failed ___ attend the meeting. (fill in the blank)",
    options: ["to", "for", "in", "with"],
    correctAnswer: "to"
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
        <h2>📘 English Grammar MCQ – Level {currentLevel}</h2>
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

export default English;
