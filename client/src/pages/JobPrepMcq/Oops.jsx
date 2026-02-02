import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaTimesCircle
} from "react-icons/fa";

const QUESTIONS_PER_LEVEL = 20;
const TOTAL_LEVELS = 4;

const Oops = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  
const questions = [
  {
    id: 1,
    question: "What is Object Oriented Programming?",
    options: [
      "Programming using functions",
      "Programming using objects",
      "Programming using logic",
      "Programming using scripts"
    ],
    correctAnswer: "Programming using objects"
  },
  {
    id: 2,
    question: "What is an object?",
    options: [
      "A variable",
      "An instance of a class",
      "A function",
      "A datatype"
    ],
    correctAnswer: "An instance of a class"
  },
  {
    id: 3,
    question: "What is a class?",
    options: [
      "A blueprint for objects",
      "An object",
      "A datatype",
      "A variable"
    ],
    correctAnswer: "A blueprint for objects"
  },
  {
    id: 4,
    question: "Which keyword is used to create an object in Java?",
    options: ["class", "object", "new", "this"],
    correctAnswer: "new"
  },
  {
    id: 5,
    question: "Which of the following is NOT an OOP concept?",
    options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"],
    correctAnswer: "Compilation"
  },

  {
    id: 6,
    question: "What is encapsulation?",
    options: [
      "Wrapping data and methods together",
      "Hiding logic",
      "Multiple inheritance",
      "Code reuse"
    ],
    correctAnswer: "Wrapping data and methods together"
  },
  {
    id: 7,
    question: "Which access modifier hides data from outside the class?",
    options: ["public", "protected", "private", "default"],
    correctAnswer: "private"
  },
  {
    id: 8,
    question: "What is data hiding?",
    options: [
      "Using private variables",
      "Using public methods",
      "Using objects",
      "Using inheritance"
    ],
    correctAnswer: "Using private variables"
  },
  {
    id: 9,
    question: "Which OOP concept improves security?",
    options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
    correctAnswer: "Encapsulation"
  },
  {
    id: 10,
    question: "Getter and Setter methods are related to?",
    options: ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"],
    correctAnswer: "Encapsulation"
  },

  {
    id: 11,
    question: "What is inheritance?",
    options: [
      "Reusing existing code",
      "Hiding data",
      "Creating objects",
      "Wrapping data"
    ],
    correctAnswer: "Reusing existing code"
  },
  {
    id: 12,
    question: "Which keyword is used to inherit a class in Java?",
    options: ["inherits", "extends", "implements", "super"],
    correctAnswer: "extends"
  },
  {
    id: 13,
    question: "Which inheritance is NOT supported in Java?",
    options: [
      "Single",
      "Multilevel",
      "Multiple (class)",
      "Hierarchical"
    ],
    correctAnswer: "Multiple (class)"
  },
  {
    id: 14,
    question: "Which keyword is used to access parent class members?",
    options: ["this", "parent", "super", "base"],
    correctAnswer: "super"
  },
  {
    id: 15,
    question: "Inheritance helps to achieve?",
    options: ["Security", "Code reuse", "Data hiding", "Compilation"],
    correctAnswer: "Code reuse"
  },

  {
    id: 16,
    question: "What is polymorphism?",
    options: [
      "Many forms",
      "Single form",
      "Code reuse",
      "Data hiding"
    ],
    correctAnswer: "Many forms"
  },
  {
    id: 17,
    question: "Compile-time polymorphism is achieved using?",
    options: [
      "Method overriding",
      "Method overloading",
      "Inheritance",
      "Encapsulation"
    ],
    correctAnswer: "Method overloading"
  },
  {
    id: 18,
    question: "Runtime polymorphism is achieved using?",
    options: [
      "Method overloading",
      "Method overriding",
      "Constructor",
      "Interface"
    ],
    correctAnswer: "Method overriding"
  },
  {
    id: 19,
    question: "Which method is decided at runtime?",
    options: [
      "Overloaded method",
      "Static method",
      "Overridden method",
      "Constructor"
    ],
    correctAnswer: "Overridden method"
  },
  {
    id: 20,
    question: "Which keyword prevents method overriding?",
    options: ["final", "static", "private", "protected"],
    correctAnswer: "final"
  },

  {
    id: 21,
    question: "What is abstraction?",
    options: [
      "Hiding internal details",
      "Showing all details",
      "Code reuse",
      "Object creation"
    ],
    correctAnswer: "Hiding internal details"
  },
  {
    id: 22,
    question: "Which is used to achieve abstraction in Java?",
    options: [
      "Class",
      "Interface",
      "Array",
      "Object"
    ],
    correctAnswer: "Interface"
  },
  {
    id: 23,
    question: "Abstract class can have?",
    options: [
      "Only abstract methods",
      "Only concrete methods",
      "Both abstract and concrete methods",
      "No methods"
    ],
    correctAnswer: "Both abstract and concrete methods"
  },
  {
    id: 24,
    question: "Can we create object of abstract class?",
    options: ["Yes", "No", "Sometimes", "Depends"],
    correctAnswer: "No"
  },
  {
    id: 25,
    question: "Interface methods are by default?",
    options: ["private", "protected", "public", "static"],
    correctAnswer: "public"
  },

  {
    id: 26,
    question: "Which keyword is used to implement interface?",
    options: ["extends", "inherits", "implements", "super"],
    correctAnswer: "implements"
  },
  {
    id: 27,
    question: "Can Java class implement multiple interfaces?",
    options: ["Yes", "No", "Only one", "Depends"],
    correctAnswer: "Yes"
  },
  {
    id: 28,
    question: "Constructor is used to?",
    options: [
      "Destroy object",
      "Initialize object",
      "Call method",
      "Allocate memory only"
    ],
    correctAnswer: "Initialize object"
  },
  {
    id: 29,
    question: "Constructor name must be same as?",
    options: ["Method", "Class", "Object", "Variable"],
    correctAnswer: "Class"
  },
  {
    id: 30,
    question: "Constructor has return type?",
    options: ["int", "void", "class name", "No return type"],
    correctAnswer: "No return type"
  },

  {
    id: 31,
    question: "What is default constructor?",
    options: [
      "Constructor with parameters",
      "Constructor created by compiler",
      "Private constructor",
      "Static constructor"
    ],
    correctAnswer: "Constructor created by compiler"
  },
  {
    id: 32,
    question: "What is method overloading?",
    options: [
      "Same method name, same parameters",
      "Same method name, different parameters",
      "Different method name",
      "Different class"
    ],
    correctAnswer: "Same method name, different parameters"
  },
  {
    id: 33,
    question: "What is method overriding?",
    options: [
      "Same method in same class",
      "Same method in parent and child class",
      "Different method",
      "Static method"
    ],
    correctAnswer: "Same method in parent and child class"
  },
  {
    id: 34,
    question: "Which method cannot be overridden?",
    options: [
      "Static method",
      "Public method",
      "Protected method",
      "Abstract method"
    ],
    correctAnswer: "Static method"
  },
  {
    id: 35,
    question: "Which keyword refers to current object?",
    options: ["super", "this", "self", "current"],
    correctAnswer: "this"
  },

  {
    id: 36,
    question: "What is final variable?",
    options: [
      "Variable that can change",
      "Constant variable",
      "Static variable",
      "Temporary variable"
    ],
    correctAnswer: "Constant variable"
  },
  {
    id: 37,
    question: "What is static keyword used for?",
    options: [
      "Memory sharing",
      "Object creation",
      "Inheritance",
      "Security"
    ],
    correctAnswer: "Memory sharing"
  },
  {
    id: 38,
    question: "Static members belong to?",
    options: ["Object", "Class", "Method", "Constructor"],
    correctAnswer: "Class"
  },
  {
    id: 39,
    question: "Can static method access non-static variables?",
    options: ["Yes", "No", "Sometimes", "Depends"],
    correctAnswer: "No"
  },
  {
    id: 40,
    question: "What is object-oriented design?",
    options: [
      "Design based on objects",
      "Design based on logic",
      "Design based on functions",
      "Design based on scripts"
    ],
    correctAnswer: "Design based on objects"
  },

  {
    id: 41,
    question: "Which principle reduces code duplication?",
    options: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"],
    correctAnswer: "Inheritance"
  },
  {
    id: 42,
    question: "What is composition?",
    options: [
      "Has-a relationship",
      "Is-a relationship",
      "Inheritance",
      "Polymorphism"
    ],
    correctAnswer: "Has-a relationship"
  },
  {
    id: 43,
    question: "Inheritance represents?",
    options: [
      "Has-a relationship",
      "Is-a relationship",
      "Uses-a relationship",
      "Part-of relationship"
    ],
    correctAnswer: "Is-a relationship"
  },
  {
    id: 44,
    question: "What is cohesion?",
    options: [
      "Degree of dependency",
      "Degree of functionality of a module",
      "Object size",
      "Memory usage"
    ],
    correctAnswer: "Degree of functionality of a module"
  },
  {
    id: 45,
    question: "Low coupling means?",
    options: [
      "High dependency",
      "Low dependency",
      "No relationship",
      "Inheritance"
    ],
    correctAnswer: "Low dependency"
  },

  {
    id: 46,
    question: "What is a package?",
    options: [
      "Collection of classes",
      "Collection of objects",
      "Collection of methods",
      "Collection of variables"
    ],
    correctAnswer: "Collection of classes"
  },
  {
    id: 47,
    question: "Which access modifier is most restrictive?",
    options: ["public", "protected", "default", "private"],
    correctAnswer: "private"
  },
  {
    id: 48,
    question: "What is runtime binding?",
    options: [
      "Method call at compile time",
      "Method call at runtime",
      "Variable binding",
      "Constructor binding"
    ],
    correctAnswer: "Method call at runtime"
  },
  {
    id: 49,
    question: "Which concept supports runtime binding?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correctAnswer: "Polymorphism"
  },
  {
    id: 50,
    question: "Which feature allows same interface, different behavior?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correctAnswer: "Polymorphism"
  },

  {
    id: 51,
    question: "What is an interface?",
    options: [
      "Class with implementation",
      "Blueprint of class",
      "Collection of abstract methods",
      "Object"
    ],
    correctAnswer: "Collection of abstract methods"
  },
  {
    id: 52,
    question: "Can interface have variables?",
    options: ["Yes", "No", "Only static final", "Only private"],
    correctAnswer: "Only static final"
  },
  {
    id: 53,
    question: "Can abstract class have constructor?",
    options: ["Yes", "No", "Sometimes", "Depends"],
    correctAnswer: "Yes"
  },
  {
    id: 54,
    question: "Which keyword stops inheritance?",
    options: ["final", "static", "private", "abstract"],
    correctAnswer: "final"
  },
  {
    id: 55,
    question: "Object-oriented programming focuses on?",
    options: [
      "Functions",
      "Objects",
      "Data only",
      "Logic only"
    ],
    correctAnswer: "Objects"
  },

  {
    id: 56,
    question: "What is method signature?",
    options: [
      "Method name only",
      "Method name + parameters",
      "Return type only",
      "Access modifier"
    ],
    correctAnswer: "Method name + parameters"
  },
  {
    id: 57,
    question: "Which OOP concept hides complexity?",
    options: ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"],
    correctAnswer: "Abstraction"
  },
  {
    id: 58,
    question: "Which keyword is used to create package?",
    options: ["package", "import", "class", "extends"],
    correctAnswer: "package"
  },
  {
    id: 59,
    question: "Which keyword imports a package?",
    options: ["include", "import", "package", "require"],
    correctAnswer: "import"
  },
  {
    id: 60,
    question: "Which OOP concept binds data and methods?",
    options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"],
    correctAnswer: "Encapsulation"
  },

  {
    id: 61,
    question: "What is object state?",
    options: [
      "Object behavior",
      "Object properties",
      "Object methods",
      "Object class"
    ],
    correctAnswer: "Object properties"
  },
  {
    id: 62,
    question: "What is object behavior?",
    options: [
      "Methods",
      "Variables",
      "Constructors",
      "Packages"
    ],
    correctAnswer: "Methods"
  },
  {
    id: 63,
    question: "Can constructor be overloaded?",
    options: ["Yes", "No", "Only once", "Depends"],
    correctAnswer: "Yes"
  },
  {
    id: 64,
    question: "Which principle allows one interface, many implementations?",
    options: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"],
    correctAnswer: "Polymorphism"
  },
  {
    id: 65,
    question: "Which keyword is used to prevent method overriding?",
    options: ["static", "private", "final", "protected"],
    correctAnswer: "final"
  },

  {
    id: 66,
    question: "What is loose coupling?",
    options: [
      "High dependency",
      "Low dependency",
      "No relationship",
      "Static binding"
    ],
    correctAnswer: "Low dependency"
  },
  {
    id: 67,
    question: "Which design principle increases reusability?",
    options: ["Tight coupling", "Inheritance", "Hard coding", "Global variables"],
    correctAnswer: "Inheritance"
  },
  {
    id: 68,
    question: "Which OOP concept models real-world entities?",
    options: ["Procedure", "Object", "Loop", "Condition"],
    correctAnswer: "Object"
  },
  {
    id: 69,
    question: "Which access modifier allows access within same package?",
    options: ["private", "default", "protected", "public"],
    correctAnswer: "default"
  },
  {
    id: 70,
    question: "What is code reusability?",
    options: [
      "Using code again",
      "Deleting code",
      "Copying code",
      "Debugging code"
    ],
    correctAnswer: "Using code again"
  },

  {
    id: 71,
    question: "Which concept supports extensibility?",
    options: ["Encapsulation", "Inheritance", "Compilation", "Condition"],
    correctAnswer: "Inheritance"
  },
  {
    id: 72,
    question: "What is multiple inheritance?",
    options: [
      "One class inherits multiple classes",
      "Multiple classes inherit one class",
      "One object many classes",
      "Not supported"
    ],
    correctAnswer: "One class inherits multiple classes"
  },
  {
    id: 73,
    question: "Why Java does not support multiple inheritance?",
    options: [
      "Performance issue",
      "Diamond problem",
      "Syntax issue",
      "Memory issue"
    ],
    correctAnswer: "Diamond problem"
  },
  {
    id: 74,
    question: "Which keyword resolves ambiguity in inheritance?",
    options: ["this", "super", "final", "static"],
    correctAnswer: "super"
  },
  {
    id: 75,
    question: "Which OOP feature helps in scalability?",
    options: ["Loops", "Inheritance", "Variables", "Constants"],
    correctAnswer: "Inheritance"
  },

  {
    id: 76,
    question: "What is object reference?",
    options: [
      "Object memory address",
      "Object value",
      "Object class",
      "Object method"
    ],
    correctAnswer: "Object memory address"
  },
  {
    id: 77,
    question: "Which concept improves maintainability?",
    options: ["Encapsulation", "Inheritance", "Abstraction", "All of these"],
    correctAnswer: "All of these"
  },
  {
    id: 78,
    question: "Which keyword stops method overriding?",
    options: ["final", "static", "private", "protected"],
    correctAnswer: "final"
  },
  {
    id: 79,
    question: "Which OOP concept focuses on interface not implementation?",
    options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
    correctAnswer: "Abstraction"
  },
  {
    id: 80,
    question: "Which programming paradigm uses classes and objects?",
    options: [
      "Procedural",
      "Functional",
      "Object Oriented",
      "Logical"
    ],
    correctAnswer: "Object Oriented"
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
        <h2>📘 Object Oriented Programming MCQ – Level {currentLevel}</h2>
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

export default Oops;