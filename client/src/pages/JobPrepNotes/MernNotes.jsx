// File: src/pages/JobPrepNotes/MernNotes.jsx
import React, { useEffect, useState } from "react";
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
  FaVial,         // Testing
  FaDocker,       // DevOps/Containers
  FaRocket,       // Performance/Deployment
  FaSearchDollar  // SEO & Web Vitals
} from "react-icons/fa";
const MernNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

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
  }
];

  const totalPages = Math.ceil(topics.length / topicsPerPage);
  const startIndex = (currentPage - 1) * topicsPerPage;
  const paginatedTopics = topics.slice(
    startIndex,
    startIndex + topicsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>MERN Stack</h1>
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
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",backgroundColor:"#ebeaea"
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
