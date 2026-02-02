import {
  FaProjectDiagram,
  FaListUl,
  FaLayerGroup,
  FaExchangeAlt,
  FaClock,
  FaObjectGroup,
  FaCube,
  FaLock,
  FaRandom,
  FaEyeSlash,
  FaCogs,
  FaSyncAlt,
  FaDraftingCompass,
  FaBug,
  FaMemory,
  FaCubes,
  FaTools,
  FaCodeBranch,
  FaSitemap,
  FaPuzzlePiece,
  FaNetworkWired,
  FaRecycle,
  FaShieldAlt
} from "react-icons/fa";
import React, { useState, useEffect } from "react";

const OopsNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

const topics = [
  {
    icon: <FaObjectGroup />,
    title: "Introduction to Object-Oriented Programming (OOP)",
    questions: [
      {
        q: "What is Object-Oriented Programming (OOP)?",
        a: "Object-Oriented Programming is a programming paradigm that organizes software around objects that combine data and behavior. It helps manage complexity by modeling real-world entities.",
        example:
          "Real-life example: A Student object with properties like name and methods like calculateGrade()."
      },
      {
        q: "Why is OOP preferred over procedural programming?",
        a: "OOP offers better modularity, reusability, and scalability, making it easier to maintain large applications compared to procedural programming.",
        example:
          "Real-life example: Managing large enterprise software with multiple modules."
      },
      {
        q: "Which programming languages support OOP?",
        a: "Languages such as Java, C++, Python, C#, and JavaScript support OOP concepts.",
        example:
          "Real-life example: Java used in enterprise banking applications."
      }
    ]
  },

  {
    icon: <FaCube />,
    title: "Class and Object",
    questions: [
      {
        q: "What is a class?",
        a: "A class is a blueprint that defines properties and methods common to all objects of that type.",
        example:
          "Real-life example: A Car blueprint defining color and engine type."
      },
      {
        q: "What is an object?",
        a: "An object is an instance of a class that occupies memory and represents a real entity.",
        example:
          "Real-life example: A specific car owned by a person."
      },
      {
        q: "What is the difference between class and object?",
        a: "A class is a template, whereas an object is the actual implementation of that template.",
        example:
          "Real-life example: House plan vs actual house."
      }
    ]
  },

  {
    icon: <FaLock />,
    title: "Encapsulation",
    questions: [
      {
        q: "What is encapsulation?",
        a: "Encapsulation is the bundling of data and methods together while restricting direct access to data.",
        example:
          "Real-life example: Private variables accessed through getter and setter methods."
      },
      {
        q: "How is encapsulation implemented?",
        a: "Using access modifiers such as private, protected, and public.",
        example:
          "Real-life example: Bank balance hidden from direct access."
      },
      {
        q: "What are the benefits of encapsulation?",
        a: "Improved security, maintainability, and controlled data access.",
        example:
          "Real-life example: Updating logic without affecting external code."
      }
    ]
  },

  {
    icon: <FaProjectDiagram />,
    title: "Inheritance",
    questions: [
      {
        q: "What is inheritance in OOP?",
        a: "Inheritance allows one class to acquire properties and behavior of another class.",
        example:
          "Real-life example: Car inheriting from Vehicle."
      },
      {
        q: "What are types of inheritance?",
        a: "Single, multilevel, hierarchical, and multiple inheritance (language dependent).",
        example:
          "Real-life example: Employee → Manager hierarchy."
      },
      {
        q: "What are drawbacks of inheritance?",
        a: "Tight coupling and reduced flexibility if overused.",
        example:
          "Real-life example: Changes in base class affecting all child classes."
      }
    ]
  },

  {
    icon: <FaRandom />,
    title: "Polymorphism",
    questions: [
      {
        q: "What is polymorphism?",
        a: "Polymorphism allows the same method to perform different behaviors based on object type.",
        example:
          "Real-life example: Different payment modes using same pay() method."
      },
      {
        q: "What are types of polymorphism?",
        a: "Compile-time (method overloading) and runtime (method overriding).",
        example:
          "Real-life example: Same function name with different parameters."
      },
      {
        q: "Why is polymorphism useful?",
        a: "It simplifies code and improves extensibility.",
        example:
          "Real-life example: Adding new payment options without changing existing logic."
      }
    ]
  },

  {
    icon: <FaEyeSlash />,
    title: "Abstraction",
    questions: [
      {
        q: "What is abstraction?",
        a: "Abstraction hides implementation details and shows only essential features.",
        example:
          "Real-life example: Using ATM without knowing internal processing."
      },
      {
        q: "How is abstraction achieved?",
        a: "Using abstract classes and interfaces.",
        example:
          "Real-life example: Payment interface implemented by multiple methods."
      },
      {
        q: "Difference between abstraction and encapsulation?",
        a: "Abstraction focuses on hiding complexity, encapsulation focuses on data protection.",
        example:
          "Real-life example: Driving vs engine protection."
      }
    ]
  },

  {
    icon: <FaCogs />,
    title: "Constructor",
    questions: [
      {
        q: "What is a constructor?",
        a: "A constructor initializes objects when they are created.",
        example:
          "Real-life example: Setting initial values while creating an account."
      },
      {
        q: "Can constructors be overloaded?",
        a: "Yes, constructors can be overloaded with different parameters.",
        example:
          "Real-life example: Creating users with or without optional data."
      },
      {
        q: "Is constructor inherited?",
        a: "Constructors are not inherited but parent constructors can be called.",
        example:
          "Real-life example: Child class calling parent setup."
      }
    ]
  },

  {
    icon: <FaSyncAlt />,
    title: "Message Passing",
    questions: [
      {
        q: "What is message passing in OOP?",
        a: "Objects communicate by invoking methods on each other.",
        example:
          "Real-life example: Order object calling payment object."
      },
      {
        q: "Why is message passing important?",
        a: "It promotes loose coupling and modular design.",
        example:
          "Real-life example: Microservice communication."
      },
      {
        q: "How does message passing improve scalability?",
        a: "It allows independent object interaction without tight dependencies.",
        example:
          "Real-life example: Distributed systems."
      }
    ]
  },{
  icon: <FaCodeBranch />,
  title: "Method Overloading and Overriding",
  questions: [
    {
      q: "What is method overloading?",
      a: "Method overloading allows multiple methods with the same name but different parameters within the same class. It improves readability and flexibility of code.",
      example:
        "Real-life example: A calculateSalary() method with different parameters for full-time and part-time employees."
    },
    {
      q: "What is method overriding?",
      a: "Method overriding occurs when a child class provides a specific implementation of a method already defined in its parent class.",
      example:
        "Real-life example: A Manager class overriding calculateSalary() from Employee class."
    },
    {
      q: "What is the key difference between overloading and overriding?",
      a: "Overloading happens at compile time within the same class, while overriding happens at runtime between parent and child classes.",
      example:
        "Real-life example: Same method name, different behaviors based on context."
    }
  ]
},

{
  icon: <FaSitemap />,
  title: "Interfaces",
  questions: [
    {
      q: "What is an interface in OOP?",
      a: "An interface defines a contract that a class must follow by implementing its methods without providing implementation details.",
      example:
        "Real-life example: Payment interface implemented by CreditCard and UPI classes."
    },
    {
      q: "Why are interfaces important?",
      a: "Interfaces support abstraction, loose coupling, and multiple inheritance in many languages.",
      example:
        "Real-life example: Plug-and-play design in payment gateways."
    },
    {
      q: "Difference between interface and abstract class?",
      a: "Interfaces define what a class should do, abstract classes define what a class is.",
      example:
        "Real-life example: Rulebook vs partially built system."
    }
  ]
},

{
  icon: <FaPuzzlePiece />,
  title: "Abstract Classes",
  questions: [
    {
      q: "What is an abstract class?",
      a: "An abstract class is a class that cannot be instantiated and may contain abstract and concrete methods.",
      example:
        "Real-life example: A Shape class with abstract method calculateArea()."
    },
    {
      q: "When should abstract classes be used?",
      a: "When multiple related classes share common functionality but should not be instantiated directly.",
      example:
        "Real-life example: Vehicle as a base class for Car and Bike."
    },
    {
      q: "Can abstract classes have constructors?",
      a: "Yes, abstract classes can have constructors to initialize common data.",
      example:
        "Real-life example: Initializing shared vehicle properties."
    }
  ]
},

{
  icon: <FaNetworkWired />,
  title: "Association, Aggregation, and Composition",
  questions: [
    {
      q: "What is association in OOP?",
      a: "Association defines a relationship between two independent classes.",
      example:
        "Real-life example: Teacher and Student relationship."
    },
    {
      q: "What is aggregation?",
      a: "Aggregation is a weak 'has-a' relationship where objects can exist independently.",
      example:
        "Real-life example: Department and Employees."
    },
    {
      q: "What is composition?",
      a: "Composition is a strong 'has-a' relationship where child objects cannot exist without parent.",
      example:
        "Real-life example: House and Rooms."
    }
  ]
},

{
  icon: <FaRecycle />,
  title: "Object Lifecycle",
  questions: [
    {
      q: "What is object lifecycle in OOP?",
      a: "Object lifecycle refers to stages from object creation to destruction.",
      example:
        "Real-life example: Creating and deleting user sessions."
    },
    {
      q: "What happens during object creation?",
      a: "Memory allocation and constructor execution happen during object creation.",
      example:
        "Real-life example: Initializing user profile data."
    },
    {
      q: "How are objects destroyed?",
      a: "Objects are destroyed using garbage collection or destructors depending on the language.",
      example:
        "Real-life example: Clearing unused cache objects."
    }
  ]
},

{
  icon: <FaShieldAlt />,
  title: "Data Hiding",
  questions: [
    {
      q: "What is data hiding in OOP?",
      a: "Data hiding restricts direct access to internal object data to protect it from misuse.",
      example:
        "Real-life example: Private variables in a class."
    },
    {
      q: "How is data hiding achieved?",
      a: "Using access modifiers like private and protected.",
      example:
        "Real-life example: Preventing direct balance modification."
    },
    {
      q: "Why is data hiding important?",
      a: "It improves security, reduces bugs, and enforces controlled access.",
      example:
        "Real-life example: Secure banking applications."
    }
  ]
},{
  icon: <FaDraftingCompass />,
  title: "Design Principles (SOLID Basics)",
  questions: [
    {
      q: "What are SOLID principles?",
      a: "SOLID is a set of five design principles that help make software more maintainable, flexible, and scalable.",
      example:
        "Real-life example: Separating user authentication logic from business logic."
    },
    {
      q: "Why are SOLID principles important?",
      a: "They reduce tight coupling, make code easier to extend, and improve long-term maintainability.",
      example:
        "Real-life example: Adding new features without breaking existing code."
    },
    {
      q: "Which SOLID principle is most important for beginners?",
      a: "Single Responsibility Principle, as it teaches keeping one class focused on one task.",
      example:
        "Real-life example: Separate classes for user validation and data storage."
    }
  ]
},

{
  icon: <FaBug />,
  title: "Exception Handling in OOP",
  questions: [
    {
      q: "What is exception handling?",
      a: "Exception handling is a mechanism to handle runtime errors gracefully without crashing the program.",
      example:
        "Real-life example: Handling divide-by-zero errors."
    },
    {
      q: "Why is exception handling important?",
      a: "It improves program reliability and user experience by managing unexpected situations.",
      example:
        "Real-life example: Showing error messages instead of application crash."
    },
    {
      q: "What is the difference between error and exception?",
      a: "Errors are usually unrecoverable, while exceptions can be handled.",
      example:
        "Real-life example: System crash vs invalid user input."
    }
  ]
},

{
  icon: <FaLayerGroup />,
  title: "Coupling and Cohesion",
  questions: [
    {
      q: "What is coupling?",
      a: "Coupling refers to the level of dependency between classes or modules.",
      example:
        "Real-life example: One class heavily dependent on another."
    },
    {
      q: "What is cohesion?",
      a: "Cohesion measures how closely related the responsibilities of a class are.",
      example:
        "Real-life example: A class handling only user-related operations."
    },
    {
      q: "Why is low coupling and high cohesion preferred?",
      a: "It makes systems easier to maintain, test, and scale.",
      example:
        "Real-life example: Updating one module without affecting others."
    }
  ]
},

{
  icon: <FaMemory />,
  title: "Memory Management in OOP",
  questions: [
    {
      q: "What is memory management?",
      a: "Memory management handles allocation and deallocation of memory for objects.",
      example:
        "Real-life example: Creating and deleting objects during program execution."
    },
    {
      q: "What is garbage collection?",
      a: "Garbage collection automatically frees memory occupied by unused objects.",
      example:
        "Real-life example: Java and JavaScript freeing unused variables."
    },
    {
      q: "Why is memory management important?",
      a: "Poor memory management can cause memory leaks and application crashes.",
      example:
        "Real-life example: Long-running applications slowing down."
    }
  ]
},

{
  icon: <FaCubes />,
  title: "Object Cloning",
  questions: [
    {
      q: "What is object cloning?",
      a: "Object cloning is the process of creating an exact copy of an object.",
      example:
        "Real-life example: Duplicating user settings."
    },
    {
      q: "What is shallow copy vs deep copy?",
      a: "Shallow copy copies references, deep copy copies actual objects.",
      example:
        "Real-life example: Copying a list with nested objects."
    },
    {
      q: "When should object cloning be used?",
      a: "When independent object copies are needed without affecting the original.",
      example:
        "Real-life example: Undo/redo functionality."
    }
  ]
},

{
  icon: <FaTools />,
  title: "OOP Best Practices",
  questions: [
    {
      q: "What are OOP best practices?",
      a: "Practices such as meaningful naming, small classes, and reusability.",
      example:
        "Real-life example: Clean and readable codebases."
    },
    {
      q: "Why are best practices important?",
      a: "They improve code readability, maintainability, and teamwork.",
      example:
        "Real-life example: Easier onboarding of new developers."
    },
    {
      q: "How do best practices help in interviews?",
      a: "They demonstrate professionalism and real-world understanding of OOP.",
      example:
        "Real-life example: Explaining design choices confidently."
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
        <h1 style={styles.title}>Object Oriented Programming</h1>
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

export default OopsNotes;
