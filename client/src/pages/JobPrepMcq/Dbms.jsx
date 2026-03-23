import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaTimesCircle
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
const QUESTIONS_PER_LEVEL = 20;
const TOTAL_LEVELS = 4;

const Dbms = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const topRef = useRef(null);
  const navigate  = useNavigate();
const location  = useLocation();

const handleBack = () => {
  const from = location.state?.from || "/jobPrep";
  navigate(from);
};
const getMotivation = (correct, total) => {
  const pct = Math.round((correct / total) * 100);
  if (pct === 100) return { emoji: "🏆", title: "Perfect Score!",  msg: "Absolutely flawless! You're a genius. Top companies are lucky to have you!", color: "#f59e0b" };
  if (pct >= 80)  return { emoji: "🌟", title: "Excellent Work!", msg: "Outstanding performance! You're well prepared for any aptitude round.",      color: "#10b981" };
  if (pct >= 60)  return { emoji: "💪", title: "Good Job!",       msg: "Solid effort! A little more practice and you'll ace every exam.",             color: "#3b82f6" };
  if (pct >= 40)  return { emoji: "📚", title: "Keep Going!",     msg: "You're on the right track. Review the topics and try again — you've got this!", color: "#8b5cf6" };
  return           { emoji: "🔥", title: "Don't Give Up!",         msg: "Every expert was once a beginner. Study hard and come back stronger!",        color: "#ef4444" };
};
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  let el = topRef.current?.parentElement;
  while (el) {
    if (el.scrollTop > 0) el.scrollTop = 0;
    el = el.parentElement;
  }

  if (topRef.current) {
    topRef.current.scrollIntoView({ behavior: "instant", block: "start" });
  }
}, [currentLevel]);
  const questions = [
    // ── LEVEL 1 (Q1–20): Basics ──
    {
      id: 1,
      question: "What does JavaScript primarily run in?",
      options: ["Server", "Browser", "Database", "Operating System"],
      correctAnswer: "Browser"
    },
    {
      id: 2,
      question: "Which keyword declares a variable in modern JavaScript?",
      options: ["var", "let", "const", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      id: 3,
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Integer", "Undefined"],
      correctAnswer: "Integer"
    },
    {
      id: 4,
      question: "What is the output of typeof null?",
      options: ["null", "undefined", "object", "string"],
      correctAnswer: "object"
    },
    {
      id: 5,
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["#", "//", "/* */", "--"],
      correctAnswer: "//"
    },
    {
      id: 6,
      question: "Which method prints output to the browser console?",
      options: ["console.log()", "print()", "document.write()", "alert()"],
      correctAnswer: "console.log()"
    },
    {
      id: 7,
      question: "What is the correct way to write an array in JavaScript?",
      options: [
        "var arr = (1,2,3)",
        "var arr = {1,2,3}",
        "var arr = [1,2,3]",
        "var arr = <1,2,3>"
      ],
      correctAnswer: "var arr = [1,2,3]"
    },
    {
      id: 8,
      question: "Which operator checks both value and type equality?",
      options: ["==", "===", "!=", "="],
      correctAnswer: "==="
    },
    {
      id: 9,
      question: "What does NaN stand for?",
      options: [
        "Not a Number",
        "Null and Numeric",
        "No Any Number",
        "Negative and Numeric"
      ],
      correctAnswer: "Not a Number"
    },
    {
      id: 10,
      question: "How do you write a function in JavaScript?",
      options: [
        "function myFunc() {}",
        "def myFunc() {}",
        "func myFunc() {}",
        "void myFunc() {}"
      ],
      correctAnswer: "function myFunc() {}"
    },
    {
      id: 11,
      question: "Which keyword is used to return a value from a function?",
      options: ["send", "output", "return", "yield"],
      correctAnswer: "return"
    },
    {
      id: 12,
      question: "What does the 'typeof' operator return for a string?",
      options: ["string", "str", "text", "char"],
      correctAnswer: "string"
    },
    {
      id: 13,
      question: "What is the default value of an uninitialized variable?",
      options: ["null", "0", "undefined", "false"],
      correctAnswer: "undefined"
    },
    {
      id: 14,
      question: "Which HTML tag is used to include JavaScript?",
      options: ["<js>", "<javascript>", "<script>", "<code>"],
      correctAnswer: "<script>"
    },
    {
      id: 15,
      question: "What does 'use strict' do in JavaScript?",
      options: [
        "Enables strict mode",
        "Disables JavaScript",
        "Locks variables",
        "Stops execution"
      ],
      correctAnswer: "Enables strict mode"
    },
    {
      id: 16,
      question: "How do you access the first element of an array arr?",
      options: ["arr[0]", "arr[1]", "arr.first()", "arr.get(0)"],
      correctAnswer: "arr[0]"
    },
    {
      id: 17,
      question: "Which method adds an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: "push()"
    },
    {
      id: 18,
      question: "Which method removes the last element of an array?",
      options: ["push()", "pop()", "shift()", "splice()"],
      correctAnswer: "pop()"
    },
    {
      id: 19,
      question: "What is the length property of an array used for?",
      options: [
        "Number of elements",
        "Size in bytes",
        "Largest value",
        "Index of last item"
      ],
      correctAnswer: "Number of elements"
    },
    {
      id: 20,
      question: "Which loop is used when the number of iterations is known?",
      options: ["for", "while", "do...while", "foreach"],
      correctAnswer: "for"
    },

    // ── LEVEL 2 (Q21–40): Functions & Objects ──
    {
      id: 21,
      question: "What is a closure in JavaScript?",
      options: [
        "A function with access to its outer scope",
        "A closed loop",
        "A sealed object",
        "A try-catch block"
      ],
      correctAnswer: "A function with access to its outer scope"
    },
    {
      id: 22,
      question: "What does the 'this' keyword refer to?",
      options: [
        "The current object",
        "The global window",
        "The parent class",
        "Depends on context"
      ],
      correctAnswer: "Depends on context"
    },
    {
      id: 23,
      question: "Which method calls a function with a specific 'this' value?",
      options: ["bind()", "call()", "apply()", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      id: 24,
      question: "What is an arrow function?",
      options: [
        "Short syntax for functions",
        "A looping function",
        "A class method",
        "A recursive function"
      ],
      correctAnswer: "Short syntax for functions"
    },
    {
      id: 25,
      question: "Arrow functions do NOT have their own?",
      options: ["arguments", "this", "return", "Both arguments and this"],
      correctAnswer: "Both arguments and this"
    },
    {
      id: 26,
      question: "How do you create an object in JavaScript?",
      options: [
        "var obj = {}",
        "var obj = []",
        "var obj = ()",
        "var obj = new()"
      ],
      correctAnswer: "var obj = {}"
    },
    {
      id: 27,
      question: "How do you access the property 'name' of object obj?",
      options: ["obj.name", "obj[name]", "obj->name", "obj::name"],
      correctAnswer: "obj.name"
    },
    {
      id: 28,
      question: "Which statement is used to iterate over object properties?",
      options: [
        "for...in",
        "for...of",
        "forEach",
        "while"
      ],
      correctAnswer: "for...in"
    },
    {
      id: 29,
      question: "Which statement iterates over iterable values?",
      options: ["for...in", "for...of", "for...each", "while"],
      correctAnswer: "for...of"
    },
    {
      id: 30,
      question: "What is a prototype in JavaScript?",
      options: [
        "An object from which others inherit",
        "A data type",
        "A loop",
        "A function type"
      ],
      correctAnswer: "An object from which others inherit"
    },
    {
      id: 31,
      question: "What does JSON stand for?",
      options: [
        "JavaScript Object Notation",
        "Java Standard Object Name",
        "JavaScript Online Notation",
        "JavaScript Object Naming"
      ],
      correctAnswer: "JavaScript Object Notation"
    },
    {
      id: 32,
      question: "Which method converts JSON string to JavaScript object?",
      options: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.convert()",
        "JSON.decode()"
      ],
      correctAnswer: "JSON.parse()"
    },
    {
      id: 33,
      question: "Which method converts JavaScript object to JSON string?",
      options: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.encode()",
        "JSON.convert()"
      ],
      correctAnswer: "JSON.stringify()"
    },
    {
      id: 34,
      question: "What is destructuring in JavaScript?",
      options: [
        "Unpacking values from arrays/objects",
        "Deleting variables",
        "Breaking loops",
        "Splitting strings"
      ],
      correctAnswer: "Unpacking values from arrays/objects"
    },
    {
      id: 35,
      question: "What is the spread operator?",
      options: ["...", "**", ">>", "<<"],
      correctAnswer: "..."
    },
    {
      id: 36,
      question: "What does the rest parameter do?",
      options: [
        "Collects remaining arguments",
        "Stops function",
        "Returns undefined",
        "Creates new array"
      ],
      correctAnswer: "Collects remaining arguments"
    },
    {
      id: 37,
      question: "What is a default parameter?",
      options: [
        "A fallback value when argument is undefined",
        "A required parameter",
        "A constant value",
        "A global variable"
      ],
      correctAnswer: "A fallback value when argument is undefined"
    },
    {
      id: 38,
      question: "Which keyword creates a class in JavaScript?",
      options: ["class", "object", "struct", "type"],
      correctAnswer: "class"
    },
    {
      id: 39,
      question: "Which method is the constructor of a class?",
      options: ["constructor()", "init()", "create()", "build()"],
      correctAnswer: "constructor()"
    },
    {
      id: 40,
      question: "Which keyword extends a class?",
      options: ["extends", "inherits", "super", "import"],
      correctAnswer: "extends"
    },

    // ── LEVEL 3 (Q41–60): Async & DOM ──
    {
      id: 41,
      question: "What is the DOM?",
      options: [
        "Document Object Model",
        "Data Object Module",
        "Dynamic Object Map",
        "Document Output Model"
      ],
      correctAnswer: "Document Object Model"
    },
    {
      id: 42,
      question: "Which method selects an element by ID?",
      options: [
        "getElementById()",
        "getElement()",
        "selectById()",
        "findById()"
      ],
      correctAnswer: "getElementById()"
    },
    {
      id: 43,
      question: "Which method selects elements by CSS selector?",
      options: [
        "querySelector()",
        "getSelector()",
        "findElement()",
        "selectCSS()"
      ],
      correctAnswer: "querySelector()"
    },
    {
      id: 44,
      question: "Which method adds an event listener to an element?",
      options: [
        "addEventListener()",
        "attachEvent()",
        "addEvent()",
        "onEvent()"
      ],
      correctAnswer: "addEventListener()"
    },
    {
      id: 45,
      question: "What does event.preventDefault() do?",
      options: [
        "Prevents default browser action",
        "Stops event bubbling",
        "Removes event listener",
        "Clears event queue"
      ],
      correctAnswer: "Prevents default browser action"
    },
    {
      id: 46,
      question: "What is event bubbling?",
      options: [
        "Event propagates from child to parent",
        "Event propagates from parent to child",
        "Event is cancelled",
        "Event is duplicated"
      ],
      correctAnswer: "Event propagates from child to parent"
    },
    {
      id: 47,
      question: "What is a Promise in JavaScript?",
      options: [
        "Object representing future async value",
        "A callback function",
        "A loop construct",
        "A data type"
      ],
      correctAnswer: "Object representing future async value"
    },
    {
      id: 48,
      question: "Which Promise state means operation succeeded?",
      options: ["fulfilled", "resolved", "completed", "done"],
      correctAnswer: "fulfilled"
    },
    {
      id: 49,
      question: "Which Promise state means operation failed?",
      options: ["rejected", "failed", "error", "broken"],
      correctAnswer: "rejected"
    },
    {
      id: 50,
      question: "What keyword makes a function return a Promise automatically?",
      options: ["async", "await", "promise", "defer"],
      correctAnswer: "async"
    },
    {
      id: 51,
      question: "What does 'await' do inside an async function?",
      options: [
        "Pauses until Promise resolves",
        "Cancels the Promise",
        "Creates a new thread",
        "Runs code in parallel"
      ],
      correctAnswer: "Pauses until Promise resolves"
    },
    {
      id: 52,
      question: "What does fetch() return?",
      options: ["A Promise", "A string", "An object", "An array"],
      correctAnswer: "A Promise"
    },
    {
      id: 53,
      question: "Which method handles a resolved Promise?",
      options: [".then()", ".catch()", ".finally()", ".resolve()"],
      correctAnswer: ".then()"
    },
    {
      id: 54,
      question: "Which method handles a rejected Promise?",
      options: [".then()", ".catch()", ".finally()", ".reject()"],
      correctAnswer: ".catch()"
    },
    {
      id: 55,
      question: "What does setTimeout() do?",
      options: [
        "Executes code after a delay",
        "Stops execution",
        "Repeats code forever",
        "Clears intervals"
      ],
      correctAnswer: "Executes code after a delay"
    },
    {
      id: 56,
      question: "What does setInterval() do?",
      options: [
        "Repeatedly executes code at intervals",
        "Delays once",
        "Clears timeout",
        "Pauses execution"
      ],
      correctAnswer: "Repeatedly executes code at intervals"
    },
    {
      id: 57,
      question: "Which method stops a setInterval?",
      options: [
        "clearInterval()",
        "stopInterval()",
        "cancelInterval()",
        "removeInterval()"
      ],
      correctAnswer: "clearInterval()"
    },
    {
      id: 58,
      question: "Which method stops a setTimeout?",
      options: [
        "clearTimeout()",
        "stopTimeout()",
        "cancelTimeout()",
        "removeTimeout()"
      ],
      correctAnswer: "clearTimeout()"
    },
    {
      id: 59,
      question: "localStorage stores data as?",
      options: ["String", "Object", "Array", "Number"],
      correctAnswer: "String"
    },
    {
      id: 60,
      question: "What is the difference between localStorage and sessionStorage?",
      options: [
        "localStorage persists; sessionStorage clears on tab close",
        "Both are identical",
        "sessionStorage persists longer",
        "localStorage clears on refresh"
      ],
      correctAnswer: "localStorage persists; sessionStorage clears on tab close"
    },
    {
      id: 61,
      question: "What is hoisting in JavaScript?",
      options: [
        "Variables/functions moved to top of scope",
        "Moving DOM elements",
        "Sorting arrays",
        "Importing modules"
      ],
      correctAnswer: "Variables/functions moved to top of scope"
    },
    {
      id: 62,
      question: "Are 'let' and 'const' declarations hoisted?",
      options: [
        "Yes, but not initialized (TDZ)",
        "No, not hoisted",
        "Yes, fully initialized",
        "Only const is hoisted"
      ],
      correctAnswer: "Yes, but not initialized (TDZ)"
    },
    {
      id: 63,
      question: "What is the Temporal Dead Zone (TDZ)?",
      options: [
        "Period before let/const initialization",
        "A garbage collection phase",
        "An async waiting period",
        "A scope boundary"
      ],
      correctAnswer: "Period before let/const initialization"
    },
    {
      id: 64,
      question: "Which array method returns a new filtered array?",
      options: ["filter()", "map()", "find()", "reduce()"],
      correctAnswer: "filter()"
    },
    {
      id: 65,
      question: "Which array method transforms each element?",
      options: ["filter()", "map()", "find()", "forEach()"],
      correctAnswer: "map()"
    },
    {
      id: 66,
      question: "Which array method reduces array to a single value?",
      options: ["map()", "filter()", "reduce()", "some()"],
      correctAnswer: "reduce()"
    },
    {
      id: 67,
      question: "Which array method finds the first matching element?",
      options: ["find()", "filter()", "indexOf()", "search()"],
      correctAnswer: "find()"
    },
    {
      id: 68,
      question: "What is a generator function?",
      options: [
        "Function that can be paused and resumed",
        "Function that generates random numbers",
        "Constructor function",
        "Recursive function"
      ],
      correctAnswer: "Function that can be paused and resumed"
    },
    {
      id: 69,
      question: "Which keyword defines a generator function?",
      options: ["function*", "async function", "generator", "yield function"],
      correctAnswer: "function*"
    },
    {
      id: 70,
      question: "What does the 'yield' keyword do?",
      options: [
        "Pauses generator and returns value",
        "Exits function permanently",
        "Skips iteration",
        "Returns undefined"
      ],
      correctAnswer: "Pauses generator and returns value"
    },
    {
      id: 71,
      question: "What is a WeakMap?",
      options: [
        "Map with weakly held object keys",
        "A smaller Map",
        "A deprecated Map",
        "A read-only Map"
      ],
      correctAnswer: "Map with weakly held object keys"
    },
    {
      id: 72,
      question: "What is a Symbol in JavaScript?",
      options: [
        "Unique and immutable primitive",
        "A string alias",
        "A numeric constant",
        "A special object"
      ],
      correctAnswer: "Unique and immutable primitive"
    },
    {
      id: 73,
      question: "What is a Proxy in JavaScript?",
      options: [
        "Intercepts object operations",
        "A network proxy",
        "A Promise wrapper",
        "A class decorator"
      ],
      correctAnswer: "Intercepts object operations"
    },
    {
      id: 74,
      question: "What does Object.freeze() do?",
      options: [
        "Prevents modifications to object",
        "Copies the object",
        "Deletes the object",
        "Locks the prototype"
      ],
      correctAnswer: "Prevents modifications to object"
    },
    {
      id: 75,
      question: "What is memoization?",
      options: [
        "Caching function results",
        "Memory allocation",
        "Object cloning",
        "Code minification"
      ],
      correctAnswer: "Caching function results"
    },
    {
      id: 76,
      question: "What is currying?",
      options: [
        "Transforming multi-arg function into sequence of functions",
        "A string method",
        "A sorting technique",
        "A loop optimization"
      ],
      correctAnswer: "Transforming multi-arg function into sequence of functions"
    },
    {
      id: 77,
      question: "What is the event loop in JavaScript?",
      options: [
        "Mechanism handling async callbacks",
        "A DOM event system",
        "A loop statement",
        "A timer function"
      ],
      correctAnswer: "Mechanism handling async callbacks"
    },
    {
      id: 78,
      question: "What is the call stack?",
      options: [
        "Stack tracking function execution",
        "List of API calls",
        "Callback queue",
        "Prototype chain"
      ],
      correctAnswer: "Stack tracking function execution"
    },
    {
      id: 79,
      question: "ES6 introduced which module syntax?",
      options: [
        "import / export",
        "require / module.exports",
        "include / define",
        "load / export"
      ],
      correctAnswer: "import / export"
    },
    {
      id: 80,
      question: "What does the nullish coalescing operator (??) do?",
      options: [
        "Returns right side if left is null/undefined",
        "Checks strict equality",
        "Short-circuits on false",
        "Converts to boolean"
      ],
      correctAnswer: "Returns right side if left is null/undefined"
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
      selectedAnswers[q.id] === q.correctAnswer ? correct++ : wrong++;
    });
    return {
      correct,
      wrong,
      attempted: correct + wrong,
      total: currentLevelQuestions.length
    };
  }, [selectedAnswers, currentLevelQuestions]);

  const isLevelCompleted = levelScore.attempted === QUESTIONS_PER_LEVEL;

  const getOptionClass = (q, opt) => {
    const selected = selectedAnswers[q.id];
    if (!selected) return "mcq-option";
    if (opt === q.correctAnswer) return "mcq-option correct";
    if (opt === selected) return "mcq-option wrong";
    return "mcq-option disabled";
  };

  return (
    <div className="quiz-wrapper" ref={topRef}>
      <div className="quiz-header">
        <button
    onClick={handleBack}
    style={{
      background: "rgba(255,255,255,0.2)",
      border: "1.5px solid rgba(255,255,255,0.5)",
      color: "white",
      padding: "7px 18px",
      borderRadius: "20px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "14px",
      fontSize: "14px"
    }}
  >
    ← Back
  </button>
        <h2>⚡ JavaScript MCQ – Level {currentLevel}</h2>
        <p>
          Level {currentLevel} of {TOTAL_LEVELS} • {QUESTIONS_PER_LEVEL} Questions
        </p>
      </div>

      {currentLevelQuestions.map((q) => (
        <div key={q.id} className="question-card">
          <h4>
            {q.id}. {q.question}
          </h4>
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
        <button className="submit-btn" onClick={() => setShowSummary(true)}>
          Submit Answers
        </button>
      </div>

      {showSummary && (() => {
  const pct  = Math.round((levelScore.correct / QUESTIONS_PER_LEVEL) * 100);
  const mot  = getMotivation(levelScore.correct, QUESTIONS_PER_LEVEL);
  const isFinalLevel = currentLevel === TOTAL_LEVELS;
  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: "460px" }}>

        {/* Colored top banner */}
        <div style={{
          background: `linear-gradient(135deg, ${mot.color}, ${mot.color}cc)`,
          margin: "-30px -26px 20px -26px",
          padding: "28px 26px 22px",
          borderRadius: "24px 24px 0 0",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "64px", lineHeight: 1 }}>{mot.emoji}</div>
          <h2 style={{ color: "white", margin: "10px 0 4px", fontWeight: "800", fontSize: "1.6rem" }}>
            {mot.title}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.9)", margin: 0, fontSize: "0.95rem" }}>
            {mot.msg}
          </p>
        </div>

        {/* Score ring */}
        <div style={{ textAlign: "center", margin: "10px 0 18px" }}>
          <div style={{
            display: "inline-flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            width: "110px", height: "110px", borderRadius: "50%",
            border: `6px solid ${mot.color}`,
            boxShadow: `0 0 0 4px ${mot.color}22`
          }}>
            <span style={{ fontSize: "2rem", fontWeight: "900", color: mot.color }}>{pct}%</span>
            <span style={{ fontSize: "0.72rem", color: "#6b7280", fontWeight: "600" }}>SCORE</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "24px",
          background: "#f9fafb", borderRadius: "14px",
          padding: "14px", marginBottom: "22px"
        }}>
          {[
            { label: "Attempted", val: levelScore.attempted, color: "#3b82f6" },
            { label: "Correct",   val: levelScore.correct,   color: "#10b981" },
            { label: "Wrong",     val: levelScore.wrong,     color: "#ef4444" }
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: s.color }}>{s.val}</div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: "600" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Level info */}
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "0.88rem", marginBottom: "20px" }}>
          Level {currentLevel} of {TOTAL_LEVELS} completed
        </p>

        {/* Action buttons */}
        <div className="modal-actions">
          <button className="modal-btn home" onClick={() => window.location.href = "/jobPrep"}>
            <FaHome /> Home
          </button>
          {!isFinalLevel ? (
            <button
              className="modal-btn next"
              style={{ background: mot.color }}
              onClick={() => { setShowSummary(false); setCurrentLevel(p => p + 1); }}
            >
              Next Level <FaArrowRight />
            </button>
          ) : (
            <button
              className="modal-btn next"
              style={{ background: mot.color }}
              onClick={() => window.location.href = "/jobPrep"}
            >
              Finish 🎉
            </button>
          )}
        </div>

        <button className="modal-close" onClick={() => setShowSummary(false)}>
          <FaTimesCircle />
        </button>
      </div>
    </div>
  );
})()}

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
  background: linear-gradient(135deg, #f59e0b, #f97316);
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
  border-color: #f59e0b;
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
  flex-shrink: 0;
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
  background: #f59e0b;
  color: white;
}

.modal-btn.next:hover {
  background: #d97706;
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
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 768px) {
  .quiz-header { padding: 22px; }
  .question-card { padding: 18px; }
}

@media (max-width: 480px) {
  .submit-btn { width: 92%; max-width: 360px; }
  .modal-card { padding: 22px 18px; }
  .modal-actions { flex-direction: column; }
  .modal-btn { width: 100%; justify-content: center; }
}
`}</style>
    </div>
  );
};

export default Dbms;