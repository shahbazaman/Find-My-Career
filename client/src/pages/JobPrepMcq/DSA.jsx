import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaArrowRight,
  FaHome,
  FaTimesCircle
} from "react-icons/fa";
const questions = [
  {
    id: 1,
    question: "What is a data structure?",
    options: [
      "A programming language",
      "A way to organize data",
      "An algorithm",
      "A database"
    ],
    correctAnswer: "A way to organize data"
  },
  {
    id: 2,
    question: "Which data structure follows LIFO?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack"
  },
  {
    id: 3,
    question: "Which data structure follows FIFO?",
    options: ["Stack", "Tree", "Queue", "Graph"],
    correctAnswer: "Queue"
  },
  {
    id: 4,
    question: "What is the index of the first element in an array?",
    options: ["0", "1", "-1", "Depends on language"],
    correctAnswer: "0"
  },
  {
    id: 5,
    question: "Which data structure uses contiguous memory?",
    options: ["Linked List", "Tree", "Graph", "Array"],
    correctAnswer: "Array"
  },
  {
    id: 6,
    question: "What is time complexity?",
    options: [
      "Time taken to write code",
      "Amount of memory used",
      "Execution time growth with input",
      "CPU speed"
    ],
    correctAnswer: "Execution time growth with input"
  },
  {
    id: 7,
    question: "What does Big-O notation represent?",
    options: [
      "Best case",
      "Worst case",
      "Average case",
      "Space complexity"
    ],
    correctAnswer: "Worst case"
  },
  {
    id: 8,
    question: "What is O(1) complexity?",
    options: [
      "Constant time",
      "Linear time",
      "Quadratic time",
      "Logarithmic time"
    ],
    correctAnswer: "Constant time"
  },
  {
    id: 9,
    question: "Which operation is fastest in an array?",
    options: ["Insertion", "Deletion", "Access", "Traversal"],
    correctAnswer: "Access"
  },
  {
    id: 10,
    question: "Which data structure is dynamic?",
    options: ["Array", "Linked List", "Static Array", "Matrix"],
    correctAnswer: "Linked List"
  },

  {
    id: 11,
    question: "What is a linked list?",
    options: [
      "Continuous memory structure",
      "Collection of nodes with pointers",
      "Fixed size data structure",
      "Index-based structure"
    ],
    correctAnswer: "Collection of nodes with pointers"
  },
  {
    id: 12,
    question: "Which linked list has next and previous pointers?",
    options: [
      "Singly linked list",
      "Circular linked list",
      "Doubly linked list",
      "Linear list"
    ],
    correctAnswer: "Doubly linked list"
  },
  {
    id: 13,
    question: "What is the first node of a linked list called?",
    options: ["Tail", "Root", "Head", "Leaf"],
    correctAnswer: "Head"
  },
  {
    id: 14,
    question: "Which data structure is used for recursion?",
    options: ["Queue", "Stack", "Heap", "Tree"],
    correctAnswer: "Stack"
  },
  {
    id: 15,
    question: "What is stack overflow?",
    options: [
      "Deleting from stack",
      "Stack is empty",
      "Pushing into full stack",
      "Memory leak"
    ],
    correctAnswer: "Pushing into full stack"
  },
  {
    id: 16,
    question: "What is stack underflow?",
    options: [
      "Stack is full",
      "Stack is empty",
      "Overflow error",
      "Invalid pointer"
    ],
    correctAnswer: "Stack is empty"
  },
  {
    id: 17,
    question: "Which structure is used in printer scheduling?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue"
  },
  {
    id: 18,
    question: "What is a circular queue?",
    options: [
      "Queue with dynamic size",
      "Queue using array",
      "Queue where last connects to first",
      "Priority queue"
    ],
    correctAnswer: "Queue where last connects to first"
  },
  {
    id: 19,
    question: "Which queue removes elements based on priority?",
    options: ["Simple queue", "Circular queue", "Deque", "Priority queue"],
    correctAnswer: "Priority queue"
  },
  {
    id: 20,
    question: "Deque allows insertion and deletion at?",
    options: ["Front only", "Rear only", "Both ends", "Middle"],
    correctAnswer: "Both ends"
  },

  {
    id: 21,
    question: "What is a tree data structure?",
    options: [
      "Linear data structure",
      "Hierarchical structure",
      "Sequential structure",
      "Circular structure"
    ],
    correctAnswer: "Hierarchical structure"
  },
  {
    id: 22,
    question: "What is the top node in a tree called?",
    options: ["Leaf", "Root", "Branch", "Stem"],
    correctAnswer: "Root"
  },
  {
    id: 23,
    question: "What is a leaf node?",
    options: [
      "Node with one child",
      "Node with two children",
      "Node with no children",
      "Root node"
    ],
    correctAnswer: "Node with no children"
  },
  {
    id: 24,
    question: "In a binary tree, max children per node?",
    options: ["1", "2", "3", "Unlimited"],
    correctAnswer: "2"
  },
  {
    id: 25,
    question: "What is BST?",
    options: [
      "Binary Simple Tree",
      "Balanced Search Tree",
      "Binary Search Tree",
      "Basic Structure Tree"
    ],
    correctAnswer: "Binary Search Tree"
  },
  {
    id: 26,
    question: "In BST, left child value is?",
    options: ["Greater", "Equal", "Less", "Random"],
    correctAnswer: "Less"
  },
  {
    id: 27,
    question: "What is graph made of?",
    options: [
      "Nodes and edges",
      "Arrays and lists",
      "Roots and leaves",
      "Stacks and queues"
    ],
    correctAnswer: "Nodes and edges"
  },
  {
    id: 28,
    question: "DFS stands for?",
    options: [
      "Depth First Search",
      "Data First Search",
      "Direct File Scan",
      "Depth File System"
    ],
    correctAnswer: "Depth First Search"
  },
  {
    id: 29,
    question: "BFS uses which data structure?",
    options: ["Stack", "Queue", "Array", "Tree"],
    correctAnswer: "Queue"
  },
  {
    id: 30,
    question: "DFS uses which data structure?",
    options: ["Queue", "Stack", "Array", "Heap"],
    correctAnswer: "Stack"
  },

  {
    id: 31,
    question: "What is sorting?",
    options: [
      "Searching elements",
      "Deleting elements",
      "Arranging elements",
      "Storing elements"
    ],
    correctAnswer: "Arranging elements"
  },
  {
    id: 32,
    question: "Which sorting algorithm is simplest?",
    options: ["Merge sort", "Quick sort", "Bubble sort", "Heap sort"],
    correctAnswer: "Bubble sort"
  },
  {
    id: 33,
    question: "Which sorting has O(n²) worst case?",
    options: ["Merge sort", "Bubble sort", "Quick sort", "Heap sort"],
    correctAnswer: "Bubble sort"
  },
  {
    id: 34,
    question: "Which sorting is fastest on average?",
    options: ["Bubble sort", "Insertion sort", "Quick sort", "Selection sort"],
    correctAnswer: "Quick sort"
  },
  {
    id: 35,
    question: "Merge sort follows which technique?",
    options: ["Greedy", "Dynamic programming", "Divide and conquer", "Backtracking"],
    correctAnswer: "Divide and conquer"
  },

  {
    id: 36,
    question: "What is searching?",
    options: [
      "Arranging data",
      "Finding an element",
      "Deleting element",
      "Inserting element"
    ],
    correctAnswer: "Finding an element"
  },
  {
    id: 37,
    question: "Linear search time complexity?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)"
  },
  {
    id: 38,
    question: "Binary search works on?",
    options: ["Unsorted array", "Sorted array", "Linked list", "Graph"],
    correctAnswer: "Sorted array"
  },
  {
    id: 39,
    question: "Binary search time complexity?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctAnswer: "O(log n)"
  },
  {
    id: 40,
    question: "Binary search divides array into?",
    options: ["Two halves", "Three parts", "Four parts", "Random parts"],
    correctAnswer: "Two halves"
  },

  {
    id: 41,
    question: "What is space complexity?",
    options: [
      "Time taken",
      "Memory used",
      "CPU usage",
      "Disk usage"
    ],
    correctAnswer: "Memory used"
  },
  {
    id: 42,
    question: "Which data structure uses heap memory?",
    options: ["Stack", "Queue", "Linked list", "Array"],
    correctAnswer: "Linked list"
  },
  {
    id: 43,
    question: "Which traversal is Depth-wise?",
    options: ["BFS", "DFS", "Linear", "Random"],
    correctAnswer: "DFS"
  },
  {
    id: 44,
    question: "Which traversal is Level-wise?",
    options: ["DFS", "BFS", "Inorder", "Preorder"],
    correctAnswer: "BFS"
  },
  {
    id: 45,
    question: "Which tree traversal gives sorted order in BST?",
    options: ["Preorder", "Postorder", "Inorder", "Level order"],
    correctAnswer: "Inorder"
  },

  {
    id: 46,
    question: "What is hashing?",
    options: [
      "Sorting technique",
      "Searching technique",
      "Mapping keys to values",
      "Traversal method"
    ],
    correctAnswer: "Mapping keys to values"
  },
  {
    id: 47,
    question: "Hashing gives average complexity?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: "O(1)"
  },
  {
    id: 48,
    question: "What causes collision in hashing?",
    options: [
      "Same keys",
      "Different keys",
      "Same hash value",
      "Large array"
    ],
    correctAnswer: "Same hash value"
  },
  {
    id: 49,
    question: "Collision resolution technique?",
    options: [
      "Sorting",
      "Chaining",
      "Searching",
      "Traversal"
    ],
    correctAnswer: "Chaining"
  },
  {
    id: 50,
    question: "What is load factor?",
    options: [
      "Table size",
      "No of elements / table size",
      "Memory size",
      "Hash size"
    ],
    correctAnswer: "No of elements / table size"
  },

  {
    id: 51,
    question: "What is recursion?",
    options: [
      "Looping",
      "Function calling itself",
      "Conditional statement",
      "Pointer"
    ],
    correctAnswer: "Function calling itself"
  },
  {
    id: 52,
    question: "What is base condition?",
    options: [
      "Last call",
      "Stopping condition",
      "First loop",
      "Return value"
    ],
    correctAnswer: "Stopping condition"
  },
  {
    id: 53,
    question: "Recursion uses which memory?",
    options: ["Heap", "Queue", "Stack", "Array"],
    correctAnswer: "Stack"
  },
  {
    id: 54,
    question: "What is tail recursion?",
    options: [
      "Recursive call at end",
      "Recursive call at start",
      "Multiple recursion",
      "No recursion"
    ],
    correctAnswer: "Recursive call at end"
  },
  {
    id: 55,
    question: "What is backtracking?",
    options: [
      "Searching forward",
      "Trying all possibilities",
      "Sorting data",
      "Deleting nodes"
    ],
    correctAnswer: "Trying all possibilities"
  },

  {
    id: 56,
    question: "What is greedy algorithm?",
    options: [
      "Always optimal",
      "Chooses locally optimal",
      "Uses recursion",
      "Uses DP"
    ],
    correctAnswer: "Chooses locally optimal"
  },
  {
    id: 57,
    question: "Dynamic Programming solves?",
    options: [
      "Independent problems",
      "Overlapping subproblems",
      "Sorting",
      "Searching"
    ],
    correctAnswer: "Overlapping subproblems"
  },
  {
    id: 58,
    question: "DP uses which principle?",
    options: [
      "Divide & Conquer",
      "Optimal substructure",
      "Greedy",
      "Backtracking"
    ],
    correctAnswer: "Optimal substructure"
  },
  {
    id: 59,
    question: "Which is NOT linear data structure?",
    options: ["Array", "Stack", "Queue", "Tree"],
    correctAnswer: "Tree"
  },
  {
    id: 60,
    question: "Which is non-linear data structure?",
    options: ["Array", "Queue", "Stack", "Graph"],
    correctAnswer: "Graph"
  },

  {
    id: 61,
    question: "What is adjacency matrix used for?",
    options: [
      "Tree traversal",
      "Graph representation",
      "Sorting",
      "Searching"
    ],
    correctAnswer: "Graph representation"
  },
  {
    id: 62,
    question: "What is adjacency list?",
    options: [
      "Graph representation",
      "Tree traversal",
      "Hash table",
      "Queue"
    ],
    correctAnswer: "Graph representation"
  },
  {
    id: 63,
    question: "Which graph traversal uses stack?",
    options: ["BFS", "DFS", "Linear", "Binary"],
    correctAnswer: "DFS"
  },
  {
    id: 64,
    question: "Which graph traversal uses queue?",
    options: ["DFS", "BFS", "Binary", "Heap"],
    correctAnswer: "BFS"
  },
  {
    id: 65,
    question: "What is cycle in graph?",
    options: [
      "Repeated node",
      "Repeated edge",
      "Closed path",
      "Disconnected graph"
    ],
    correctAnswer: "Closed path"
  },

  {
    id: 66,
    question: "What is a complete binary tree?",
    options: [
      "All nodes have 2 children",
      "All levels filled",
      "Last level filled left to right",
      "Only root exists"
    ],
    correctAnswer: "Last level filled left to right"
  },
  {
    id: 67,
    question: "What is height of tree?",
    options: [
      "No of nodes",
      "No of edges from root to deepest leaf",
      "No of leaves",
      "Depth"
    ],
    correctAnswer: "No of edges from root to deepest leaf"
  },
  {
    id: 68,
    question: "What is degree of node?",
    options: [
      "No of edges connected",
      "No of children",
      "Height",
      "Depth"
    ],
    correctAnswer: "No of children"
  },
  {
    id: 69,
    question: "Which traversal visits root first?",
    options: ["Inorder", "Preorder", "Postorder", "Level"],
    correctAnswer: "Preorder"
  },
  {
    id: 70,
    question: "Which traversal visits root last?",
    options: ["Preorder", "Postorder", "Inorder", "Level"],
    correctAnswer: "Postorder"
  },

  {
    id: 71,
    question: "Which sorting is stable?",
    options: ["Quick sort", "Heap sort", "Merge sort", "Selection sort"],
    correctAnswer: "Merge sort"
  },
  {
    id: 72,
    question: "Which sorting is in-place?",
    options: ["Merge sort", "Quick sort", "Counting sort", "Radix sort"],
    correctAnswer: "Quick sort"
  },
  {
    id: 73,
    question: "What is best case of bubble sort?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctAnswer: "O(n)"
  },
  {
    id: 74,
    question: "What is worst case of quick sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: "O(n²)"
  },
  {
    id: 75,
    question: "Which algorithm is comparison-based?",
    options: ["Counting sort", "Radix sort", "Merge sort", "Bucket sort"],
    correctAnswer: "Merge sort"
  },

  {
    id: 76,
    question: "Which data structure is best for undo?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    correctAnswer: "Stack"
  },
  {
    id: 77,
    question: "Which structure supports fast search?",
    options: ["Array", "Linked list", "Hash table", "Stack"],
    correctAnswer: "Hash table"
  },
  {
    id: 78,
    question: "What is amortized analysis?",
    options: [
      "Worst case",
      "Average performance",
      "Best case",
      "Space analysis"
    ],
    correctAnswer: "Average performance"
  },
  {
    id: 79,
    question: "Which DS is used in BFS?",
    options: ["Stack", "Queue", "Heap", "Tree"],
    correctAnswer: "Queue"
  },
  {
    id: 80,
    question: "Which DS is used in DFS?",
    options: ["Queue", "Stack", "Heap", "Array"],
    correctAnswer: "Stack"
  }
];
const QUESTIONS_PER_LEVEL = 20;
const TOTAL_LEVELS = 4;

const DSA = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

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
        <h2>📘 DSA MCQ – Level {currentLevel}</h2>
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

export default DSA;
