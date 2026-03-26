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
 import { useNavigate } from "react-router-dom";
 import useCourseProgress from "../hooks/useCourseProgress";
const DbmsNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
  const navigate  = useNavigate();

const handleBack = () => {
  navigate("/jobPrep");
};
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
  {
  icon: <FaCode />,
  title: "Promises in Depth",
  questions: [
    { q: "What is Promise.all()?", a: "Promise.all() takes an array of promises and resolves when all resolve, or rejects immediately if any one rejects.", example: "Real-life example: Fetching user data, posts, and comments simultaneously and waiting for all three." },
    { q: "What is Promise.allSettled()?", a: "Promise.allSettled() waits for all promises to settle (resolve or reject) and returns an array of their results.", example: "Real-life example: Sending emails to multiple users and collecting all successes and failures." },
    { q: "What is Promise.race()?", a: "Promise.race() resolves or rejects as soon as the first promise in the array settles.", example: "Real-life example: Setting a timeout — race between the API call and a timeout promise." }
  ]
},
{
  icon: <FaFilter />,
  title: "Immutability",
  questions: [
    { q: "What is immutability in JavaScript?", a: "Immutability means once a value is created it cannot be changed. Immutable code is more predictable and easier to debug.", example: "Real-life example: Using spread operator to update state in React instead of mutating directly." },
    { q: "How do you clone an object immutably?", a: "Use spread operator ({ ...obj }), Object.assign(), or structuredClone() for deep cloning.", example: "Real-life example: const updated = { ...user, age: 30 } — updates age without changing the original." },
    { q: "What is the difference between shallow and deep copy?", a: "Shallow copy copies only the top-level properties. Nested objects still reference the original. Deep copy creates entirely new copies of all nested levels.", example: "Real-life example: JSON.parse(JSON.stringify(obj)) performs a deep copy but fails with functions and circular refs." }
  ]
},
{
  icon: <FaSyncAlt />,
  title: "Callbacks",
  questions: [
    { q: "What is a callback function?", a: "A callback is a function passed as an argument to another function and executed after the parent function completes.", example: "Real-life example: setTimeout(() => console.log('Done'), 1000) — anonymous callback runs after 1 second." },
    { q: "What is callback hell?", a: "Callback hell refers to deeply nested callbacks that make code hard to read and maintain.", example: "Real-life example: Reading a file, then parsing it, then saving results — nested three levels deep." },
    { q: "How do you avoid callback hell?", a: "Use Promises or async/await to flatten nested callbacks and improve readability.", example: "Real-life example: Replacing nested .then() chains or callbacks with async/await syntax." }
  ]
},
{
  icon: <FaBoxOpen />,
  title: "Truthy and Falsy Values",
  questions: [
    { q: "What are falsy values in JavaScript?", a: "Falsy values are: false, 0, '' (empty string), null, undefined, NaN, and 0n (BigInt zero). All other values are truthy.", example: "Real-life example: if (username) — fails if username is an empty string or null." },
    { q: "What is short-circuit evaluation?", a: "Logical operators && and || use short-circuit evaluation. && returns the first falsy value or the last value. || returns the first truthy value.", example: "Real-life example: user && user.name — safely accesses name only if user exists." },
    { q: "What is optional chaining (?.)?", a: "Optional chaining (?.) safely accesses nested properties without throwing if an intermediate value is null or undefined.", example: "Real-life example: user?.address?.city returns undefined instead of throwing an error if address is null." }
  ]
},
{
  icon: <FaLayerGroup />,
  title: "Execution Context",
  questions: [
    { q: "What is an execution context?", a: "An execution context is the environment where JavaScript code runs. It contains the variable environment, scope chain, and 'this' binding.", example: "Real-life example: Every function call creates a new execution context pushed onto the call stack." },
    { q: "What are the types of execution contexts?", a: "Global Execution Context (GEC) — created once for the script. Function Execution Context (FEC) — created for every function call. Eval Context — created by eval().", example: "Real-life example: The GEC runs first; each function call creates its own FEC." },
    { q: "What are the two phases of execution context creation?", a: "Creation phase (memory allocation — variables set to undefined, functions stored) and Execution phase (code runs line by line).", example: "Real-life example: Hoisting happens in the creation phase, which is why var variables exist before their line runs." }
  ]
},
{
  icon: <FaProjectDiagram />,
  title: "Memoization",
  questions: [
    { q: "What is memoization?", a: "Memoization is an optimization technique where the results of expensive function calls are cached and returned when the same inputs occur again.", example: "Real-life example: Caching Fibonacci results so each value is computed only once." },
    { q: "How do you implement memoization?", a: "Store results in a cache object using the function arguments as keys. Check the cache before computing.", example: "Real-life example: const memo = {}; if (memo[n]) return memo[n]; else memo[n] = compute(n)." },
    { q: "What are real-world use cases of memoization?", a: "Heavy computation caching, React's useMemo hook, API response caching, and avoiding repeated DOM calculations.", example: "Real-life example: useMemo(() => expensiveCalc(data), [data]) in React to avoid recalculation on every render." }
  ]
},
{
  icon: <FaSearch />,
  title: "Regular Expressions",
  questions: [
    { q: "What are regular expressions in JavaScript?", a: "Regular expressions (regex) are patterns used to match character combinations in strings. They are created with /pattern/flags or new RegExp().", example: "Real-life example: /^[a-zA-Z]+$/.test(name) — validates that name contains only letters." },
    { q: "What are common regex methods?", a: "test() — checks for a match and returns boolean. match() — returns matches. replace() — replaces matched text. split() — splits by pattern.", example: "Real-life example: 'hello world'.replace(/world/, 'JS') returns 'hello JS'." },
    { q: "What are regex flags?", a: "g (global — find all matches), i (case-insensitive), m (multiline), s (dot matches newlines).", example: "Real-life example: /error/gi finds all occurrences of 'error' regardless of case in a log string." }
  ]
},
{
  icon: <FaDatabase />,
  title: "Map, Set, WeakMap, WeakSet",
  questions: [
    { q: "What is a Map in JavaScript?", a: "A Map is a key-value data structure where any value (including objects) can be a key. Unlike objects, Maps maintain insertion order.", example: "Real-life example: Storing user objects as keys mapped to their session tokens." },
    { q: "What is a Set in JavaScript?", a: "A Set is a collection of unique values. Adding a duplicate value has no effect. Useful for deduplication.", example: "Real-life example: const unique = [...new Set(arrayWithDuplicates)] removes duplicate entries." },
    { q: "When to use Map over a plain object?", a: "Use Map when keys are not strings, when key insertion order matters, or when you frequently add/remove entries.", example: "Real-life example: DOM element → metadata mapping where element objects are used as keys." }
  ]
},
{
  icon: <FaExchangeAlt />,
  title: "Functional Programming",
  questions: [
    { q: "What is functional programming?", a: "Functional programming is a paradigm that treats computation as evaluation of pure functions, avoids shared state, and prefers immutability.", example: "Real-life example: Using map/filter/reduce instead of for loops with mutating variables." },
    { q: "What is a pure function?", a: "A pure function always returns the same output for the same input and has no side effects (no external state changes).", example: "Real-life example: const add = (a, b) => a + b is pure. Math.random() is not pure." },
    { q: "What is function composition?", a: "Function composition combines two or more functions so the output of one becomes the input of the next.", example: "Real-life example: const process = (x) => format(validate(sanitize(x))) chains three operations." }
  ]
},
{
  icon: <FaBolt />,
  title: "Performance Optimization",
  questions: [
    { q: "How do you optimize JavaScript performance?", a: "Use memoization, debounce/throttle, lazy loading, avoid DOM thrashing, use Web Workers for heavy tasks, and minimize reflows.", example: "Real-life example: Lazy loading images with Intersection Observer instead of loading all on page load." },
    { q: "What is lazy loading?", a: "Lazy loading defers loading of non-critical resources until they are needed, improving initial page load time.", example: "Real-life example: import() for dynamic module imports — load a chart library only when the user navigates to the reports page." },
    { q: "What is DOM thrashing?", a: "DOM thrashing is when JavaScript alternates between reading and writing DOM layout properties, triggering multiple reflows.", example: "Real-life example: Reading offsetHeight then setting height in a loop causes repeated reflows. Batch writes instead." }
  ]
},
{
  icon: <FaNetworkWired />,
  title: "Web APIs",
  questions: [
    { q: "What is the Intersection Observer API?", a: "It asynchronously observes changes in the intersection of a target element with an ancestor element or viewport, without expensive scroll listeners.", example: "Real-life example: Triggering lazy image loading when an image scrolls into the viewport." },
    { q: "What is the MutationObserver API?", a: "MutationObserver watches for changes to the DOM tree (added nodes, attribute changes, text changes) and fires a callback.", example: "Real-life example: Detecting when a third-party script dynamically adds or removes elements." },
    { q: "What is the Web Storage API?", a: "The Web Storage API provides localStorage and sessionStorage for storing data in the browser as key-value string pairs.", example: "Real-life example: Persisting a shopping cart across page reloads using localStorage." }
  ]
},
{
  icon: <FaShieldAlt />,
  title: "CORS and HTTP",
  questions: [
    { q: "What is CORS?", a: "CORS (Cross-Origin Resource Sharing) is a browser security policy that restricts HTTP requests made from one origin to a different origin. Servers must explicitly allow cross-origin requests via headers.", example: "Real-life example: A React app on localhost:3000 fetching from api.example.com requires CORS headers on the server." },
    { q: "What are HTTP methods used in REST APIs?", a: "GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove). Each maps to a CRUD operation.", example: "Real-life example: POST /users creates a user; DELETE /users/1 removes user with id 1." },
    { q: "What is the difference between 401 and 403?", a: "401 Unauthorized means the request lacks valid authentication credentials. 403 Forbidden means the server understood the request but refuses to authorize it.", example: "Real-life example: 401 when not logged in; 403 when logged in but not an admin." }
  ]
},
{
  icon: <FaLock />,
  title: "Authentication and JWT",
  questions: [
    { q: "What is JWT (JSON Web Token)?", a: "JWT is a compact, URL-safe token format used for securely transmitting information between parties. It consists of three parts: Header, Payload, and Signature.", example: "Real-life example: After login, a server returns a JWT which the client sends in the Authorization header for subsequent requests." },
    { q: "What is the difference between authentication and authorization?", a: "Authentication verifies who the user is. Authorization determines what the user is allowed to do.", example: "Real-life example: Login is authentication. Checking if the user is an admin before accessing a dashboard is authorization." },
    { q: "What is token refresh and why is it needed?", a: "Access tokens have short expiry for security. A refresh token (long-lived) is used to get a new access token without re-login.", example: "Real-life example: Access token expires in 15 minutes; the app silently refreshes it using a refresh token stored in an httpOnly cookie." }
  ]
},
{
  icon: <FaCalculator />,
  title: "Recursion",
  questions: [
    { q: "What is recursion?", a: "Recursion is when a function calls itself until a base condition is met. Every recursive solution needs a base case to prevent infinite loops.", example: "Real-life example: Traversing nested folder structures where each folder can contain sub-folders." },
    { q: "What is tail recursion?", a: "Tail recursion is when the recursive call is the last operation in the function. Some engines optimize this to avoid stack overflow.", example: "Real-life example: Factorial computed tail-recursively passes the accumulated result as an argument." },
    { q: "When should you avoid recursion?", a: "Avoid deep recursion without memoization or tail call optimization — it can cause stack overflow. Use iteration for flat, predictable depths.", example: "Real-life example: Fibonacci without memoization recurses exponentially — use iteration or memoization instead." }
  ]
},
{
  icon: <FaEye />,
  title: "TypeScript Basics",
  questions: [
    { q: "What is TypeScript and why use it?", a: "TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It catches type errors at compile time, improving code reliability.", example: "Real-life example: TypeScript catches passing a string where a number is expected before the code even runs." },
    { q: "What are interfaces in TypeScript?", a: "Interfaces define the shape of an object — which properties and their types it must have. They are used for type checking only and are erased at runtime.", example: "Real-life example: interface User { name: string; age: number; } enforces structure on any object typed as User." },
    { q: "What is the difference between type and interface?", a: "Both define types, but interface is extendable and better for objects. type is more flexible and can represent unions, primitives, and tuples.", example: "Real-life example: type ID = string | number is possible with type but not interface." }
  ]
},
{
  icon: <FaRedoAlt />,
  title: "Testing in JavaScript",
  questions: [
    { q: "What is unit testing?", a: "Unit testing tests individual functions or components in isolation to verify they behave correctly for given inputs.", example: "Real-life example: Testing that an add(2, 3) function always returns 5 using Jest." },
    { q: "What is the difference between Jest and Vitest?", a: "Jest is a widely-used testing framework by Meta. Vitest is a faster alternative built for Vite projects with near-identical API.", example: "Real-life example: Vite + React projects often use Vitest for speed; CRA projects traditionally used Jest." },
    { q: "What is mocking in tests?", a: "Mocking replaces real dependencies (like API calls) with controlled fake implementations to test code in isolation.", example: "Real-life example: jest.fn() mocks an axios.get call to return fake data without hitting the real server." }
  ]
},
{
  icon: <FaLink />,
  title: "Browser Rendering",
  questions: [
    { q: "How does a browser render a web page?", a: "Browser parses HTML → builds DOM, parses CSS → builds CSSOM, combines both into a Render Tree, then Layouts (reflow) and Paints (repaint) pixels to screen.", example: "Real-life example: Adding a CSS class that changes an element's width triggers reflow and repaint." },
    { q: "What is the difference between reflow and repaint?", a: "Reflow recalculates layout (positions and sizes). Repaint redraws pixels (colors, visibility). Reflow is more expensive than repaint.", example: "Real-life example: Changing color triggers repaint only. Changing width triggers both reflow and repaint." },
    { q: "What is the critical rendering path?", a: "The critical rendering path is the sequence of steps the browser takes to render the first pixel — parsing HTML, CSS, executing blocking JS, building render tree, layout, and paint.", example: "Real-life example: Placing scripts at the bottom of body or using defer/async speeds up the critical rendering path." }
  ]
},
{
  icon: <FaCogs />,
  title: "Concurrency Patterns",
  questions: [
    { q: "What are Web Workers?", a: "Web Workers run JavaScript in a background thread separate from the main UI thread, preventing heavy computation from blocking the UI.", example: "Real-life example: Running image processing or large data sorting in a Worker so the UI stays responsive." },
    { q: "What is the microtask queue?", a: "The microtask queue (for Promises and queueMicrotask) has higher priority than the macrotask queue (setTimeout, setInterval). Microtasks run after the current task but before the next macrotask.", example: "Real-life example: Promise.resolve().then() runs before setTimeout(() => {}, 0) even though both are async." },
    { q: "What is requestAnimationFrame?", a: "requestAnimationFrame schedules a callback before the next browser repaint, making it ideal for smooth animations synchronized with the display refresh rate.", example: "Real-life example: Animating a progress bar using requestAnimationFrame instead of setInterval for 60fps smoothness." }
  ]
},
  ];
