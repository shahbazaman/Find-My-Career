
import { useEffect, useState } from "react";
import {
  FaDatabase,
  FaTable,
  FaKey,
  FaProjectDiagram,
  FaLayerGroup,
  FaSearch,
  FaListUl,
  FaFilter,
  FaCalculator,
  FaLink,
  FaShieldAlt,
  FaUserLock,
  FaLock,
  FaEye,
  FaSearchPlus,
  FaCogs,
  FaBolt,
  FaRedoAlt,
  FaSyncAlt
} from "react-icons/fa";


const DbmsNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
 
const topics = [
  {
    icon: <FaDatabase />,
    title: "Introduction to DBMS",
    questions: [
      {
        q: "What is DBMS and why is it needed?",
        a: "DBMS (Database Management System) is software that enables users and applications to store, retrieve, update, and manage data efficiently. It provides data consistency, minimizes redundancy, supports concurrent access, and enforces security rules.",
        example:
          "Real-life example: A college maintains student records using a DBMS instead of multiple Excel files to avoid duplication and data loss."
      },
      {
        q: "What are the advantages of DBMS over file system?",
        a: "DBMS offers better data consistency, reduced redundancy, improved security, backup and recovery, and multi-user access compared to traditional file systems.",
        example:
          "Real-life example: Multiple bank employees accessing customer data safely at the same time."
      },
      {
        q: "What are common DBMS applications in real-world systems?",
        a: "DBMS is widely used in banking systems, airline reservations, hospital management, e-commerce platforms, and enterprise ERP systems.",
        example:
          "Real-life example: Amazon using databases to manage users, orders, and inventory."
      }
    ]
  },

  {
    icon: <FaTable />,
    title: "Database and Table",
    questions: [
      {
        q: "What is a database and a table?",
        a: "A database is a structured collection of related data, while a table organizes this data into rows (records) and columns (attributes).",
        example:
          "Real-life example: A contacts app where each contact is a row and name, phone, email are columns."
      },
      {
        q: "What is a record and a field?",
        a: "A record is a complete row in a table representing one entity, while a field is a column representing a specific attribute.",
        example:
          "Real-life example: One employee’s details form a record, while salary is a field."
      },
      {
        q: "Can a database have multiple tables?",
        a: "Yes, a database typically consists of multiple related tables connected using keys to reduce redundancy and improve organization.",
       example:
          "Real-life example: Separate tables for users, orders, and payments in an e-commerce app."
      }
    ]
  },

  {
    icon: <FaKey />,
    title: "Keys in DBMS",
    questions: [
      {
        q: "What are primary key and foreign key?",
        a: "A primary key uniquely identifies each record and does not allow duplicates or NULL values. A foreign key references the primary key of another table to establish relationships.",
        example:
          "Real-life example: customerId in Orders referencing Customers table."
      },
      {
        q: "What is a candidate key?",
        a: "A candidate key is a field or combination of fields that can uniquely identify a record. One of them is chosen as the primary key.",
        example:
          "Real-life example: Email or phone number can uniquely identify a user."
      },
      {
        q: "Why are keys important in DBMS?",
        a: "Keys maintain data integrity, avoid duplication, and define relationships between tables.",
        example:
          "Real-life example: Preventing duplicate roll numbers in a student table."
      }
    ]
  },

  {
    icon: <FaProjectDiagram />,
    title: "Relationships in DBMS",
    questions: [
      {
        q: "What are the types of relationships in DBMS?",
        a: "One-to-One, One-to-Many, and Many-to-Many relationships define how tables are connected.",
        example:
          "Real-life example: One customer → many orders."
      },
      {
        q: "How is a many-to-many relationship implemented?",
        a: "Using a junction table that contains foreign keys from both related tables.",
        example:
          "Real-life example: Students and courses linked through an enrollment table."
      },
      {
        q: "Why are relationships important?",
        a: "They reduce redundancy and maintain data consistency across tables.",
        example:
          "Real-life example: Avoiding repeated customer details in orders."
      }
    ]
  },

  {
    icon: <FaLayerGroup />,
    title: "Normalization",
    questions: [
      {
        q: "What is normalization?",
        a: "Normalization is the process of organizing data to eliminate redundancy and improve data integrity by splitting tables logically.",
        example:
          "Real-life example: Separating user and address data into different tables."
      },
      {
        q: "What are normal forms?",
        a: "Normal forms (1NF, 2NF, 3NF) are rules applied step by step to normalize a database.",
        example:
          "Real-life example: Removing partial and transitive dependencies."
      },
      {
        q: "What are disadvantages of over-normalization?",
        a: "It can increase complexity and slow down queries due to excessive joins.",
        example:
          "Real-life example: Performance issues in highly normalized reporting systems."
      }
    ]
  },

  {
    icon: <FaSearch />,
    title: "Introduction to SQL",
    questions: [
      {
        q: "What is SQL?",
        a: "SQL is a standard language used to interact with relational databases for storing, retrieving, and managing data.",
        example:
          "Real-life example: Fetching job applicants from a database."
      },
      {
        q: "Is SQL case-sensitive?",
        a: "SQL keywords are not case-sensitive, but data values may be depending on the database.",
        example:
          "Real-life example: SELECT and select work the same."
      },
      {
        q: "What are SQL sublanguages?",
        a: "DDL, DML, DCL, and TCL divide SQL operations logically.",
       example:
          "Real-life example: CREATE (DDL), INSERT (DML)."
      }
    ]
  },

  {
    icon: <FaListUl />,
    title: "Basic SQL Commands",
    questions: [
      {
        q: "What are SELECT, INSERT, UPDATE, DELETE?",
        a: "They are core SQL commands for retrieving, adding, modifying, and removing records.",
        example:
          "Real-life example: Updating profile details."
      },
      {
        q: "What is TRUNCATE vs DELETE?",
        a: "DELETE removes selected rows, TRUNCATE removes all rows faster and cannot be rolled back easily.",
        example:
          "Real-life example: Clearing log data."
      }
    ]
  },

  {
    icon: <FaFilter />,
    title: "WHERE, ORDER BY, GROUP BY",
    questions: [
      {
        q: "What is WHERE clause?",
        a: "Filters records based on conditions.",
        example:
          "Real-life example: Employees with salary > 50,000."
      },
      {
        q: "Difference between WHERE and HAVING?",
        a: "WHERE filters rows, HAVING filters grouped data.",
       example:
          "Real-life example: Departments with average salary > 60,000."
      }
    ]
  },

  {
    icon: <FaCalculator />,
    title: "Aggregate Functions",
    questions: [
      {
        q: "What are aggregate functions?",
        a: "Functions like COUNT, SUM, AVG, MIN, MAX operate on multiple rows.",
        example:
          "Real-life example: Calculating total sales."
      },
      {
        q: "Can aggregate functions be used with GROUP BY?",
        a: "Yes, they are commonly used together for summarized data.",
       example:
          "Real-life example: Department-wise employee count."
      }
    ]
  },

  {
    icon: <FaLink />,
    title: "Joins in SQL",
    questions: [
      {
        q: "What are SQL joins?",
        a: "Joins combine rows from multiple tables based on relationships.",
       example:
          "Real-life example: Orders with customer names."
      },
      {
        q: "Difference between INNER JOIN and LEFT JOIN?",
        a: "INNER JOIN returns matching records, LEFT JOIN returns all left table records.",
       example:
          "Real-life example: Customers with or without orders."
      }
    ]
  },

  {
    icon: <FaShieldAlt />,
    title: "Transactions and ACID Properties",
    questions: [
      {
        q: "What is a transaction?",
        a: "A transaction is a sequence of operations executed as a single unit.",
       example:
          "Real-life example: Bank money transfer."
      },
      {
        q: "Explain ACID properties.",
        a: "Atomicity, Consistency, Isolation, Durability ensure reliable transactions.",
       example:
          "Real-life example: Ensuring money is not lost during failure."
      }
    ]
  },

  {
    icon: <FaUserLock />,
    title: "Database Security",
    questions: [
      {
        q: "How does DBMS provide security?",
        a: "Using authentication, authorization, encryption, and access control.",
       example:
          "Real-life example: HR-only access to salary data."
      },
      {
        q: "What is SQL injection?",
        a: "A security attack where malicious SQL is injected via inputs.",
       example:
          "Real-life example: Login form without input validation."
      }
    ]
  },{
  icon: <FaProjectDiagram />,
  title: "ER Model (Entity Relationship Model)",
  questions: [
    {
      q: "What is an ER Model?",
      a: "An ER Model is a conceptual design tool used to represent the structure of a database before implementation. It visually describes entities, attributes, and relationships.",
      example:
        "Real-life example: Designing a college database showing students, courses, and enrollments."
    },
    {
      q: "What is the difference between strong and weak entities?",
      a: "A strong entity has its own primary key, while a weak entity depends on another entity and uses a composite key.",
      example:
        "Real-life example: Order is strong, order_items is weak."
    }
  ]
},

{
  icon: <FaLock />,
  title: "Constraints in DBMS",
  questions: [
    {
      q: "What are constraints?",
      a: "Constraints are rules applied to columns to enforce data integrity and validity.",
      example:
        "Real-life example: Preventing empty values in email column."
    },
    {
      q: "What is the difference between UNIQUE and PRIMARY KEY?",
      a: "PRIMARY KEY uniquely identifies records and cannot be NULL, while UNIQUE allows one NULL value.",
      example:
        "Real-life example: User ID as primary key, email as unique."
    }
  ]
},

{
  icon: <FaEye />,
  title: "Views in SQL",
  questions: [
    {
      q: "What is a view?",
      a: "A view is a virtual table created using a SQL query to present filtered or summarized data.",
      example:
        "Real-life example: Hiding employee salary information."
    },
    {
      q: "What are advantages of views?",
      a: "Views enhance security, simplify complex queries, and provide abstraction.",
      example:
        "Real-life example: HR viewing limited employee data."
    }
  ]
},

{
  icon: <FaSearchPlus />,
  title: "Indexes in DBMS",
  questions: [
    {
      q: "What is an index?",
      a: "An index is a data structure that improves query performance by reducing data search time.",
      example:
        "Real-life example: Fast email-based login search."
    },
    {
      q: "What are disadvantages of indexing?",
      a: "Indexes increase storage usage and slow down insert and update operations.",
      example:
        "Real-life example: Frequent data updates in logs table."
    }
  ]
},

{
  icon: <FaCogs />,
  title: "Stored Procedures",
  questions: [
    {
      q: "What is a stored procedure?",
      a: "A stored procedure is a precompiled set of SQL statements stored in the database.",
      example:
        "Real-life example: Payroll calculation procedure."
    },
    {
      q: "Why use stored procedures?",
      a: "They improve performance, security, and code reusability.",
      example:
        "Real-life example: Reusing business logic across applications."
    }
  ]
},

{
  icon: <FaBolt />,
  title: "Triggers in DBMS",
  questions: [
    {
      q: "What is a trigger?",
      a: "A trigger is an automatic action executed in response to database events like INSERT, UPDATE, or DELETE.",
      example:
        "Real-life example: Auto-logging user activity."
    },
    {
      q: "What are common trigger use cases?",
      a: "Auditing, enforcing rules, and maintaining derived data.",
      example:
        "Real-life example: Updating stock count after purchase."
    }
  ]
},

{
  icon: <FaRedoAlt />,
  title: "Subqueries in SQL",
  questions: [
    {
      q: "What is a subquery?",
      a: "A subquery is a query nested inside another SQL query.",
      example:
        "Real-life example: Finding employees earning above average salary."
    },
    {
      q: "Subquery vs JOIN – which is better?",
      a: "JOINs are generally faster and more readable, but subqueries are useful for step-by-step logic.",
      example:
        "Real-life example: Filtering data using aggregated results."
    }
  ]
},

{
  icon: <FaLayerGroup />,
  title: "Deadlock in DBMS",
  questions: [
    {
      q: "What is a deadlock?",
      a: "A deadlock occurs when two or more transactions wait indefinitely for each other to release locks.",
      example:
        "Real-life example: Two bank transactions waiting for locked accounts."
    },
    {
      q: "How can deadlocks be prevented?",
      a: "Using lock ordering, timeout mechanisms, and deadlock detection algorithms.",
      example:
        "Real-life example: Timeout-based transaction rollback."
    }
  ]
},

{
  icon: <FaSyncAlt />,
  title: "Concurrency Control",
  questions: [
    {
      q: "What is concurrency control?",
      a: "Concurrency control ensures correct results when multiple transactions execute simultaneously.",
      example:
        "Real-life example: Multiple users booking tickets."
    },
    {
      q: "What are common concurrency problems?",
      a: "Dirty read, lost update, and phantom read.",
      example:
        "Real-life example: Incorrect balance due to simultaneous withdrawals."
    }
  ]
},

{
  icon: <FaDatabase />,
  title: "SQL vs NoSQL Databases",
  questions: [
    {
      q: "What is the difference between SQL and NoSQL?",
      a: "SQL databases use structured schemas and tables, while NoSQL databases use flexible schemas and collections.",
      example:
        "Real-life example: MySQL for banking, MongoDB for analytics."
    },
    {
      q: "When should NoSQL be preferred?",
      a: "When scalability, flexibility, and high write performance are required.",
      example:
        "Real-life example: Social media feeds."
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
        <h1 style={styles.title}>Data Base & SQL</h1>
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
  },pagination: {
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
