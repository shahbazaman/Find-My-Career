import React, { useState, useEffect, useRef } from "react";
import {
  FaProjectDiagram,
  FaListUl,
  FaLayerGroup,
  FaExchangeAlt,
  FaClock,
  FaSortAmountUp,
  FaTree,
  FaSitemap,
  FaKey,
  FaRedo,
  FaCompressArrowsAlt,
  FaSearch,
  FaCubes,
  FaBug
} from "react-icons/fa";

const DsaNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
const topics = [
  {
    icon: <FaListUl />,
    title: "Arrays",
    questions: [
      {
        q: "What is an array and why is it used?",
        a: "An array is a linear data structure that stores elements of the same data type in contiguous memory locations. It allows fast access to elements using an index, making read operations very efficient.",
        example:
          "Real-life example: A row of lockers where each locker has a number and can be accessed directly."
      },
      {
        q: "What are the advantages and disadvantages of arrays?",
        a: "Arrays provide fast access (O(1)) using indexes, but they have a fixed size and insertion or deletion in the middle is costly (O(n)).",
        example:
          "Real-life example: Fixed classroom seating where finding a student is easy but adding a new seat is difficult."
      },
      {
        q: "What is the difference between 1D and 2D arrays?",
        a: "A 1D array stores elements in a single line, while a 2D array stores data in rows and columns like a matrix.",
        example:
          "Real-life example: A list of marks (1D) vs a spreadsheet table (2D)."
      }
    ]
  },

  {
    icon: <FaLayerGroup />,
    title: "Linked Lists",
    questions: [
      {
        q: "What is a linked list?",
        a: "A linked list is a linear data structure where elements (nodes) are stored in non-contiguous memory locations, and each node points to the next node.",
        example:
          "Real-life example: A chain where each link connects to the next."
      },
      {
        q: "What are the types of linked lists?",
        a: "Singly linked list, doubly linked list, and circular linked list.",
        example:
          "Real-life example: A one-way train route vs a two-way route."
      },
      {
        q: "What are the advantages of linked lists over arrays?",
        a: "Linked lists allow dynamic memory allocation and efficient insertion and deletion.",
        example:
          "Real-life example: Adding or removing people from a queue without rearranging everyone."
      }
    ]
  },

  {
    icon: <FaExchangeAlt />,
    title: "Stack & Queue",
    questions: [
      {
        q: "What is a stack?",
        a: "A stack is a linear data structure that follows the LIFO (Last In, First Out) principle.",
        example:
          "Real-life example: A stack of plates where the top plate is removed first."
      },
      {
        q: "What is a queue?",
        a: "A queue is a linear data structure that follows the FIFO (First In, First Out) principle.",
        example:
          "Real-life example: People standing in line at a ticket counter."
      },
      {
        q: "Where are stacks and queues used in real applications?",
        a: "Stacks are used in function calls and undo/redo operations, while queues are used in scheduling and buffering.",
        example:
          "Real-life example: Call stack in programming and printer job queue."
      }
    ]
  },

  {
    icon: <FaProjectDiagram />,
    title: "Searching Algorithms",
    questions: [
      {
        q: "What is linear search?",
        a: "Linear search checks each element one by one until the target element is found or the list ends.",
        example:
          "Real-life example: Searching for a contact by scrolling through your phone contacts."
      },
      {
        q: "What is binary search?",
        a: "Binary search works on sorted arrays by repeatedly dividing the search space into halves.",
        example:
          "Real-life example: Searching a word in a dictionary."
      },
      {
        q: "When should binary search be preferred over linear search?",
        a: "Binary search should be used when the data is sorted and fast performance is required.",
        example:
          "Real-life example: Searching roll numbers in a sorted list."
      }
    ]
  },

  {
    icon: <FaClock />,
    title: "Time Complexity",
    questions: [
      {
        q: "What is time complexity?",
        a: "Time complexity measures how the runtime of an algorithm increases with input size.",
        example:
          "Real-life example: More students mean more time to check answer sheets."
      },
      {
        q: "What are common time complexity notations?",
        a: "Common notations include O(1), O(log n), O(n), O(n log n), and O(n²).",
        example:
          "Real-life example: O(1) like direct access vs O(n) like checking every item."
      },
      {
        q: "Why is time complexity important in interviews?",
        a: "It helps interviewers judge how efficient and scalable your solution is.",
        example:
          "Real-life example: Choosing a faster route when traffic increases."
      }
    ]
  },{
  icon: <FaSortAmountUp />,
  title: "Sorting Algorithms",
  questions: [
    {
      q: "What is sorting and why is it important?",
      a: "Sorting is the process of arranging data in a specific order such as ascending or descending. It helps improve efficiency of searching and data processing.",
      example:
        "Real-life example: Sorting exam scores from highest to lowest."
    },
    {
      q: "What are common sorting algorithms?",
      a: "Common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.",
      example:
        "Real-life example: Organizing files by date or name."
    },
    {
      q: "Which sorting algorithms are efficient for large data?",
      a: "Merge Sort and Quick Sort are generally efficient for large datasets due to better time complexity.",
      example:
        "Real-life example: Sorting large database records."
    }
  ]
},

{
  icon: <FaTree />,
  title: "Trees (Basics)",
  questions: [
    {
      q: "What is a tree data structure?",
      a: "A tree is a hierarchical data structure consisting of nodes connected by edges, with a single root node at the top.",
      example:
        "Real-life example: Folder structure in a computer."
    },
    {
      q: "What is a binary tree?",
      a: "A binary tree is a tree where each node has at most two children.",
      example:
        "Real-life example: Family tree representation."
    },
    {
      q: "Why are trees used in applications?",
      a: "Trees allow efficient searching, insertion, and hierarchical data representation.",
      example:
        "Real-life example: Database indexing using trees."
    }
  ]
},

{
  icon: <FaSitemap />,
  title: "Graphs (Basics)",
  questions: [
    {
      q: "What is a graph in data structures?",
      a: "A graph is a collection of nodes (vertices) and connections (edges) between them.",
      example:
        "Real-life example: Social media network connections."
    },
    {
      q: "What is the difference between directed and undirected graphs?",
      a: "Directed graphs have one-way edges, while undirected graphs have two-way edges.",
      example:
        "Real-life example: Twitter follow (directed) vs Facebook friends (undirected)."
    },
    {
      q: "Where are graphs commonly used?",
      a: "Graphs are used in navigation systems, social networks, and recommendation engines.",
      example:
        "Real-life example: Google Maps route finding."
    }
  ]
},

{
  icon: <FaKey />,
  title: "Hashing",
  questions: [
    {
      q: "What is hashing?",
      a: "Hashing is a technique used to map data to a fixed-size value using a hash function for fast access.",
      example:
        "Real-life example: Password storage using hash values."
    },
    {
      q: "What is a hash table?",
      a: "A hash table stores key-value pairs and allows fast insertion, deletion, and searching.",
      example:
        "Real-life example: Storing user credentials."
    },
    {
      q: "What are collisions in hashing?",
      a: "A collision occurs when two keys generate the same hash value.",
     example:
        "Real-life example: Two people assigned the same locker number."
    }
  ]
},

{
  icon: <FaRedo />,
  title: "Recursion",
  questions: [
    {
      q: "What is recursion?",
      a: "Recursion is a programming technique where a function calls itself to solve smaller subproblems.",
      example:
        "Real-life example: Russian nesting dolls."
    },
    {
      q: "What is a base case in recursion?",
      a: "A base case stops the recursive calls and prevents infinite recursion.",
      example:
        "Real-life example: Reaching the smallest doll."
    },
    {
      q: "When should recursion be avoided?",
      a: "Recursion should be avoided when it leads to high memory usage or stack overflow.",
      example:
        "Real-life example: Deeply nested function calls."
    }
  ]
},{
  icon: <FaCompressArrowsAlt />,
  title: "Two Pointer Technique",
  questions: [
    {
      q: "What is the two pointer technique?",
      a: "The two pointer technique uses two indices to traverse a data structure efficiently, usually from different ends or at different speeds.",
      example:
        "Real-life example: Finding two numbers in a sorted array that sum to a target."
    },
    {
      q: "When is the two pointer technique useful?",
      a: "It is useful when dealing with sorted arrays or problems involving pairs, subarrays, or conditions based on ranges.",
      example:
        "Real-life example: Removing duplicates from a sorted list."
    },
    {
      q: "Why is this technique popular in interviews?",
      a: "It reduces time complexity from O(n²) to O(n) in many problems.",
      example:
        "Real-life example: Optimizing search operations."
    }
  ]
},

{
  icon: <FaSearch />,
  title: "Sliding Window Technique",
  questions: [
    {
      q: "What is the sliding window technique?",
      a: "Sliding window is used to maintain a range of elements that moves over the data structure to solve problems efficiently.",
      example:
        "Real-life example: Finding maximum sum subarray of size k."
    },
    {
      q: "What types of sliding windows exist?",
      a: "Fixed-size window and variable-size window.",
      example:
        "Real-life example: Network packet monitoring over time."
    },
    {
      q: "Why is sliding window better than brute force?",
      a: "It avoids repeated calculations and improves performance.",
      example:
        "Real-life example: Continuous performance tracking."
    }
  ]
},

{
  icon: <FaLayerGroup />,
  title: "Greedy Algorithms (Basics)",
  questions: [
    {
      q: "What is a greedy algorithm?",
      a: "A greedy algorithm makes the locally optimal choice at each step hoping to find a global optimum.",
      example:
        "Real-life example: Choosing minimum coins to make change."
    },
    {
      q: "When do greedy algorithms work best?",
      a: "When a problem has the greedy-choice property and optimal substructure.",
      example:
        "Real-life example: Activity selection problems."
    },
    {
      q: "What is a limitation of greedy algorithms?",
      a: "They do not always guarantee the optimal solution for all problems.",
      example:
        "Real-life example: Certain knapsack problems."
    }
  ]
},

{
  icon: <FaCubes />,
  title: "Dynamic Programming (Intro)",
  questions: [
    {
      q: "What is dynamic programming?",
      a: "Dynamic programming solves complex problems by breaking them into overlapping subproblems and storing their results.",
      example:
        "Real-life example: Fibonacci series calculation."
    },
    {
      q: "What is the difference between recursion and dynamic programming?",
      a: "Dynamic programming stores results of subproblems to avoid repeated computation.",
      example:
        "Real-life example: Memoization in applications."
    },
    {
      q: "Why is DP considered difficult?",
      a: "Because it requires identifying states, transitions, and optimization goals.",
      example:
        "Real-life example: Route optimization problems."
    }
  ]
},

{
  icon: <FaBug />,
  title: "Debugging Basics",
  questions: [
    {
      q: "What is debugging?",
      a: "Debugging is the process of finding and fixing errors in a program.",
      example:
        "Real-life example: Fixing a crash in an application."
    },
    {
      q: "What are common types of bugs?",
      a: "Syntax errors, runtime errors, and logical errors.",
      example:
        "Real-life example: Wrong output due to incorrect condition."
    },
    {
      q: "Why is debugging important for developers?",
      a: "It improves code correctness, reliability, and problem-solving skills.",
      example:
        "Real-life example: Maintaining stable software systems."
    }
  ]
},{
    icon: <FaTree />,
    title: "Binary Search Tree (BST)",
    questions: [
      { q: "What is a Binary Search Tree?", a: "A BST is a binary tree where the left child is always smaller than the parent and the right child is always larger.", example: "Real-life example: Phone book sorted so you can go left for earlier names, right for later names." },
      { q: "What are the common BST operations?", a: "Search, Insert, and Delete — all have average time complexity of O(log n) in a balanced BST.", example: "Real-life example: Finding a specific employee ID in a sorted employee database." },
      { q: "What is the worst case for BST?", a: "When the tree becomes skewed (like a linked list), operations degrade to O(n).", example: "Real-life example: Inserting sorted data 1,2,3,4,5 creates a right-skewed tree." }
    ]
  },
  {
    icon: <FaSitemap />,
    title: "Tree Traversals",
    questions: [
      { q: "What are the types of tree traversal?", a: "Inorder (Left-Root-Right), Preorder (Root-Left-Right), and Postorder (Left-Right-Root) are the three depth-first traversals.", example: "Real-life example: Inorder traversal of a BST gives elements in sorted order." },
      { q: "What is BFS (Level Order Traversal)?", a: "BFS visits nodes level by level from top to bottom using a queue.", example: "Real-life example: Printing an org chart level by level." },
      { q: "Where are traversals used in real applications?", a: "Inorder is used for sorting, Preorder for copying trees, Postorder for deleting trees, BFS for shortest path problems.", example: "Real-life example: File system directory traversal." }
    ]
  },
  {
    icon: <FaProjectDiagram />,
    title: "Graph Traversals (BFS & DFS)",
    questions: [
      { q: "What is BFS in graphs?", a: "Breadth-First Search explores all neighbors of a node before moving deeper. It uses a queue and finds shortest paths in unweighted graphs.", example: "Real-life example: Finding the closest friend suggestion on a social network." },
      { q: "What is DFS in graphs?", a: "Depth-First Search explores as far as possible along each branch before backtracking. It uses a stack or recursion.", example: "Real-life example: Solving a maze by going deep into each path before trying another." },
      { q: "When to use BFS vs DFS?", a: "Use BFS for shortest path and level-order problems. Use DFS for connectivity, topological sort, and cycle detection.", example: "Real-life example: BFS for GPS shortest route, DFS for detecting circular dependencies." }
    ]
  },
  {
    icon: <FaExchangeAlt />,
    title: "Merge Sort and Quick Sort",
    questions: [
      { q: "How does Merge Sort work?", a: "Merge Sort divides the array into two halves, recursively sorts each half, then merges them. Time complexity is O(n log n) always.", example: "Real-life example: Sorting two sorted halves of exam papers together." },
      { q: "How does Quick Sort work?", a: "Quick Sort picks a pivot, partitions elements smaller/larger around it, then recursively sorts each partition. Average O(n log n).", example: "Real-life example: Partitioning students above/below average marks." },
      { q: "Which is better — Merge Sort or Quick Sort?", a: "Merge Sort is stable and consistent but uses extra space. Quick Sort is faster in practice with in-place sorting but can be O(n²) worst case.", example: "Real-life example: Merge Sort for linked lists, Quick Sort for arrays." }
    ]
  },
  {
    icon: <FaCubes />,
    title: "Dynamic Programming (Classic Problems)",
    questions: [
      { q: "What is the 0/1 Knapsack problem?", a: "Given items with weights and values, maximize value within a weight limit. Each item can only be taken once (0 or 1).", example: "Real-life example: Packing a bag for a trip with limited weight." },
      { q: "What is the Longest Common Subsequence (LCS)?", a: "LCS finds the longest sequence common to two strings without rearranging characters.", example: "Real-life example: DNA sequence comparison in bioinformatics." },
      { q: "What is memoization vs tabulation?", a: "Memoization is top-down DP — recursion with caching. Tabulation is bottom-up DP — filling a table iteratively.", example: "Real-life example: Fibonacci using memo vs filling an array from index 0 upward." }
    ]
  },
  {
    icon: <FaRedo />,
    title: "Backtracking",
    questions: [
      { q: "What is backtracking?", a: "Backtracking builds solutions incrementally and abandons a path (backtracks) as soon as it determines it cannot lead to a valid solution.", example: "Real-life example: Solving a Sudoku puzzle by trying numbers and undoing when stuck." },
      { q: "How is backtracking different from brute force?", a: "Brute force tries all possibilities. Backtracking prunes invalid paths early, making it more efficient.", example: "Real-life example: N-Queens problem — placing queens and backtracking on conflict." },
      { q: "What are common backtracking problems?", a: "N-Queens, Sudoku Solver, Permutations, Combinations, and Rat in a Maze.", example: "Real-life example: Word search in a grid of letters." }
    ]
  },
  {
    icon: <FaCompressArrowsAlt />,
    title: "Heap and Priority Queue",
    questions: [
      { q: "What is a heap?", a: "A heap is a complete binary tree where the parent is always greater (max-heap) or smaller (min-heap) than its children.", example: "Real-life example: Hospital emergency queue — most critical patient treated first." },
      { q: "What is a priority queue?", a: "A priority queue is an abstract data type where elements are served based on priority, not insertion order. Implemented using a heap.", example: "Real-life example: OS process scheduling by priority." },
      { q: "What are common heap operations and their complexity?", a: "Insert: O(log n), Delete max/min: O(log n), Peek max/min: O(1).", example: "Real-life example: Finding the top K largest numbers from a stream." }
    ]
  },
  {
    icon: <FaKey />,
    title: "Trie (Prefix Tree)",
    questions: [
      { q: "What is a Trie?", a: "A Trie is a tree-like data structure used to store strings where each node represents a character. It enables fast prefix-based searching.", example: "Real-life example: Autocomplete feature in search engines." },
      { q: "What are the advantages of a Trie?", a: "Search, insert, and delete take O(L) time where L is the length of the word — faster than hash tables for prefix queries.", example: "Real-life example: Spell checker finding all words starting with 'pre'." },
      { q: "Where are Tries used?", a: "Used in autocomplete, spell checking, IP routing, and word games like Boggle.", example: "Real-life example: Browser address bar suggesting URLs as you type." }
    ]
  },
  {
    icon: <FaSearch />,
    title: "Bit Manipulation",
    questions: [
      { q: "What is bit manipulation?", a: "Bit manipulation uses bitwise operators (AND, OR, XOR, NOT, shifts) to solve problems at the binary level efficiently.", example: "Real-life example: Checking if a number is even/odd using n & 1." },
      { q: "What are common bit manipulation tricks?", a: "n & (n-1) clears the lowest set bit. n ^ n = 0. Left shift multiplies by 2, right shift divides by 2.", example: "Real-life example: Counting set bits in a number (Brian Kernighan's algorithm)." },
      { q: "Why is bit manipulation asked in interviews?", a: "It tests deep understanding of binary representation and produces very fast, memory-efficient solutions.", example: "Real-life example: Finding the single non-duplicate in an array using XOR." }
    ]
  },
  {
    icon: <FaSortAmountUp />,
    title: "Space Complexity",
    questions: [
      { q: "What is space complexity?", a: "Space complexity measures the total memory an algorithm uses relative to input size, including auxiliary space and input space.", example: "Real-life example: A recursive function using call stack space." },
      { q: "What is auxiliary space?", a: "Auxiliary space is the extra memory used by an algorithm beyond the input data.", example: "Real-life example: Merge Sort uses O(n) auxiliary space for the merge step." },
      { q: "How do you optimize space complexity?", a: "Use in-place algorithms, iterative instead of recursive solutions, and avoid redundant data copies.", example: "Real-life example: Reversing an array in-place using two pointers instead of a new array." }
    ]
  },
];

  const totalPages = Math.ceil(topics.length / topicsPerPage);
  const startIndex = (currentPage - 1) * topicsPerPage;
  const paginatedTopics = topics.slice(
    startIndex,
    startIndex + topicsPerPage
  );

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  return (
    <main style={styles.container} ref={topRef}>
      <header style={styles.header}>
        <h1 style={styles.title}>Data Structures & Algorithms</h1>
        <p style={styles.subtitle}>
          Starter notes for beginners with interview-focused explanations
        </p>
      </header>

      <section style={styles.topicsGrid}>
        {paginatedTopics.map((topic, index) => (
          <article key={index} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>{topic.icon}</span>
              <h2 style={styles.cardTitle}>{topic.title}</h2>
            </div>

            {topic.questions.map((item, idx) => (
              <div key={idx} style={styles.qaBlock}>
                <h3 style={styles.question}>Q. {item.q}</h3>
                <p style={styles.answer}>{item.a}</p>
                <p style={styles.example}>
                  <strong>Example:</strong> {item.example}
                </p>
              </div>
            ))}
          </article>
        ))}
      </section>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.pageBtn}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            style={{
              ...styles.pageBtn,
              backgroundColor:
                currentPage === i + 1 ? "#4f46e5" : "#fff",
              color: currentPage === i + 1 ? "#fff" : "#333"
            }}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          style={styles.pageBtn}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
};


const styles = {
  container: {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",backgroundColor:"#ebeaea",
    scrollMarginTop: "80px"
  },
  header: {
    textAlign: "center",
    marginBottom: "32px"
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "8px"
  },
  subtitle: {
    color: "#555",
    fontSize: "1rem"
  },
  topicsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px"
  },
  icon: {
    fontSize: "1.6rem",
    color: "#4f46e5"
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "600"
  },
  qaBlock: {
    marginTop: "10px"
  },
  question: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "6px"
  },
  answer: {
    fontSize: "0.95rem",
    color: "#333",
    lineHeight: "1.6"
  },
  example: {
    fontSize: "0.9rem",
    marginTop: "6px",
    color: "#555",
    backgroundColor: "#f9fafb",
    padding: "8px",
    borderRadius: "8px"
  },  pagination: {
    marginTop: "32px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap"
  },
  pageBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
    backgroundColor: "#fff"
  }
};

export default DsaNotes;