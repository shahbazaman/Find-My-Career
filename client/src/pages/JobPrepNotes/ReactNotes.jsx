import {
  FaProjectDiagram,
  FaListUl,
  FaLayerGroup,
  FaExchangeAlt,
  FaClock,
  FaReact,
  FaCubes,
  FaDatabase,
  FaSync,
  FaBolt,
  FaRoute,
  FaTachometerAlt,
  FaTools,
  FaCloudDownloadAlt,    // For Data Fetching
  FaPuzzlePiece,         // For Design Patterns
  FaUsersCog,            // For Context API
  FaMicroscope,          // For Profiling/Debugging
  FaUniversalAccess,     // For Portals/Accessibility
  FaSkullCrossbones,     // For Error Boundaries
  FaExpandArrowsAlt,     // For Lifting State Up
  FaLink,                // For Refs
  FaBrain                // For Memoization
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
const ReactNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

const topics = [
  {
    icon: <FaReact />,
    title: "Introduction to React",
    questions: [
      {
        q: "What is React and why is it used?",
        a: "React is a JavaScript library used for building fast, interactive user interfaces, especially for single-page applications. It focuses on the UI layer of an application and allows developers to build reusable components. React improves performance by updating only the parts of the UI that change instead of reloading the entire page, using a concept called the Virtual DOM.",
        example:
          "Real-life example: On Instagram, when you like a post, only the like count updates instead of refreshing the whole page. React enables this smooth experience."
      },
      {
        q: "What problems does React solve?",
        a: "React solves issues like complex UI management, repeated code, and poor performance in large applications. By breaking UI into components, React makes code easier to manage, test, and scale.",
        example:
          "Real-life example: In a dashboard app, charts, tables, and sidebars can be built as independent components."
      }
    ]
  },
  {
    icon: <FaCubes />,
    title: "Components",
    questions: [
      {
        q: "What are components in React?",
        a: "Components are the building blocks of a React application. Each component is a reusable, self-contained piece of UI that controls its own structure and behavior. Components help split large UIs into smaller, manageable parts.",
        example:
          "Real-life example: A website header, footer, and login form can all be separate components."
      },
      {
        q: "What is the difference between functional and class components?",
        a: "Functional components are plain JavaScript functions and are simpler, easier to read, and preferred in modern React. Class components were used earlier and required more boilerplate code. With React Hooks, functional components can now manage state and lifecycle features.",
        example:
          "Real-life example: Writing a simple function to display user details instead of a long class definition."
      }
    ]
  },
  {
  icon: <FaProjectDiagram />,
  title: "JSX",
  questions: [
    {
      q: "What is JSX?",
      a: "JSX (JavaScript XML) is a syntax extension that allows writing HTML-like code inside JavaScript. It makes UI code more readable and expressive. Under the hood, JSX is converted into JavaScript function calls by Babel.",
      example: "Real-life example: Writing <h1>Hello</h1> inside JavaScript instead of React.createElement('h1', null, 'Hello')."
    },
    {
      q: "Can you use JavaScript expressions in JSX?",
      a: "Yes, wrap JavaScript expressions in curly braces {}. You can use variables, functions, objects, arrays, or any valid JS expression inside {}. Text content and attributes also support expressions.",
      example: "Real-life example: <h1>Hello, {userName}!</h1> or <img src={imageUrl} alt='Profile' />"
    }
  ]
},
  {
    icon: <FaLayerGroup />,
    title: "Props",
    questions: [
      {
        q: "What are props in React?",
        a: "Props (short for properties) are used to pass data from a parent component to a child component. Props are read-only, meaning a child component cannot modify the data it receives.",
        example:
          "Real-life example: Passing a username from a parent component to display it in a profile component."
      }
    ]
  },
  {
    icon: <FaDatabase />,
    title: "State",
    questions: [
      {
        q: "What is state in React?",
        a: "State is a built-in object that stores data that can change over time in a component. When state changes, React automatically re-renders the component to reflect the updated data in the UI.",
        example:
          "Real-life example: Updating the number of items in a cart when a user adds a product."
      }
    ]
  },
  {
    icon: <FaSync />,
    title: "State vs Props",
    questions: [
      {
        q: "What is the difference between state and props?",
        a: "Props are used to pass data to a component, while state is used to manage data within a component. Props are immutable, but state can be changed using setState or state updater functions.",
        example:
          "Real-life example: A product price passed as props vs. quantity managed as state inside the cart component."
      }
    ]
  },
  {
    icon: <FaBolt />,
    title: "Hooks",
    questions: [
      {
        q: "What are hooks in React?",
        a: "Hooks are special functions that allow functional components to use state and other React features. Common hooks include useState, useEffect, and useContext. Hooks reduce code complexity and improve readability.",
       example:
          "Real-life example: Using useState to track whether a modal is open or closed."
      },
      {
        q: "What is useEffect used for?",
        a: "useEffect is used to perform side effects like data fetching, DOM updates, and subscriptions. It runs after the component renders and can depend on specific state or props.",
        example:
          "Real-life example: Fetching user data when a profile page loads."
      }
    ]
  },
  {
  icon: <FaRoute />,
  title: "Routing",
  questions: [
    {
      q: "What is routing in React?",
      a: "Routing allows navigation between different views or pages in a React application without reloading the page. It is commonly handled using libraries like React Router.",
      example: "Real-life example: Navigating between Home, About, and Contact pages in a web app."
    },
    {
      q: "How do you set up basic routing with React Router?",
      a: "Install react-router-dom, wrap your app with BrowserRouter, and use Routes, Route, and Link components to define paths and navigation links.",
      example: "Real-life example: <Routes><Route path='/' element={<Home />} /></Routes> with <Link to='/about'>About</Link>"
    }
  ]
},
{
  icon: <FaTachometerAlt />,
  title: "Virtual DOM",
  questions: [
    {
      q: "What is the Virtual DOM?",
      a: "The Virtual DOM is a lightweight copy of the real DOM. React updates the Virtual DOM first, compares changes with the previous version, and applies only the necessary updates to the real DOM. This improves performance significantly.",
      example: "Real-life example: Updating only the changed message in a chat app instead of redrawing the entire chat screen."
    },
    {
      q: "What is reconciliation in React?",
      a: "Reconciliation is the process where React compares the new Virtual DOM with the previous one (diffing) and updates only the changed parts in the real DOM. This is called the diffing algorithm.",
      example: "Real-life example: Changing a todo item's text updates only that item, not the entire todo list."
    }
  ]
},
  {
    icon: <FaTools />,
    title: "Controlled Components",
    questions: [
      {
        q: "What are controlled components?",
        a: "Controlled components are form elements whose values are controlled by React state. This gives full control over user input and helps with validation and data handling.",
        example:
          "Real-life example: A login form where email and password values are managed using React state."
      }
    ]
  },{
    icon: <FaExpandArrowsAlt />,
    title: "Lifting State Up",
    questions: [
      {
        q: "What does 'Lifting State Up' mean?",
        a: "In React, data flows down (parent to child). When two sibling components need to share the same changing data, you move that state to their closest common parent. This ensures a single source of truth.",
        example: "Real-life example: A temperature calculator where one input is in Celsius and another in Fahrenheit; both need to stay synced by sharing a parent state."
      }
    ]
  },
  {
    icon: <FaUniversalAccess />,
    title: "React Portals",
    questions: [
      {
        q: "What are React Portals and when are they used?",
        a: "Portals allow you to render a component outside its parent DOM hierarchy while keeping it inside the React component tree. They are essential for UI elements that need to 'break out' of overflow:hidden or high z-index containers.",
        example: "Real-life example: Modals, Tooltips, and Dropdowns that need to appear on top of everything else in the app."
      }
    ]
  },
  {
    icon: <FaLink />,
    title: "Refs (useRef)",
    questions: [
      {
        q: "What is the purpose of useRef hook?",
        a: "useRef is used to access DOM elements directly or to persist a mutable value across renders without triggering a re-render. It’s like a 'box' that holds a value for the full lifetime of the component.",
        example: "Real-life example: Automatically focusing an input field when a login page loads or managing a timer/interval ID."
      }
    ]
  },
  {
    icon: <FaBrain />,
    title: "Optimization (useMemo & useCallback)",
    questions: [
      {
        q: "How do you prevent unnecessary re-renders in React?",
        a: "We use useMemo to cache the result of a calculation and useCallback to cache a function definition. We also use React.memo to prevent a functional component from re-rendering unless its props change.",
        example: "Real-life example: Filtering a huge list of 5,000 employees. You only want to re-run the filter logic when the search text changes, not on every click elsewhere."
      }
    ]
  },
  {
    icon: <FaSkullCrossbones />,
    title: "Error Boundaries",
    questions: [
      {
        q: "What are Error Boundaries?",
        a: "Error Boundaries are class components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app.",
        example: "Real-life example: If a specific chart component fails to load data, the rest of the dashboard stays visible while showing a 'Something went wrong' message in the chart area."
      }
    ]
  },
{
  icon: <FaSync />,
  title: "Custom Hooks",
  questions: [
    {
      q: "What are Custom Hooks and why use them?",
      a: "Custom Hooks allow you to extract component logic into reusable functions. They must start with the word 'use'. They help in keeping components clean and following the DRY (Don't Repeat Yourself) principle.",
      example: "Real-life example: Creating a 'useFetch' hook to handle API calls and loading states across five different pages."
    },
    {
      q: "How do you create a basic custom hook?",
      a: "Create a function starting with 'use', call other hooks inside it, and return the extracted logic. Custom hooks can call other hooks and follow the same Rules of Hooks.",
      example: "Real-life example: function useCounter() { const [count, setCount] = useState(0); return { count, increment: () => setCount(c => c + 1) }; }"
    }
  ]
}
,{
    icon: <FaCloudDownloadAlt />,
    title: "Server State vs Client State (React Query)",
    questions: [
      {
        q: "What is the difference between Server State and Client State?",
        a: "Client state is UI data like 'isModalOpen'. Server state is data fetched from a database. MNCs use TanStack Query (React Query) to handle server state because it provides automatic caching, background updating, and loading/error states out of the box.",
        example: "Real-life example: An Instagram feed that saves the posts in cache so when you go back, they load instantly without a new API call."
      },
      {
        q: "How do you handle stale data in React?",
        a: "We use 'stale-while-revalidate' logic. The app shows the old data (cached) first while simultaneously fetching new data in the background to keep the UI snappy.",
        example: "Real-life example: A stock price dashboard showing the last known price while fetching the live update."
      }
    ]
  },
  {
  icon: <FaUsersCog />,
  title: "Context API & Prop Drilling",
  questions: [
    {
      q: "What is Prop Drilling and how does Context API solve it?",
      a: "Prop drilling is passing data through many nested components that don't need it. Context API provides a way to share values like 'User Profile' or 'Theme' between components without explicitly passing props at every level.",
      example: "Real-life example: Setting a 'Dark Mode' theme at the top level and having a button 10 layers deep access it directly."
    },
    {
      q: "How do you create and use a Context?",
      a: "Use createContext(), wrap components with Provider, and consume with useContext() hook or Consumer. The Provider accepts a value prop that gets passed to consuming components.",
      example: "Real-life example: const ThemeContext = createContext(); <ThemeContext.Provider value={theme}><App /></ThemeContext.Provider> then const theme = useContext(ThemeContext);"
    }
  ]
},
  {
    icon: <FaPuzzlePiece />,
    title: "Advanced Design Patterns",
    questions: [
      {
        q: "What are High-Order Components (HOC)?",
        a: "An HOC is a function that takes a component and returns a new component. It is used to reuse component logic, such as adding authentication checks to multiple pages.",
        example: "Real-life example: Wrapping a ProfilePage and SettingsPage with a 'withAuth' HOC so only logged-in users can see them."
      },
      {
        q: "What are Compound Components?",
        a: "It is a pattern where components work together to form a unit, sharing implicit state. It makes the API much more flexible for the user.",
        example: "Real-life example: A <Select> component with <Option> children, where the parent manages which child is highlighted."
      }
    ]
  },
  {
    icon: <FaMicroscope />,
    title: "React Profiling & Debugging",
    questions: [
      {
        q: "How do you find performance bottlenecks in React?",
        a: "We use the React DevTools 'Profiler' tab. It records how long each component takes to render and identifies 'Wasted Renders' where a component updated even though its data stayed the same.",
        example: "Real-life example: Finding out that a heavy 'Chart' component is re-rendering every time a user types in a search box nearby."
      },
      {
        q: "What is the 'Strict Mode' in React?",
        a: "Strict Mode is a tool for highlighting potential problems in an application. It intentionally double-invokes constructor and render methods in development to help find side effects and deprecated API usage.",
        example: "Real-life example: Detecting that you are using a legacy lifecycle method that will be removed in future React versions."
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
        <h1 style={styles.title}>React Js</h1>
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

export default ReactNotes;
