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
  FaTools,FaCloudDownloadAlt,FaPuzzlePiece, FaUsersCog,FaMicroscope,FaUniversalAccess,FaSkullCrossbones,FaExpandArrowsAlt,FaLink,
  FaBrain                
} from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
const ReactNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
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
  },{
    icon: <FaBolt />,
    title: "React Lifecycle (Functional)",
    questions: [
      { q: "What are the lifecycle phases in a functional component?", a: "Mount (component appears), Update (state/props change), Unmount (component removed). useEffect with [], [deps], and cleanup function handles all three phases.", example: "Real-life example: [] = fetch data on page load. [userId] = re-fetch when user changes. cleanup = cancel API call when user leaves the page." },
      { q: "How do you run code on component unmount?", a: "Return a cleanup function from useEffect. It runs when the component is removed from the DOM, preventing memory leaks from timers, subscriptions, or event listeners.", example: "Real-life example: return () => clearInterval(timer) inside useEffect to stop a countdown when the modal closes." },
      { q: "What happens if you update state inside useEffect without a dependency array?", a: "It causes an infinite loop — state update triggers re-render, re-render triggers useEffect, which updates state again, forever.", example: "Real-life example: setCount(count + 1) inside useEffect with no deps array crashes the app with infinite re-renders." }
    ]
  },
  {
    icon: <FaDatabase />,
    title: "Forms and Validation in React",
    questions: [
      { q: "What is the difference between controlled and uncontrolled forms?", a: "Controlled forms store input values in React state — React is the single source of truth. Uncontrolled forms store values in the DOM itself, accessed via refs.", example: "Real-life example: A registration form using useState for each field is controlled. A simple file upload using useRef is uncontrolled." },
      { q: "How do you handle form validation in React?", a: "Validate on onChange (real-time), onBlur (when field loses focus), or onSubmit. Set error messages in state and display them conditionally below each field.", example: "Real-life example: Showing 'Email is required' in red under the email field when the user clicks Submit without filling it." },
      { q: "What are form libraries used in React projects?", a: "React Hook Form (performance-focused, minimal re-renders), Formik (popular, feature-rich), and Yup (schema-based validation used alongside both).", example: "Real-life example: Using React Hook Form with Yup to validate a multi-step job application form with 10+ fields." }
    ]
  },
  {
    icon: <FaRoute />,
    title: "React Router (Advanced)",
    questions: [
      { q: "What is the difference between useNavigate and useLocation?", a: "useNavigate returns a function to programmatically redirect the user. useLocation returns the current URL object including pathname, search params, and state.", example: "Real-life example: After login, useNavigate('/dashboard') redirects the user. useLocation reads ?redirectTo=/profile from the URL." },
      { q: "What are protected routes?", a: "Protected routes check if a user is authenticated before rendering a page. If not, they redirect to the login page using useNavigate or the Navigate component.", example: "Real-life example: Wrapping /dashboard and /profile in an AuthGuard component that redirects to /login if no token exists in localStorage." },
      { q: "What are dynamic routes in React Router?", a: "Dynamic routes use URL parameters (/:id) to render different content based on the URL. useParams() hook extracts these parameters inside the component.", example: "Real-life example: /jobs/:jobId renders different job details based on which job was clicked. useParams() gives the jobId value." }
    ]
  },
  {
    icon: <FaLayerGroup />,
    title: "Code Splitting and Lazy Loading",
    questions: [
      { q: "What is code splitting in React?", a: "Code splitting breaks the app bundle into smaller chunks that are loaded on demand instead of loading everything upfront. React.lazy() and dynamic import() enable this.", example: "Real-life example: The admin dashboard code is only downloaded when an admin user navigates to /admin — regular users never download it." },
      { q: "How do you implement lazy loading in React?", a: "Use React.lazy(() => import('./Component')) with a Suspense wrapper that shows a fallback (loading spinner) while the component loads.", example: "Real-life example: const Dashboard = React.lazy(() => import('./Dashboard')); wrapped in <Suspense fallback={<Spinner />}>." },
      { q: "What is the difference between lazy loading components and images?", a: "Component lazy loading uses React.lazy(). Image lazy loading uses the native loading='lazy' HTML attribute or Intersection Observer API to load images only when they enter the viewport.", example: "Real-life example: A job listing page with 100 company logos — images load only as the user scrolls down." }
    ]
  },
  {
    icon: <FaTools />,
    title: "Testing React Components",
    questions: [
      { q: "What tools are used to test React components?", a: "Jest (test runner + assertions), React Testing Library (RTL) for component testing, and Cypress for end-to-end testing. RTL is preferred because it tests behavior, not implementation.", example: "Real-life example: Testing that clicking 'Add to Cart' button increases the cart count by 1 — without caring about internal state structure." },
      { q: "What is the difference between getBy, queryBy, and findBy in RTL?", a: "getBy throws if element not found (synchronous). queryBy returns null if not found (good for checking absence). findBy returns a promise (for async elements).", example: "Real-life example: Use findByText('Welcome') after login to wait for the greeting that appears after an API call resolves." },
      { q: "What is mocking in React tests?", a: "Mocking replaces real functions, APIs, or modules with fake versions during tests to isolate the component being tested.", example: "Real-life example: Mocking axios.get to return fake job data instead of making a real API call during a JobList component test." }
    ]
  },
  {
    icon: <FaSync />,
    title: "Concurrent Features (React 18)",
    questions: [
      { q: "What is Concurrent Mode in React 18?", a: "Concurrent Mode allows React to work on multiple tasks simultaneously and pause, interrupt, or resume rendering. This keeps the UI responsive even during heavy updates.", example: "Real-life example: Typing in a search box feels instant because React prioritizes the input update over the expensive list filtering re-render." },
      { q: "What is the useTransition hook?", a: "useTransition marks a state update as non-urgent. React renders it in the background without blocking urgent updates like user input.", example: "Real-life example: Filtering 10,000 records — wrap the filter state update in startTransition so typing stays smooth while the list updates later." },
      { q: "What is the useDeferredValue hook?", a: "useDeferredValue defers re-rendering a part of the UI to avoid blocking urgent updates. Similar to useTransition but for values rather than state setters.", example: "Real-life example: const deferredSearch = useDeferredValue(searchText) — the search results lag slightly behind typing but input stays instant." }
    ]
  },
  {
    icon: <FaTachometerAlt />,
    title: "React Performance Patterns",
    questions: [
      { q: "What is React.memo and when should you use it?", a: "React.memo is a HOC that prevents a functional component from re-rendering if its props haven't changed. Use it for pure components that receive the same props frequently.", example: "Real-life example: Wrapping a JobCard component with React.memo so it doesn't re-render when the parent's unrelated state (like a search input) changes." },
      { q: "What is the key prop and why is it critical in lists?", a: "The key prop helps React identify which list items changed, were added, or removed during reconciliation. Keys must be unique and stable — avoid using array indexes as keys.", example: "Real-life example: Using job._id as key in a job list. If you use index as key and delete item 2, React gets confused and re-renders wrong items." },
      { q: "What is windowing or virtual scrolling?", a: "Windowing renders only the visible items in a long list instead of all items. Libraries like react-window or react-virtual implement this pattern.", example: "Real-life example: A list of 10,000 employees — only 20 visible rows are in the DOM at a time, making scroll buttery smooth." }
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

export default ReactNotes;
