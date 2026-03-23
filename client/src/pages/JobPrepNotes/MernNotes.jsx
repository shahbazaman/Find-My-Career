// File: src/pages/JobPrepNotes/MernNotes.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  FaProjectDiagram,
  FaListUl,
  FaLayerGroup,
  FaExchangeAlt,
  FaClock,
  FaDatabase,
  FaServer,
  FaReact,
  FaNodeJs,
  FaLock,
  FaCloudUploadAlt,
  FaTachometerAlt,
  FaSync,
  FaShieldAlt,
  FaMicrochip,
  FaCodeBranch
} from "react-icons/fa";
import { 
  FaVial,         
  FaDocker,       
  FaRocket,       
  FaSearchDollar  
} from "react-icons/fa";
 import { useNavigate } from "react-router-dom";

const MernNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
  const navigate  = useNavigate();
 

const handleBack = () => {
  navigate(-1);
};
const topics = [
  {
    icon: <FaLayerGroup />,
    title: "What is MERN Stack?",
    questions: [
      {
        q: "What does MERN stack stand for?",
        a: "MERN stack is a collection of four technologies used to build full-stack web applications: MongoDB (database), Express.js (backend framework), React.js (frontend library), and Node.js (runtime environment). Together, they allow developers to build end-to-end applications using JavaScript at every layer, which simplifies development and improves productivity.",
        example:
          "Real-life example: A job portal where React handles the UI, Node and Express manage APIs, and MongoDB stores users, jobs, and applications."
      },
      {
        q: "Why is MERN stack popular?",
        a: "MERN stack is popular because it uses a single language (JavaScript) across frontend and backend, has a huge community, supports scalability, and is widely used by startups and tech companies. It is also well-suited for modern, single-page applications.",
        example:
          "Real-life example: Startups prefer MERN to quickly build MVPs without switching between multiple programming languages."
      }
    ]
  },
  {
    icon: <FaDatabase />,
    title: "MongoDB",
    questions: [
      {
        q: "What is MongoDB and how is it different from SQL databases?",
        a: "MongoDB is a NoSQL, document-oriented database that stores data in flexible JSON-like documents. Unlike SQL databases that use tables and rows, MongoDB uses collections and documents, making it easier to handle unstructured or semi-structured data and scale applications horizontally.",
        example:
          "Real-life example: Storing user profiles where different users may have different fields like address, skills, or social links."
      },
      {
        q: "Why is MongoDB suitable for MERN applications?",
        a: "MongoDB works naturally with JavaScript objects, integrates well with Node.js, and supports fast read/write operations. Its schema flexibility helps developers evolve applications without major database redesigns.",
        example:
          "Real-life example: Adding a new field like 'resumeURL' to user profiles without modifying existing records."
      }
    ]
  },
  {
    icon: <FaServer />,
    title: "Express.js",
    questions: [
      {
        q: "What is Express.js?",
        a: "Express.js is a lightweight backend framework built on top of Node.js. It simplifies server-side development by providing routing, middleware support, and easy request-response handling. Express helps structure backend code cleanly and efficiently.",
        example:
          "Real-life example: Handling a POST request when a user submits a login form."
      },
      {
        q: "What is middleware in Express?",
        a: "Middleware functions execute between the request and response cycle. They are commonly used for authentication, logging, error handling, and data validation, making backend logic modular and reusable.",
        example:
          "Real-life example: Verifying JWT tokens before allowing access to protected APIs."
      }
    ]
  },
  {
    icon: <FaReact />,
    title: "React.js",
    questions: [
      {
        q: "What role does React play in MERN stack?",
        a: "React handles the frontend of a MERN application. It is responsible for building reusable UI components, managing state, and providing a fast and interactive user experience through the Virtual DOM.",
        example:
          "Real-life example: Updating job application status instantly without reloading the page."
      },
      {
        q: "Why is React suitable for large applications?",
        a: "React’s component-based architecture makes applications easier to scale, maintain, and debug. Each part of the UI can be developed and tested independently.",
        example:
          "Real-life example: Separate components for header, sidebar, job cards, and filters in a dashboard."
      }
    ]
  },
  {
    icon: <FaNodeJs />,
    title: "Node.js",
    questions: [
      {
        q: "What is Node.js?",
        a: "Node.js is a JavaScript runtime environment that allows JavaScript to run outside the browser. It uses an event-driven, non-blocking I/O model, making it highly efficient for handling multiple client requests.",
        example:
          "Real-life example: A backend server handling thousands of login requests simultaneously."
      },
      {
        q: "Why is Node.js used in MERN stack?",
        a: "Node.js allows the same language (JavaScript) to be used on both frontend and backend. It also offers excellent performance and integrates seamlessly with Express and MongoDB.",
        example:
          "Real-life example: Sharing validation logic between frontend and backend using JavaScript."
      }
    ]
  },
  {
    icon: <FaExchangeAlt />,
    title: "Client–Server Architecture",
    questions: [
      {
        q: "How does client–server architecture work in MERN?",
        a: "In MERN, React acts as the client that sends requests to the backend server built with Node and Express. The server processes requests, interacts with MongoDB, and sends responses back to the client.",
        example:
          "Real-life example: React sends a request to fetch job listings, and the server responds with data from the database."
      }
    ]
  },
  {
    icon: <FaLock />,
    title: "Authentication & Authorization",
    questions: [
      {
        q: "How is authentication handled in MERN stack?",
        a: "Authentication is commonly handled using JWT (JSON Web Tokens). After login, the server generates a token that is stored on the client and sent with each protected request to verify the user.",
        example:
          "Real-life example: Staying logged in to a website even after refreshing the page."
      },
      {
        q: "What is authorization?",
        a: "Authorization determines what actions a user is allowed to perform after authentication, such as admin access or user-level access.",
        example:
          "Real-life example: Only admins can delete jobs, while users can only apply."
      }
    ]
  },
  {
    icon: <FaCloudUploadAlt />,
    title: "API Integration",
    questions: [
      {
        q: "What are APIs in MERN stack?",
        a: "APIs (Application Programming Interfaces) allow communication between the frontend and backend. In MERN, RESTful APIs are commonly used to perform CRUD operations.",
        example:
          "Real-life example: Fetching job listings using a GET API call."
      }
    ]
  },
  {
    icon: <FaTachometerAlt />,
    title: "Scalability and Performance",
    questions: [
      {
        q: "How does MERN stack support scalability?",
        a: "MERN supports scalability through modular architecture, MongoDB’s horizontal scaling, and Node.js’s non-blocking nature. Applications can grow without major rewrites.",
        example:
          "Real-life example: A job portal handling increasing users during placement season."
      }
    ]
  },{
    icon: <FaSync />,
    title: "Global State Management (Redux)",
    questions: [
      {
        q: "What is Redux and why do we use it in MERN?",
        a: "Redux is a predictable state container for JavaScript apps. We use it in large MERN applications to avoid 'prop drilling' (passing data through multiple layers) and to maintain a single source of truth for the entire app.",
        example: "Real-life example: An e-commerce cart where the product count needs to be updated in the header, sidebar, and checkout page simultaneously."
      },
      {
        q: "Explain Redux Thunk or Saga.",
        a: "These are middlewares that allow you to write asynchronous logic in Redux. Since Redux actions are synchronous by default, Thunks are used to handle API calls before updating the state.",
        example: "Real-life example: Fetching user data from the backend and showing a loading spinner until the data arrives."
      }
    ]
  },
  {
    icon: <FaShieldAlt />,
    title: "MERN Security Best Practices",
    questions: [
      {
        q: "How do you protect a MERN app from common attacks?",
        a: "We use 'Helmet' to secure HTTP headers, sanitize inputs to prevent NoSQL Injection, implement Rate Limiting to prevent Brute Force, and use Bcrypt for password hashing.",
        example: "Real-life example: Using 'express-rate-limit' to prevent a hacker from trying 1000 passwords in a minute on your login API."
      },
      {
        q: "What is the difference between Cookie-based and Token-based auth?",
        a: "Tokens (JWT) are stateless and better for mobile/cross-domain apps. Cookies can be more secure against XSS if 'HttpOnly' and 'Secure' flags are used, as they are managed by the browser.",
        example: "Real-life example: MNCs often use JWT for microservices where different servers need to verify the user independently."
      }
    ]
  },
  {
    icon: <FaMicrochip />,
    title: "Node.js Internals (MNC Favorite)",
    questions: [
      {
        q: "How does the Node.js Event Loop work?",
        a: "Node.js uses a single-threaded event loop to handle many concurrent operations. It offloads heavy tasks (like File I/O or Hashing) to the 'Libuv' thread pool, allowing the main thread to remain non-blocking.",
        example: "Real-life example: Handling 1,000 chat messages at once without the server 'freezing' for any user."
      },
      {
        q: "What is the difference between setImmediate() and process.nextTick()?",
        a: "process.nextTick() fires immediately after the current operation, before the event loop continues. setImmediate() is designed to execute on the next iteration of the event loop.",
        example: "Real-life example: Using nextTick for critical error cleanup that must happen before any other code runs."
      }
    ]
  },
  {
    icon: <FaCodeBranch />,
    title: "System Design & Optimization",
    questions: [
      {
        q: "What is Caching and how do we use Redis in MERN?",
        a: "Caching stores frequently accessed data in memory. Redis is an in-memory database used alongside MongoDB to serve data instantly instead of querying the disk every time.",
        example: "Real-life example: Storing the 'Top 10 Trending Jobs' in Redis so the database isn't hit every time a user opens the home page."
      },
      {
        q: "What are React Core Web Vitals?",
        a: "These are metrics like LCP (loading speed), FID (interactivity), and CLS (visual stability) that Google uses to rank sites. In MERN, we optimize these using code-splitting and lazy loading.",
        example: "Real-life example: Using React.lazy() so the user only downloads the 'Profile' page code when they actually click on it."
      }
    ]
  },{
    icon: <FaVial />,
    title: "Testing & Quality Assurance",
    questions: [
      {
        q: "What is the difference between Unit, Integration, and E2E Testing?",
        a: "Unit tests (Jest) check a single function/component in isolation. Integration tests check if the API and DB work together. E2E tests (Cypress/Puppeteer) simulate a real user journey in the browser.",
        example: "Real-life example: Testing a 'CalculateTax' function (Unit) vs. testing the entire 'Checkout to Payment' flow (E2E)."
      },
      {
        q: "What is Test-Driven Development (TDD)?",
        a: "TDD is a process where you write the test cases before writing the actual code. It ensures that the code meets requirements from the start and reduces bugs in production.",
        example: "Real-life example: Writing a test to expect a 400 error when an email is missing, then writing the Express validation logic to pass that test."
      }
    ]
  },
  {
    icon: <FaDocker />,
    title: "DevOps & Containerization",
    questions: [
      {
        q: "What is Docker and why is it used in MERN?",
        a: "Docker packages your app with all its dependencies into a 'container'. This ensures the app runs the same on your laptop, the testing server, and the production cloud (AWS/Azure).",
        example: "Real-life example: Preventing the 'it works on my machine' bug when the backend fails because the server has a different Node.js version."
      },
      {
        q: "What is CI/CD?",
        a: "Continuous Integration and Continuous Deployment. It is an automated pipeline where code is automatically tested and deployed to the server every time a developer pushes to GitHub.",
        example: "Real-life example: Pushing code to the 'main' branch and seeing the live website update automatically after 5 minutes of automated testing."
      }
    ]
  },
  {
    icon: <FaRocket />,
    title: "Advanced Performance Patterns",
    questions: [
      {
        q: "Explain Server-Side Rendering (SSR) vs. Client-Side Rendering (CSR).",
        a: "CSR (Standard React) renders everything in the browser, which is fast once loaded but slow initially. SSR (Next.js) renders pages on the server, providing better SEO and faster 'First Contentful Paint'.",
        example: "Real-life example: Using CSR for a private Dashboard (speed) but SSR for a public Blog (SEO)."
      },
      {
        q: "What is Database Sharding and Replication?",
        a: "Replication copies data across multiple servers for backup. Sharding splits a large database into smaller chunks (shards) across different servers to handle massive traffic.",
        example: "Real-life example: A global app like LinkedIn storing Asian user data on Singapore servers and US data on Virginia servers to reduce latency."
      }
    ]
  },
  {
    icon: <FaSearchDollar />,
    title: "SEO & Web Vitals for MNCs",
    questions: [
      {
        q: "How do you optimize a MERN app for SEO?",
        a: "Since React is a Single Page Application (SPA), search engines sometimes struggle to crawl it. We use 'React Helmet' for dynamic meta tags or migrate to Next.js for pre-rendering.",
        example: "Real-life example: Ensuring that when a job link is shared on LinkedIn, it shows the correct Job Title and Image instead of just the website name."
      }
    ]
  },{
    icon: <FaDatabase />,
    title: "MongoDB Advanced Queries",
    questions: [
      { q: "What is the aggregation pipeline in MongoDB?", a: "The aggregation pipeline processes documents through multiple stages like $match, $group, $sort, and $project to perform complex data transformations and analytics.", example: "Real-life example: Finding the total number of job applications per company from a large applications collection." },
      { q: "What are MongoDB indexes and why are they important?", a: "Indexes store a small portion of data in an easy-to-traverse form. Without indexes, MongoDB scans every document (collection scan), which is very slow for large datasets.", example: "Real-life example: Adding an index on 'email' field so user lookups during login are instant instead of scanning 1 million records." },
      { q: "What is the difference between embedded documents and references in MongoDB?", a: "Embedded documents store related data in a single document (faster reads). References store related data in separate collections linked by IDs (better for large, frequently updated data).", example: "Real-life example: Embed 'address' inside user document, but reference 'orders' separately since orders grow over time." }
    ]
  },
  {
    icon: <FaServer />,
    title: "REST API Design",
    questions: [
      { q: "What are RESTful API best practices?", a: "Use proper HTTP methods (GET, POST, PUT, DELETE), meaningful endpoint names (nouns not verbs), correct status codes, versioning (/api/v1/), and pagination for large datasets.", example: "Real-life example: GET /api/v1/jobs returns all jobs. POST /api/v1/jobs creates a new job. DELETE /api/v1/jobs/:id deletes one." },
      { q: "What HTTP status codes should every developer know?", a: "200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error.", example: "Real-life example: Returning 401 when JWT token is missing, 403 when user lacks permission, 404 when job ID doesn't exist." },
      { q: "What is the difference between PUT and PATCH?", a: "PUT replaces the entire resource with new data. PATCH updates only the specified fields of an existing resource.", example: "Real-life example: PATCH /users/:id to update just the phone number without sending the entire user object." }
    ]
  },
  {
    icon: <FaReact />,
    title: "React Hooks (Deep Dive)",
    questions: [
      { q: "What is the difference between useEffect with [], no array, and [dependency]?", a: "Empty [] runs once on mount (like componentDidMount). No array runs after every render. [dependency] runs only when that dependency changes.", example: "Real-life example: Fetch user data once on page load [], but re-fetch when userId changes [userId]." },
      { q: "What is useMemo and useCallback?", a: "useMemo memoizes a computed value to avoid recalculation on every render. useCallback memoizes a function reference to prevent child components from re-rendering unnecessarily.", example: "Real-life example: Wrapping an expensive filter function with useMemo so it only recalculates when the job list changes." },
      { q: "What is useReducer and when to use it over useState?", a: "useReducer is better when state logic is complex, has multiple sub-values, or the next state depends on the previous one. It follows the Redux pattern locally.", example: "Real-life example: Managing a multi-step form with fields, validation errors, and submission status together." }
    ]
  },
  {
    icon: <FaNodeJs />,
    title: "Node.js Streams and File Handling",
    questions: [
      { q: "What are streams in Node.js?", a: "Streams are objects that let you read or write data piece by piece (chunks) instead of loading everything into memory at once. Types: Readable, Writable, Duplex, Transform.", example: "Real-life example: Streaming a large CSV file of job applications to process records one by one without crashing the server." },
      { q: "What is the difference between fs.readFile and fs.createReadStream?", a: "fs.readFile loads the entire file into memory before processing. fs.createReadStream reads the file in chunks, making it memory-efficient for large files.", example: "Real-life example: Use createReadStream to serve a large video or PDF resume download without high memory usage." },
      { q: "What is the cluster module in Node.js?", a: "The cluster module allows Node.js to create child processes that share the same server port, utilizing all CPU cores since Node is single-threaded by default.", example: "Real-life example: A server with 8 CPU cores spawns 8 worker processes to handle 8x more simultaneous requests." }
    ]
  },
  {
    icon: <FaLock />,
    title: "JWT and Session Management",
    questions: [
      { q: "What is the structure of a JWT token?", a: "A JWT has three parts separated by dots: Header (algorithm), Payload (user data/claims), and Signature (verification hash). Only the signature is secret.", example: "Real-life example: Decoding a JWT on jwt.io shows the user ID and role stored in the payload in plain base64." },
      { q: "What is the difference between Access Token and Refresh Token?", a: "Access tokens are short-lived (15 min) for security. Refresh tokens are long-lived (7 days) and used to get a new access token without re-login.", example: "Real-life example: When your access token expires, the frontend silently calls /refresh to get a new one, keeping the user logged in." },
      { q: "Where should JWT tokens be stored on the client?", a: "Storing in HttpOnly cookies is safest (XSS-proof). Storing in localStorage is convenient but vulnerable to XSS attacks. Never store in regular cookies without HttpOnly flag.", example: "Real-life example: Banking apps use HttpOnly cookies; simpler apps often use localStorage despite the risk." }
    ]
  },
  {
    icon: <FaSync />,
    title: "React Context API",
    questions: [
      { q: "What is the Context API and when to use it?", a: "Context API provides a way to pass data through the component tree without prop drilling. Use it for global data like theme, user auth, or language settings.", example: "Real-life example: Storing the logged-in user's name in Context so any component (navbar, sidebar, profile) can read it directly." },
      { q: "What is the difference between Context API and Redux?", a: "Context API is simpler and built-in, suitable for low-frequency updates. Redux is better for complex state with many actions, middleware needs, and frequent updates across many components.", example: "Real-life example: Use Context for dark/light theme toggle. Use Redux for a shopping cart that updates across 20+ components." },
      { q: "What is the performance concern with Context API?", a: "When Context value changes, ALL components consuming that context re-render, even if they only use one part of the value. Split contexts or use useMemo to fix this.", example: "Real-life example: Separating UserContext and ThemeContext so a theme change doesn't re-render all user-related components." }
    ]
  },
  {
    icon: <FaCloudUploadAlt />,
    title: "File Upload and Cloud Storage",
    questions: [
      { q: "How do you handle file uploads in MERN?", a: "Use Multer middleware on the Express backend to handle multipart/form-data. Files can be stored locally or uploaded to cloud services like AWS S3 or Cloudinary.", example: "Real-life example: A job seeker uploading their resume PDF which is stored in AWS S3 and the URL saved in MongoDB." },
      { q: "What is Cloudinary and why is it used?", a: "Cloudinary is a cloud media management service that handles image/video upload, storage, transformation, and delivery via CDN automatically.", example: "Real-life example: Uploading a company logo that Cloudinary automatically resizes to thumbnail, medium, and large versions." },
      { q: "What is the difference between multipart/form-data and application/json?", a: "multipart/form-data is used when sending files along with text fields. application/json is used for sending plain JSON data without file attachments.", example: "Real-life example: Resume upload form uses multipart/form-data. Login form sending email and password uses application/json." }
    ]
  },
  {
    icon: <FaTachometerAlt />,
    title: "Error Handling in MERN",
    questions: [
      { q: "What is centralized error handling in Express?", a: "A global error handler middleware with 4 parameters (err, req, res, next) catches all errors passed via next(error) and returns a consistent error response format.", example: "Real-life example: Instead of every route having its own try/catch, errors are passed to a single handler that returns {success: false, message: err.message}." },
      { q: "How do you handle async errors in Express?", a: "Wrap async route handlers with a higher-order function (asyncHandler/catchAsync) that automatically calls next(error) if the promise rejects, avoiding repetitive try/catch blocks.", example: "Real-life example: const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);" },
      { q: "What are custom error classes in Node.js?", a: "Extending the built-in Error class allows creating errors with custom status codes and messages, making error responses more structured and informative.", example: "Real-life example: class AppError extends Error { constructor(message, statusCode) { super(message); this.statusCode = statusCode; } }" }
    ]
  },
  {
  icon: <FaCodeBranch />,
  title: "Mongoose ODM",
  questions: [
    { q: "What is Mongoose and why is it used?", a: "Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides schema validation, type casting, query building, and middleware hooks on top of the native MongoDB driver.", example: "Real-life example: Defining a User schema with required email and hashed password fields so MongoDB enforces structure on every document." },
    { q: "What are Mongoose virtuals?", a: "Virtuals are document properties that are not stored in MongoDB but computed from existing fields. They are useful for derived values like full name from first and last name.", example: "Real-life example: userSchema.virtual('fullName').get(() => this.firstName + ' ' + this.lastName) — computed without extra DB storage." },
    { q: "What are Mongoose middleware (pre/post hooks)?", a: "Mongoose middleware runs before (pre) or after (post) certain operations like save, find, or delete. They are used for tasks like hashing passwords before saving or logging after deletion.", example: "Real-life example: userSchema.pre('save', async function() { this.password = await bcrypt.hash(this.password, 10); })" }
  ]
},
{
  icon: <FaShieldAlt />,
  title: "Input Validation",
  questions: [
    { q: "How do you validate request data in Express?", a: "Use libraries like express-validator or Joi to validate and sanitize incoming request data before processing. This prevents bad data from reaching the database.", example: "Real-life example: Checking that email is a valid format and password is at least 8 characters before creating a user." },
    { q: "What is the difference between validation and sanitization?", a: "Validation checks if data meets rules (required, min length, valid email). Sanitization cleans data by trimming spaces, escaping HTML, or normalizing values.", example: "Real-life example: Validating that age is a number, then sanitizing by converting '  25  ' to 25 by trimming whitespace." },
    { q: "Where should validation happen in MERN — frontend or backend?", a: "Both. Frontend validation improves UX by giving immediate feedback. Backend validation is mandatory for security since clients can bypass frontend checks.", example: "Real-life example: React form shows 'Email required' instantly. Express API also checks and returns 400 if email is missing — even if Postman is used." }
  ]
},
{
  icon: <FaMicrochip />,
  title: "WebSockets and Real-Time",
  questions: [
    { q: "What is Socket.io and how does it work in MERN?", a: "Socket.io is a library for real-time bidirectional communication between client and server over WebSockets. Unlike HTTP, the connection stays open so the server can push data to clients instantly.", example: "Real-life example: A live chat feature where messages appear instantly for all users without refreshing the page." },
    { q: "What is the difference between HTTP and WebSocket?", a: "HTTP is request-response — the client always initiates. WebSocket is a persistent two-way connection where both client and server can send messages at any time.", example: "Real-life example: HTTP for loading a job listing page. WebSocket for a real-time notification when someone applies to your job." },
    { q: "What are Socket.io rooms?", a: "Rooms are virtual channels that sockets can join. Messages sent to a room are only received by sockets in that room, enabling group communication.", example: "Real-life example: Each interview scheduled creates a room so only the recruiter and candidate receive interview reminders." }
  ]
},
{
  icon: <FaCodeBranch />,
  title: "Environment and Config",
  questions: [
    { q: "What is dotenv and why is it used?", a: "dotenv loads environment variables from a .env file into process.env. It keeps sensitive data like API keys, DB passwords, and JWT secrets out of source code.", example: "Real-life example: Storing MONGO_URI and JWT_SECRET in .env so they are never pushed to GitHub." },
    { q: "What is the difference between development and production environments?", a: "Development has verbose error messages and debugging tools. Production has minified code, optimized builds, and suppressed error details for security.", example: "Real-life example: In dev, Express shows full stack traces. In production, only a generic 'Something went wrong' message is shown." },
    { q: "How do you manage different configs for dev and prod?", a: "Use separate .env files (.env.development, .env.production) or environment-specific config objects that switch based on NODE_ENV value.", example: "Real-life example: Development uses a local MongoDB URI. Production uses a MongoDB Atlas URI from the hosting platform's environment variables." }
  ]
},
{
  icon: <FaTachometerAlt />,
  title: "Rate Limiting and Security",
  questions: [
    { q: "What is rate limiting and why is it important?", a: "Rate limiting restricts how many requests a client can make in a given time window. It protects APIs from brute force attacks, DDoS, and abuse.", example: "Real-life example: Limiting login attempts to 5 per minute per IP using express-rate-limit to prevent password guessing." },
    { q: "What is Helmet.js?", a: "Helmet is an Express middleware that sets various HTTP security headers to protect against common attacks like clickjacking, MIME sniffing, and cross-site scripting.", example: "Real-life example: app.use(helmet()) adds headers like X-Frame-Options and Content-Security-Policy automatically." },
    { q: "What is HTTPS and why is it required in production?", a: "HTTPS encrypts data between client and server using TLS/SSL, preventing man-in-the-middle attacks. Browsers also block mixed content and warn users on non-HTTPS sites.", example: "Real-life example: Without HTTPS, a user's login credentials sent over a public WiFi network can be intercepted by anyone on that network." }
  ]
},
{
  icon: <FaReact />,
  title: "React Router",
  questions: [
    { q: "What is React Router and how does it work?", a: "React Router is a library for client-side routing in React. It maps URLs to components without page reloads, giving SPAs the feel of multi-page apps.", example: "Real-life example: Navigating from /jobs to /jobs/123 shows the job detail component without reloading the page." },
    { q: "What is the difference between BrowserRouter and HashRouter?", a: "BrowserRouter uses the HTML5 History API for clean URLs (/jobs/123). HashRouter uses the URL hash (#/jobs/123), which works without server configuration but looks less clean.", example: "Real-life example: Production apps on servers with proper redirects use BrowserRouter. Static file hosts without redirect support use HashRouter." },
    { q: "What are protected routes in React?", a: "Protected routes check if a user is authenticated before rendering a component, redirecting to login if not. They are implemented by wrapping routes with a custom PrivateRoute component.", example: "Real-life example: The /dashboard route redirects to /login if no JWT token is found in localStorage." }
  ]
},
{
  icon: <FaDatabase />,
  title: "MongoDB Transactions",
  questions: [
    { q: "What are transactions in MongoDB?", a: "Transactions allow multiple operations to execute as an atomic unit — all succeed or all fail together. They are essential for maintaining data consistency across multiple collections.", example: "Real-life example: When a user purchases a course, both the payment record creation and course enrollment must succeed together or both roll back." },
    { q: "When should you use MongoDB transactions?", a: "Use transactions when multiple writes across different collections must be consistent — like financial operations, inventory updates, or any scenario where partial completion causes data corruption.", example: "Real-life example: Transferring funds between two user accounts — debit one and credit the other must both succeed or neither should happen." },
    { q: "What is the session object in MongoDB transactions?", a: "A session object tracks the transaction context. All operations that are part of a transaction must use the same session object so MongoDB knows they belong together.", example: "Real-life example: const session = await mongoose.startSession(); session.startTransaction(); then pass session to each Model operation." }
  ]
},
{
  icon: <FaSync />,
  title: "React Performance",
  questions: [
    { q: "What is React.memo and when to use it?", a: "React.memo is a HOC that prevents a functional component from re-rendering if its props haven't changed. Use it for pure components that receive the same props frequently.", example: "Real-life example: Wrapping a JobCard component with React.memo so it doesn't re-render when the parent's unrelated state changes." },
    { q: "What is code splitting in React?", a: "Code splitting breaks the JavaScript bundle into smaller chunks that are loaded on demand. React.lazy() and Suspense enable this, reducing initial load time.", example: "Real-life example: The admin dashboard bundle is only downloaded when an admin navigates to /admin, not on initial page load." },
    { q: "What is the React Profiler?", a: "The React Profiler (in DevTools) measures how often components render and how long each render takes, helping identify performance bottlenecks.", example: "Real-life example: Using the Profiler to discover that a filter component re-renders 50 times per keystroke, then fixing it with useMemo." }
  ]
},
{
  icon: <FaServer />,
  title: "Microservices vs Monolith",
  questions: [
    { q: "What is a monolithic architecture?", a: "A monolith is a single application where all features (auth, jobs, payments) are built and deployed together. Simple to develop initially but hard to scale and maintain as it grows.", example: "Real-life example: A single Express server that handles users, jobs, applications, and payments all in one codebase." },
    { q: "What are microservices?", a: "Microservices split an application into small, independent services that each handle one feature and communicate via APIs or message queues. Each service can be deployed, scaled, and updated independently.", example: "Real-life example: Separate Node.js services for Auth, Jobs, Notifications, and Payments — each with its own database and deployment." },
    { q: "What are the tradeoffs between microservices and monolith?", a: "Monolith is simpler to build and debug but hard to scale. Microservices scale well and allow independent deployment but add complexity in networking, data consistency, and DevOps.", example: "Real-life example: Startups begin with a monolith for speed. As they grow (like Netflix or Uber), they migrate to microservices for independent scaling." }
  ]
},
{
  icon: <FaCloudUploadAlt />,
  title: "Deployment and Hosting",
  questions: [
    { q: "How do you deploy a MERN app?", a: "Frontend (React) is built with 'npm run build' and deployed to static hosts like Vercel or Netlify. Backend (Node/Express) is deployed to cloud servers like Railway, Render, or AWS EC2.", example: "Real-life example: React build deployed to Vercel, Express API on Render, MongoDB Atlas as cloud database — a fully cloud-hosted MERN app." },
    { q: "What is a reverse proxy and why is it used?", a: "A reverse proxy (like Nginx) sits in front of the Node.js server, handles SSL termination, serves static files, and distributes load across multiple server instances.", example: "Real-life example: Nginx serves the React build files directly and forwards /api requests to the Node.js server running on port 5000." },
    { q: "What are environment variables in deployment?", a: "Environment variables store configuration values (DB URLs, API keys, secrets) outside the codebase. Cloud platforms like Vercel and Render let you set them in the dashboard without editing code.", example: "Real-life example: Setting MONGO_URI and JWT_SECRET on Render's environment variables tab instead of hardcoding them in server.js." }
  ]
},
{
  icon: <FaLock />,
  title: "Password Security",
  questions: [
    { q: "Why should passwords never be stored in plain text?", a: "Plain text passwords are immediately exposed in a data breach. Hashing passwords with bcrypt transforms them into irreversible hashes so even database admins cannot read the original passwords.", example: "Real-life example: The 2012 LinkedIn breach exposed 117 million plain text passwords. Proper hashing would have made them useless to attackers." },
    { q: "What is bcrypt and how does salting work?", a: "Bcrypt is a password hashing algorithm that automatically adds a random 'salt' to each password before hashing. This ensures that two identical passwords produce different hashes.", example: "Real-life example: Two users with password '123456' get completely different hashes, preventing rainbow table attacks." },
    { q: "What is the bcrypt cost factor?", a: "The cost factor (work factor) controls how many rounds of hashing are performed. A higher value (like 12) makes hashing slower, increasing security against brute force at the cost of slight login delay.", example: "Real-life example: bcrypt.hash(password, 12) — the '12' means 2^12 = 4096 hashing rounds, making brute force extremely time-consuming." }
  ]
},
{
  icon: <FaRocket />,
  title: "GraphQL vs REST",
  questions: [
    { q: "What is GraphQL and how is it different from REST?", a: "GraphQL is a query language for APIs where clients request exactly the data they need in a single request. REST uses fixed endpoints that may over-fetch or under-fetch data.", example: "Real-life example: REST GET /users returns all user fields. GraphQL query { user { name email } } returns only name and email." },
    { q: "What are the advantages of GraphQL?", a: "Single endpoint, no over-fetching or under-fetching, strongly typed schema, self-documenting API, and efficient for mobile clients that need minimal data.", example: "Real-life example: A mobile app fetching job listings requests only title and location, saving bandwidth compared to a REST API returning all 20 fields." },
    { q: "When should you choose REST over GraphQL?", a: "Choose REST for simple CRUD APIs, public APIs with caching needs, or teams without GraphQL experience. GraphQL shines in complex apps with multiple related data types and varied client needs.", example: "Real-life example: A simple blog API benefits from REST. A complex dashboard showing users, jobs, applications, and stats simultaneously benefits from GraphQL." }
  ]
},
{
  icon: <FaNodeJs />,
  title: "Node.js Package Management",
  questions: [
    { q: "What is npm and what is the difference between dependencies and devDependencies?", a: "npm (Node Package Manager) manages JavaScript packages. dependencies are required in production (Express, mongoose). devDependencies are only needed during development (nodemon, jest, eslint).", example: "Real-life example: Express is a dependency. Nodemon (auto-restarts server on file change) is a devDependency since it's not needed in production." },
    { q: "What is the purpose of package-lock.json?", a: "package-lock.json locks the exact version of every installed package and its sub-dependencies. This ensures all team members and deployment servers install identical package versions.", example: "Real-life example: Without package-lock.json, one developer installs mongoose 7.0.1 while another gets 7.0.3, causing subtle bugs that are hard to reproduce." },
    { q: "What is the difference between npm install and npm ci?", a: "npm install installs packages and may update package-lock.json. npm ci (clean install) strictly follows package-lock.json without modifying it, making it faster and safer for CI/CD pipelines.", example: "Real-life example: CI/CD pipelines use npm ci to guarantee reproducible builds — the same packages every single time the pipeline runs." }
  ]
},
{
  icon: <FaDatabase />,
  title: "MongoDB Performance",
  questions: [
    { q: "What is the explain() method in MongoDB?", a: "explain() shows the query execution plan — whether MongoDB used an index or did a full collection scan, how many documents were examined, and how long the query took.", example: "Real-life example: Running db.jobs.find({ location: 'Bangalore' }).explain('executionStats') reveals a COLLSCAN on a million-document collection, prompting you to add an index." },
    { q: "What are compound indexes in MongoDB?", a: "Compound indexes cover multiple fields in a single index. They are useful when queries filter or sort by multiple fields together, but field order in the index matters.", example: "Real-life example: An index on { status: 1, createdAt: -1 } supports queries like 'find all active jobs sorted by newest' efficiently." },
    { q: "What is the difference between $lookup and manual references in MongoDB?", a: "$lookup performs a left outer join between two collections in an aggregation pipeline, similar to SQL JOIN. Manual references store IDs and require separate queries, giving more control but less convenience.", example: "Real-life example: $lookup to join applications with job details in a single aggregation, instead of fetching applications then looping to fetch each job separately." }
  ]
},
{
  icon: <FaShieldAlt />,
  title: "OAuth and Social Login",
  questions: [
    { q: "What is OAuth 2.0?", a: "OAuth 2.0 is an authorization framework that allows users to grant third-party apps limited access to their accounts without sharing passwords. The user authenticates with the provider (Google, GitHub) and the app receives an access token.", example: "Real-life example: 'Sign in with Google' — the user logs into Google, Google sends an authorization code to your backend, and you exchange it for user info." },
    { q: "What is Passport.js and how is it used in MERN?", a: "Passport.js is a Node.js authentication middleware that supports 500+ strategies including local (email/password), Google OAuth, GitHub, and JWT. It simplifies implementing multiple auth methods.", example: "Real-life example: passport.use(new GoogleStrategy({ clientID, clientSecret, callbackURL }, async (token, _, profile, done) => { /* find or create user */ }))" },
    { q: "What is the difference between OAuth and JWT?", a: "OAuth is an authorization protocol for delegating access to third-party services. JWT is a token format for transmitting claims between parties. OAuth flows often issue JWTs as access tokens.", example: "Real-life example: Google OAuth gives you a JWT (ID token) containing the user's name and email after they authenticate with Google." }
  ]
},
{
  icon: <FaRocket />,
  title: "MERN Interview Patterns",
  questions: [
    { q: "How would you design a scalable job portal using MERN?", a: "React frontend with lazy loading, Express REST API with JWT auth, MongoDB with indexed collections for jobs/users/applications, Redis for caching popular jobs, Socket.io for real-time notifications, and deployed via Docker on cloud with CI/CD.", example: "Real-life example: Jobs page loads cached results from Redis in 10ms. Recruiter receives live notification when a candidate applies via Socket.io room." },
    { q: "What is the N+1 query problem and how do you fix it in MERN?", a: "N+1 happens when you fetch N records then make N additional queries for related data. Fix with MongoDB $lookup aggregation or Mongoose populate to fetch related data in a single query.", example: "Real-life example: Fetching 100 applications then querying each job separately = 101 queries. Using populate or $lookup = 1 query." },
    { q: "How do you handle file size limits and validation in MERN file uploads?", a: "Set Multer limits option for file size, use fileFilter for allowed MIME types, validate on the frontend before upload, and use cloud storage (S3/Cloudinary) with signed URLs for secure direct uploads.", example: "Real-life example: multer({ limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => cb(null, file.mimetype === 'application/pdf') }) — allows only PDFs under 5MB." }
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
  <>
  <style>{`
    @media (max-width: 768px) {
      .mern-title { font-size: 1.5rem !important; }
      .mern-subtitle { font-size: 0.88rem !important; }
      .mern-card-title { font-size: 1.05rem !important; }
      .mern-question { font-size: 0.88rem !important; }
      .mern-answer { font-size: 0.83rem !important; line-height: 1.55 !important; }
      .mern-example { font-size: 0.78rem !important; }
      .mern-container { padding: 14px !important; }
      .mern-card { padding: 14px !important; gap: 10px !important; }
      .mern-page-btn { padding: 6px 10px !important; font-size: 0.82rem !important; }
    }
  `}</style>
  <main style={styles.container} className="mern-container" ref={topRef}>
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
        <h1 style={styles.title} className="mern-title">MERN Stack</h1>
        <p style={styles.subtitle} className="mern-subtitle">
          Starter notes for beginners with interview-focused explanations
        </p>
      </header>

      <section style={styles.topicsGrid}>
        {paginatedTopics.map((topic, index) => (
          <article key={index} style={styles.card} className="mern-card">
            <div style={styles.cardHeader}>
              <span style={styles.icon}>{topic.icon}</span>
              <h2 style={styles.cardTitle} className="mern-card-title">{topic.title}</h2>
            </div>

            {topic.questions.map((item, idx) => (
              <div key={idx} style={styles.qaBlock}>
                <h3 style={styles.question} className="mern-question">Q. {item.q}</h3>
                <p style={styles.answer} className="mern-answer">{item.a}</p>
                <p style={styles.example} className="mern-example">
                  <strong>Example:</strong> {item.example}
                </p>
              </div>
            ))}
          </article>
        ))}
      </section>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button style={styles.pageBtn} className="mern-page-btn"
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
    </>
  );
};


const styles = {
  container: {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",backgroundColor:"#ebeaea",
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

export default MernNotes;