const totalPages = Math.ceil(topics.length / topicsPerPage);
// ADD THIS LINE:
const { markPageComplete, progressPercent } = useCourseProgress("javascript", totalPages);
  const startIndex = (currentPage - 1) * topicsPerPage;
  const paginatedTopics = topics.slice(startIndex, startIndex + topicsPerPage);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  return (
    <>
    <style>{`
      @media (max-width: 768px) {
        .js-notes-title { font-size: 1.5rem !important; }
        .js-notes-subtitle { font-size: 0.88rem !important; }
        .js-card-title { font-size: 1.05rem !important; }
        .js-question { font-size: 0.88rem !important; }
        .js-answer { font-size: 0.83rem !important; line-height: 1.55 !important; }
        .js-example { font-size: 0.78rem !important; }
        .js-container { padding: 14px !important; }
        .js-card { padding: 14px !important; gap: 10px !important; }
        .js-page-btn { padding: 6px 10px !important; font-size: 0.82rem !important; }
      }
    `}</style>
    <main style={styles.container} className="js-container" ref={topRef}>
      <header style={styles.header}>
        <button
    onClick={handleBack}
    style={{
      background: "#4f46e5",
      border: "none",
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
        <h1 style={styles.title} className="js-notes-title">JavaScript</h1>
        <p style={styles.subtitle} className="js-notes-subtitle">           
          Starter notes for beginners with interview-focused explanations
        </p>
        <p style={{ color: "#f59e0b", fontWeight: 600, fontSize: "0.95rem" }}>
  📖 Your Progress: {progressPercent}%
</p>
      </header>

      <section style={styles.topicsGrid}>
        {paginatedTopics.map((topic, index) => (
          <article key={index} style={styles.card} className="js-card">
            <div style={styles.cardHeader}>
              <span style={styles.icon}>{topic.icon}</span>
              <h2 style={styles.cardTitle} className="js-card-title">{topic.title}</h2>
            </div>

            {topic.questions.map((item, idx) => (
              <div key={idx} style={styles.qaBlock}>
                <h3 style={styles.question} className="js-question">Q. {item.q}</h3>
                <p style={styles.answer} className="js-answer">{item.a}</p>
                <p style={styles.example} className="js-example">
                  <strong>Example:</strong> {item.example}
                </p>
              </div>
            ))}
          </article>
        ))}
      </section>

      {/* Pagination */}
      <div style={styles.pagination}>
        {/* Prev */}
<button style={styles.pageBtn} className="js-page-btn"
  disabled={currentPage === 1}
  onClick={() => {
    markPageComplete(currentPage);
    setCurrentPage((p) => p - 1);
  }}
>Prev</button>

{/* Page numbers */}
{Array.from({ length: totalPages }).map((_, i) => (
  <button
    key={i}
    style={{
      ...styles.pageBtn,
      backgroundColor: currentPage === i + 1 ? "#f59e0b" : "#fff",
      color: currentPage === i + 1 ? "#fff" : "#333"
    }}
    onClick={() => {
      markPageComplete(currentPage);
      setCurrentPage(i + 1);
    }}
  >{i + 1}</button>
))}

{/* Next */}
<button
  style={styles.pageBtn}
  disabled={currentPage === totalPages}
  onClick={() => {
    markPageComplete(currentPage);
    setCurrentPage((p) => p + 1);
  }}
>Next</button>
      </div>
    </main>
    </>
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
  },
};

export default DbmsNotes;
