import { useEffect, useState, useRef } from "react";
import {
  FaCode,
  FaBoxOpen,
  FaExchangeAlt,
  FaLayerGroup,
  FaCogs,
  FaProjectDiagram,
  FaShieldAlt,
  FaBolt,
  FaSyncAlt,
  FaDatabase,
  FaLink,
  FaEye,
  FaFilter,
  FaLock,
  FaRedoAlt,
  FaListUl,
  FaCalculator,
  FaSearch,
  FaNetworkWired,
  FaKey
} from "react-icons/fa";

const DbmsNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
  const topics = [
    {
      icon: <FaCode />,
      title: "Introduction to JavaScript",
      questions: [
        {
          q: "What is JavaScript and why is it used?",
          a: "JavaScript is a lightweight, interpreted programming language that runs in browsers and on servers (Node.js). It makes web pages interactive and dynamic.",
          example:
            "Real-life example: Form validation, image sliders, and real-time chat apps all use JavaScript."
        },
        {
          q: "What is the difference between JavaScript and Java?",
          a: "Despite the similar name, they are unrelated. Java is a compiled, strongly-typed OOP language, while JavaScript is interpreted, loosely-typed, and primarily used for web development.",
          example:
            "Real-life example: Java builds Android apps; JavaScript powers websites like Gmail."
        },
        {
          q: "Where can JavaScript code be written?",
          a: "JavaScript can be written inline in HTML using <script> tags, in external .js files, or directly in browser developer consoles.",
          example:
            "Real-life example: A .js file linked in an HTML page via <script src='app.js'>."
        }
      ]
    },

    {
      icon: <FaBoxOpen />,
      title: "Variables and Data Types",
      questions: [
        {
          q: "What are var, let, and const?",
          a: "var is function-scoped and hoisted. let is block-scoped and reassignable. const is block-scoped and cannot be reassigned after declaration.",
          example:
            "Real-life example: Use const for a fixed tax rate, let for a running total, var for older browser compatibility."
        },
        {
          q: "What are JavaScript's primitive data types?",
          a: "String, Number, Boolean, Undefined, Null, Symbol, and BigInt are the seven primitive types.",
          example:
            "Real-life example: A user's name is a String, age is a Number, isLoggedIn is a Boolean."
        },
        {
          q: "What is the difference between null and undefined?",
          a: "undefined means a variable has been declared but not assigned a value. null is an intentional assignment representing 'no value'.",
          example:
            "Real-life example: An unset form field returns undefined; a cleared field might be set to null deliberately."
        }
      ]
    },

    {
      icon: <FaExchangeAlt />,
      title: "Operators and Type Coercion",
      questions: [
        {
          q: "What is the difference between == and ===?",
          a: "== checks value equality with type coercion (converts types if needed). === checks both value and type strictly without coercion.",
          example:
            "Real-life example: '5' == 5 is true, but '5' === 5 is false."
        },
        {
          q: "What is type coercion in JavaScript?",
          a: "JavaScript automatically converts one data type to another during operations. This is called implicit type coercion and can cause unexpected results.",
          example:
            "Real-life example: '5' + 3 gives '53' (string concatenation), but '5' - 3 gives 2 (numeric subtraction)."
        },
        {
          q: "What is the nullish coalescing operator (??)?",
          a: "The ?? operator returns the right-hand value only when the left-hand value is null or undefined, unlike || which triggers on any falsy value.",
          example:
            "Real-life example: let name = user.name ?? 'Guest' — uses 'Guest' only if name is null or undefined."
        }
      ]
    },

    {
      icon: <FaLayerGroup />,
      title: "Scope and Hoisting",
      questions: [
        {
          q: "What is scope in JavaScript?",
          a: "Scope determines the accessibility of variables. JavaScript has global scope, function scope, and block scope (ES6+).",
          example:
            "Real-life example: A variable declared inside a function is not accessible outside it."
        },
        {
          q: "What is hoisting?",
          a: "Hoisting is JavaScript's behavior of moving declarations (not initializations) to the top of their scope before execution. var is hoisted and initialized as undefined; let and const are hoisted but remain in the Temporal Dead Zone until initialized.",
          example:
            "Real-life example: Calling a function before declaring it works due to hoisting of function declarations."
        },
        {
          q: "What is the Temporal Dead Zone (TDZ)?",
          a: "The TDZ is the period between the start of the block and the let/const declaration. Accessing the variable during this period throws a ReferenceError.",
          example:
            "Real-life example: console.log(x); let x = 5; throws ReferenceError."
        }
      ]
    },

    {
      icon: <FaCogs />,
      title: "Functions in JavaScript",
      questions: [
        {
          q: "What is a function declaration vs function expression?",
          a: "A function declaration uses the function keyword and is hoisted. A function expression assigns a function to a variable and is not hoisted.",
          example:
            "Real-life example: greet() works before its declaration (hoisted), but greetFn() before assignment throws an error."
        },
        {
          q: "What is an arrow function?",
          a: "Arrow functions (=>) provide a shorter syntax for writing functions. They do not have their own 'this' or 'arguments' binding, making them useful in callbacks.",
          example:
            "Real-life example: const add = (a, b) => a + b; — a compact function to add two numbers."
        },
        {
          q: "What are default parameters?",
          a: "Default parameters allow function arguments to have preset values if no value or undefined is passed.",
          example:
            "Real-life example: function greet(name = 'User') { } — uses 'User' if name is not provided."
        }
      ]
    },

    {
      icon: <FaEye />,
      title: "Closures",
      questions: [
        {
          q: "What is a closure?",
          a: "A closure is a function that remembers variables from its outer (enclosing) scope even after the outer function has returned.",
          example:
            "Real-life example: A counter function that retains its count value between calls without using global variables."
        },
        {
          q: "Why are closures useful?",
          a: "Closures are used for data encapsulation, creating private variables, memoization, and in callback patterns.",
          example:
            "Real-life example: Module pattern in libraries where internal state is hidden from outside."
        },
        {
          q: "What is a common closure pitfall?",
          a: "Using var inside loops with closures can lead to unexpected behavior because all closures share the same variable. Using let fixes this.",
          example:
            "Real-life example: setTimeout inside a for loop using var prints the same value; using let prints different values."
        }
      ]
    },

    {
      icon: <FaProjectDiagram />,
      title: "Objects and Prototypes",
      questions: [
        {
          q: "What is an object in JavaScript?",
          a: "An object is a collection of key-value pairs (properties and methods) used to represent real-world entities.",
          example:
            "Real-life example: const user = { name: 'Alice', age: 25, greet() { } }"
        },
        {
          q: "What is the prototype chain?",
          a: "Every JavaScript object has a hidden __proto__ link to another object (its prototype). Property lookups travel up this chain until found or null is reached.",
          example:
            "Real-life example: Array methods like .map() are defined on Array.prototype and accessed by all arrays."
        },
        {
          q: "What is the difference between Object.freeze() and Object.seal()?",
          a: "Object.freeze() prevents adding, removing, or modifying properties. Object.seal() prevents adding/removing properties but allows modifying existing ones.",
          example:
            "Real-life example: Freezing a config object to prevent accidental changes."
        }
      ]
    },

    {
      icon: <FaListUl />,
      title: "Arrays and Array Methods",
      questions: [
        {
          q: "What are common array methods in JavaScript?",
          a: "push/pop (add/remove from end), shift/unshift (add/remove from start), map (transform), filter (select), reduce (accumulate), find (locate), forEach (iterate).",
          example:
            "Real-life example: cart.filter(item => item.price > 100) — filter expensive products."
        },
        {
          q: "What is the difference between map() and forEach()?",
          a: "map() returns a new array with transformed elements. forEach() executes a function for each element but returns undefined.",
          example:
            "Real-life example: Use map() when you need a transformed list; use forEach() for side effects like logging."
        },
        {
          q: "What does reduce() do?",
          a: "reduce() processes each element in an array and accumulates a single output value using a callback and an initial accumulator.",
          example:
            "Real-life example: [10, 20, 30].reduce((sum, n) => sum + n, 0) gives 60 — total price calculation."
        }
      ]
    },

    {
      icon: <FaDatabase />,
      title: "ES6+ Features",
      questions: [
        {
          q: "What is destructuring?",
          a: "Destructuring allows unpacking values from arrays or properties from objects into distinct variables in a concise syntax.",
          example:
            "Real-life example: const { name, age } = user; instead of user.name and user.age separately."
        },
        {
          q: "What is the spread operator (...)?",
          a: "The spread operator expands an iterable (array or object) into individual elements. It is used for copying, merging, and passing arguments.",
          example:
            "Real-life example: const merged = { ...defaults, ...userSettings } — merge config objects."
        },
        {
          q: "What are template literals?",
          a: "Template literals use backticks (`) and allow embedded expressions with ${} and multi-line strings without concatenation.",
          example:
            "Real-life example: `Hello, ${name}! You have ${messages} messages.`"
        }
      ]
    },

    {
      icon: <FaKey />,
      title: "Classes and OOP",
      questions: [
        {
          q: "What is a class in JavaScript?",
          a: "A class is syntactic sugar over JavaScript's prototype-based inheritance. It provides a cleaner syntax to create objects with shared methods.",
          example:
            "Real-life example: class Animal { constructor(name) { this.name = name; } speak() { } }"
        },
        {
          q: "What is inheritance in JavaScript?",
          a: "Inheritance allows a class to extend another class using the extends keyword, inheriting properties and methods from the parent.",
          example:
            "Real-life example: class Dog extends Animal — Dog inherits speak() from Animal."
        },
        {
          q: "What does the super keyword do?",
          a: "super() calls the constructor of the parent class. It must be called in a child constructor before using 'this'.",
          example:
            "Real-life example: class Cat extends Animal { constructor(name) { super(name); } }"
        }
      ]
    },

    {
      icon: <FaSyncAlt />,
      title: "Asynchronous JavaScript",
      questions: [
        {
          q: "What is asynchronous programming?",
          a: "Asynchronous programming allows JavaScript to perform long tasks (like API calls) without blocking the main thread, using callbacks, promises, or async/await.",
          example:
            "Real-life example: Loading user data from a server while the page stays interactive."
        },
        {
          q: "What is a Promise?",
          a: "A Promise is an object representing the eventual completion or failure of an async operation. It has three states: pending, fulfilled, and rejected.",
          example:
            "Real-life example: fetch('api/users') returns a Promise that resolves with data or rejects on error."
        },
        {
          q: "What is async/await?",
          a: "async/await is syntactic sugar over Promises. An async function always returns a Promise; await pauses execution until the Promise resolves.",
          example:
            "Real-life example: const data = await fetch('/api'); makes async code look synchronous and readable."
        }
      ]
    },

    {
      icon: <FaNetworkWired />,
      title: "Event Loop and Call Stack",
      questions: [
        {
          q: "How does JavaScript handle concurrency?",
          a: "JavaScript is single-threaded but uses the event loop to handle async operations. The call stack runs synchronous code; the callback queue holds async callbacks ready to run.",
          example:
            "Real-life example: setTimeout callback waits in the queue and only runs after the call stack is empty."
        },
        {
          q: "What is the call stack?",
          a: "The call stack is a data structure that tracks function calls. When a function is invoked, it is pushed onto the stack; when it returns, it is popped off.",
          example:
            "Real-life example: Stack overflow happens when recursive calls fill the stack with no base case."
        }
      ]
    },

    {
      icon: <FaBolt />,
      title: "DOM Manipulation",
      questions: [
        {
          q: "What is the DOM?",
          a: "The Document Object Model (DOM) is a tree-like representation of an HTML page that JavaScript can read and modify.",
          example:
            "Real-life example: Changing button text or hiding an element dynamically using JavaScript."
        },
        {
          q: "How do you select and modify DOM elements?",
          a: "Use getElementById, querySelector, querySelectorAll to select elements. Use innerHTML, textContent, style, or classList to modify them.",
          example:
            "Real-life example: document.querySelector('.btn').classList.add('active') adds a CSS class."
        },
        {
          q: "What is event delegation?",
          a: "Event delegation attaches a single event listener to a parent element instead of multiple listeners on each child, using event bubbling.",
          example:
            "Real-life example: Listening for clicks on a list container rather than each list item."
        }
      ]
    },

    {
      icon: <FaFilter />,
      title: "Error Handling",
      questions: [
        {
          q: "How is error handling done in JavaScript?",
          a: "Using try...catch...finally blocks. Code in try is executed; if an error occurs, catch handles it; finally always runs regardless.",
          example:
            "Real-life example: Wrapping an API call in try/catch to show an error message if it fails."
        },
        {
          q: "What is the difference between throw and catch?",
          a: "throw is used to create a custom error. catch is used to handle errors thrown in the try block.",
          example:
            "Real-life example: throw new Error('Invalid input') to validate user data."
        }
      ]
    },

    {
      icon: <FaShieldAlt />,
      title: "Modules in JavaScript",
      questions: [
        {
          q: "What are JavaScript modules?",
          a: "Modules allow splitting code into separate files using export and import statements (ES6). Each module has its own scope.",
          example:
            "Real-life example: export const API_URL = '...' in config.js and import { API_URL } from './config.js'."
        },
        {
          q: "What is the difference between default and named exports?",
          a: "Named exports allow multiple exports per file with specific names. Default export allows one main export per file imported without braces.",
          example:
            "Real-life example: export default App for the main component; named exports for utilities."
        }
      ]
    },

    {
      icon: <FaLock />,
      title: "Local Storage and Session Storage",
      questions: [
        {
          q: "What is localStorage?",
          a: "localStorage stores key-value pairs in the browser with no expiration. Data persists even after the browser is closed.",
          example:
            "Real-life example: Saving user theme preference (dark/light mode)."
        },
        {
          q: "What is the difference between localStorage and sessionStorage?",
          a: "localStorage persists indefinitely until manually cleared. sessionStorage is cleared when the browser tab is closed.",
          example:
            "Real-life example: Use sessionStorage for temporary login session data."
        }
      ]
    },

    {
      icon: <FaRedoAlt />,
      title: "Higher-Order Functions",
      questions: [
        {
          q: "What is a higher-order function?",
          a: "A higher-order function is a function that takes another function as an argument or returns a function as its result.",
          example:
            "Real-life example: Array.map(), filter(), and reduce() are all higher-order functions."
        },
        {
          q: "What is currying?",
          a: "Currying transforms a function with multiple arguments into a sequence of functions each taking one argument.",
          example:
            "Real-life example: const multiply = a => b => a * b; multiply(3)(4) returns 12."
        }
      ]
    },

    {
      icon: <FaLink />,
      title: "Fetch API and AJAX",
      questions: [
        {
          q: "What is the Fetch API?",
          a: "The Fetch API is a modern interface for making HTTP requests. It returns a Promise and replaces the older XMLHttpRequest.",
          example:
            "Real-life example: fetch('/api/products').then(res => res.json()).then(data => console.log(data))."
        },
        {
          q: "What is AJAX?",
          a: "AJAX (Asynchronous JavaScript and XML) allows web pages to fetch data from a server without reloading the page.",
          example:
            "Real-life example: Live search suggestions as you type in Google."
        }
      ]
    },

    {
      icon: <FaCalculator />,
      title: "Generators and Iterators",
      questions: [
        {
          q: "What is a generator function?",
          a: "A generator function (function*) can pause execution at each yield statement and resume from where it left off.",
          example:
            "Real-life example: Generating paginated data one page at a time without loading all records."
        },
        {
          q: "What is an iterator?",
          a: "An iterator is an object with a next() method that returns { value, done } on each call, enabling sequential data access.",
          example:
            "Real-life example: Custom range iterator that yields numbers from 1 to N."
        }
      ]
    },

    {
      icon: <FaSearch />,
      title: "Symbols, WeakMap and WeakSet",
      questions: [
        {
          q: "What is a Symbol?",
          a: "Symbol is a unique and immutable primitive data type. Each Symbol() call creates a guaranteed unique value, useful as object property keys.",
          example:
            "Real-life example: Using Symbol to create unique event type identifiers in a library."
        },
        {
          q: "What is a WeakMap?",
          a: "A WeakMap holds weakly referenced object keys, meaning entries can be garbage collected if no other reference to the key exists.",
          example:
            "Real-life example: Storing private data associated with DOM nodes without preventing garbage collection."
        }
      ]
    },

    {
      icon: <FaCogs />,
      title: "Design Patterns in JavaScript",
      questions: [
        {
          q: "What is the Module pattern?",
          a: "The Module pattern uses closures to encapsulate private state and expose only a public API, preventing global scope pollution.",
          example:
            "Real-life example: const Counter = (() => { let count = 0; return { increment() { count++; }, get() { return count; } }; })();"
        },
        {
          q: "What is the Observer pattern?",
          a: "The Observer pattern defines a one-to-many dependency; when one object changes state, all its dependents are notified automatically.",
          example:
            "Real-life example: Event listeners in the browser — multiple handlers react to a single button click."
        }
      ]
    },{
    icon: <FaCode />,
    title: "this Keyword",
    questions: [
      { q: "What does 'this' refer to in JavaScript?", a: "'this' refers to the object that is currently executing the function. Its value depends on how the function is called, not where it is defined.", example: "Real-life example: Inside a method, 'this' refers to the object owning the method." },
      { q: "How does 'this' behave in arrow functions?", a: "Arrow functions do not have their own 'this'. They inherit 'this' from the surrounding lexical scope.", example: "Real-life example: An arrow function inside a class method uses the class instance as 'this'." },
      { q: "What are call(), apply(), and bind()?", a: "call() and apply() invoke a function with an explicit 'this'. bind() returns a new function with 'this' permanently bound.", example: "Real-life example: greet.call(user) calls greet with user as 'this'." }
    ]
  },
  {
    icon: <FaSyncAlt />,
    title: "Event Handling",
    questions: [
      { q: "How do you add event listeners in JavaScript?", a: "Using addEventListener(event, callback) on a DOM element. It supports multiple listeners on the same element.", example: "Real-life example: btn.addEventListener('click', handleClick)." },
      { q: "What is event bubbling?", a: "Event bubbling means an event triggered on a child element propagates up to parent elements unless stopped with stopPropagation().", example: "Real-life example: Clicking a button inside a div triggers both the button and div click handlers." },
      { q: "What is the difference between preventDefault() and stopPropagation()?", a: "preventDefault() stops the default browser action (like form submit). stopPropagation() stops the event from bubbling up the DOM.", example: "Real-life example: Preventing a form from reloading the page on submit." }
    ]
  },
  {
    icon: <FaBolt />,
    title: "Debouncing and Throttling",
    questions: [
      { q: "What is debouncing?", a: "Debouncing delays the execution of a function until after a specified time has passed since the last call. Useful for search inputs.", example: "Real-life example: Search bar — API is called only after the user stops typing for 300ms." },
      { q: "What is throttling?", a: "Throttling limits how often a function can execute — it runs at most once in a given time interval regardless of how many times it is triggered.", example: "Real-life example: Scroll event handler running at most once every 200ms." },
      { q: "When to use debounce vs throttle?", a: "Use debounce when you want to wait for activity to stop (search, resize). Use throttle when you want regular execution during continuous activity (scroll, mousemove).", example: "Real-life example: Window resize → debounce. Game character movement → throttle." }
    ]
  },
  {
    icon: <FaDatabase />,
    title: "JSON and Data Handling",
    questions: [
      { q: "What is JSON?", a: "JSON (JavaScript Object Notation) is a lightweight data format for storing and transmitting data. It is text-based and language-independent.", example: "Real-life example: API responses are usually sent as JSON strings." },
      { q: "What is JSON.stringify() and JSON.parse()?", a: "JSON.stringify() converts a JavaScript object to a JSON string. JSON.parse() converts a JSON string back to a JavaScript object.", example: "Real-life example: Saving an object to localStorage requires stringify; reading it back requires parse." },
      { q: "What are common JSON pitfalls?", a: "JSON does not support undefined, functions, or circular references. These are silently omitted or throw errors during stringify.", example: "Real-life example: { fn: () => {} } stringifies to {} because functions are dropped." }
    ]
  },
  {
    icon: <FaShieldAlt />,
    title: "Security in JavaScript",
    questions: [
      { q: "What is XSS (Cross-Site Scripting)?", a: "XSS is an attack where malicious scripts are injected into web pages viewed by other users. Avoid using innerHTML with user data.", example: "Real-life example: An attacker injects a script tag via a comment field that steals cookies." },
      { q: "What is CSRF?", a: "CSRF (Cross-Site Request Forgery) tricks a user into making an unintended request to another site where they are authenticated.", example: "Real-life example: A malicious link that submits a bank transfer on the user's behalf." },
      { q: "How to protect against XSS?", a: "Use textContent instead of innerHTML, sanitize user inputs, and use Content Security Policy (CSP) headers.", example: "Real-life example: element.textContent = userInput is safe; element.innerHTML = userInput is dangerous." }
    ]
  },
  {
    icon: <FaLayerGroup />,
    title: "Memory Management",
    questions: [
      { q: "How does JavaScript manage memory?", a: "JavaScript automatically allocates memory when objects are created and frees it via garbage collection when objects are no longer reachable.", example: "Real-life example: A variable going out of scope is eligible for garbage collection." },
      { q: "What is a memory leak?", a: "A memory leak occurs when memory that is no longer needed is not released. Common causes include forgotten event listeners, global variables, and closures holding large references.", example: "Real-life example: Adding event listeners in a loop without removing them causes the DOM to retain memory." },
      { q: "How to prevent memory leaks?", a: "Remove event listeners when not needed, avoid unnecessary global variables, and clear timers with clearTimeout/clearInterval.", example: "Real-life example: Call removeEventListener in React's useEffect cleanup function." }
    ]
  },
  {
    icon: <FaProjectDiagram />,
    title: "Prototype vs Class Inheritance",
    questions: [
      { q: "What is prototypal inheritance?", a: "In prototypal inheritance, objects directly inherit from other objects via the prototype chain rather than through class blueprints.", example: "Real-life example: const dog = Object.create(animal) — dog inherits from animal directly." },
      { q: "How does ES6 class inheritance differ?", a: "ES6 classes are syntactic sugar over prototypal inheritance. They use extends and super but still use the prototype chain internally.", example: "Real-life example: class Dog extends Animal is cleaner syntax but behaves the same as prototype-based code." },
      { q: "What is Object.create()?", a: "Object.create(proto) creates a new object with the specified prototype, allowing manual prototype chain setup.", example: "Real-life example: const obj = Object.create(baseObj) inherits all baseObj methods." }
    ]
  },
  {
    icon: <FaKey />,
    title: "Proxy and Reflect",
    questions: [
      { q: "What is a Proxy in JavaScript?", a: "A Proxy wraps an object and intercepts operations like get, set, and delete using handler traps, allowing custom behavior.", example: "Real-life example: Validating property assignments before they are set on an object." },
      { q: "What is Reflect?", a: "Reflect is a built-in object that provides methods for interceptable JavaScript operations, mirroring the Proxy traps.", example: "Real-life example: Reflect.set(target, key, value) inside a Proxy handler to set the value normally." },
      { q: "What are common use cases for Proxy?", a: "Validation, logging, access control, data binding, and building reactive systems like Vue 3's reactivity.", example: "Real-life example: Vue 3 uses Proxy to detect when reactive data changes and update the UI." }
    ]
  },
  ];

  const totalPages = Math.ceil(topics.length / topicsPerPage);
  const startIndex = (currentPage - 1) * topicsPerPage;
  const paginatedTopics = topics.slice(startIndex, startIndex + topicsPerPage);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  return (
    <main style={styles.container} ref={topRef}>
      <header style={styles.header}>
        <h1 style={styles.title}>JavaScript</h1>
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
              backgroundColor: currentPage === i + 1 ? "#f59e0b" : "#fff",
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
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
    backgroundColor: "#ebeaea",
    scrollMarginTop: "80px",
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
    color: "#f59e0b"
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
  },
  pagination: {
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

export default DbmsNotes;
