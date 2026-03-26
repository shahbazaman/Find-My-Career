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
import React, { useState, useEffect, useRef } from "react";
 import { useNavigate } from "react-router-dom";
import useCourseProgress from "../../hooks/useCourseProgress";
const OopsNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
  const navigate  = useNavigate();
 

const handleBack = () => {
  navigate("/jobPrep");
};
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
},{
    icon: <FaDraftingCompass />,
    title: "SOLID Principles (Deep Dive)",
    questions: [
      { q: "What is the Single Responsibility Principle (SRP)?", a: "A class should have only one reason to change — it should do one thing only. This makes classes easier to test, maintain, and understand.", example: "Real-life example: A UserService class only handles user logic. A separate EmailService handles email sending — not the same class." },
      { q: "What is the Open/Closed Principle (OCP)?", a: "Classes should be open for extension but closed for modification. Add new features by extending, not by editing existing code.", example: "Real-life example: Adding a new payment method (UPI) by creating a new class that implements PaymentInterface, without changing existing CreditCard class." },
      { q: "What is the Liskov Substitution Principle (LSP)?", a: "A child class should be substitutable for its parent class without breaking the application.", example: "Real-life example: If Bird has a fly() method, Penguin (which can't fly) should not extend Bird — it violates LSP." }
    ]
  },
  {
    icon: <FaPuzzlePiece />,
    title: "Design Patterns (Basics)",
    questions: [
      { q: "What are design patterns?", a: "Design patterns are reusable solutions to commonly occurring problems in software design. They are divided into Creational, Structural, and Behavioral patterns.", example: "Real-life example: Using Singleton to ensure only one database connection exists in the entire application." },
      { q: "What is the Singleton pattern?", a: "Singleton ensures only one instance of a class exists and provides a global access point to it.", example: "Real-life example: A Logger class that writes to one log file — creating multiple instances would cause conflicts." },
      { q: "What is the Factory pattern?", a: "Factory pattern creates objects without exposing the instantiation logic. A factory method decides which class to instantiate based on input.", example: "Real-life example: A NotificationFactory that returns EmailNotification or SMSNotification based on user preference." }
    ]
  },
  {
    icon: <FaRandom />,
    title: "Static and Final Keywords",
    questions: [
      { q: "What is a static method or variable?", a: "Static members belong to the class itself, not to any instance. They are shared across all objects of that class.", example: "Real-life example: A counter variable that tracks how many User objects have been created — it must be static to be shared." },
      { q: "What does the final keyword do in OOP?", a: "final on a variable makes it a constant. final on a method prevents overriding. final on a class prevents inheritance.", example: "Real-life example: The Math class in Java is final — no class can extend it to override its methods." },
      { q: "Can a static method be overridden?", a: "No. Static methods are resolved at compile time (method hiding), not runtime. They cannot be overridden in the true polymorphic sense.", example: "Real-life example: Calling Parent.staticMethod() always calls the parent version regardless of which object reference you use." }
    ]
  },
  {
    icon: <FaShieldAlt />,
    title: "Access Modifiers",
    questions: [
      { q: "What are the four access modifiers in Java/C++?", a: "private (same class only), default/package (same package), protected (same package + subclasses), public (everywhere).", example: "Real-life example: Bank balance is private. Account number is protected for subclasses. Bank name is public." },
      { q: "Why should we prefer private over public for fields?", a: "Private fields enforce encapsulation — external code cannot directly modify internal state, reducing bugs and unintended side effects.", example: "Real-life example: Making salary private and exposing it only through getSalary() with validation logic inside." },
      { q: "What is the difference between protected and private in inheritance?", a: "Private members are NOT inherited by child classes. Protected members ARE accessible in child classes but not outside the class hierarchy.", example: "Real-life example: A parent class Account has private balance — even the SavingsAccount child class cannot directly access it." }
    ]
  },
  {
    icon: <FaSyncAlt />,
    title: "Generics and Templates",
    questions: [
      { q: "What are generics in OOP?", a: "Generics allow classes and methods to operate on any data type while providing type safety at compile time, avoiding unnecessary casting.", example: "Real-life example: A Stack<T> class that works for Stack<Integer>, Stack<String>, or Stack<User> without rewriting the class." },
      { q: "Why are generics better than using Object type?", a: "Using Object type requires casting and can cause ClassCastException at runtime. Generics catch type errors at compile time.", example: "Real-life example: List<String> prevents accidentally adding an Integer to a list of Strings." },
      { q: "What is a bounded type parameter in generics?", a: "Bounded type parameters restrict which types can be used. <T extends Number> means T can only be Number or its subclasses.", example: "Real-life example: A calculateSum() method that only accepts Number types — Integer, Double, Float — not String." }
    ]
  },
  {
    icon: <FaNetworkWired />,
    title: "Dependency Injection",
    questions: [
      { q: "What is Dependency Injection (DI)?", a: "DI is a design pattern where an object receives its dependencies from outside rather than creating them internally. It promotes loose coupling.", example: "Real-life example: Instead of UserService creating its own DatabaseConnection, it receives one via constructor — making it easy to swap with a mock database in tests." },
      { q: "What are the types of Dependency Injection?", a: "Constructor Injection (via constructor), Setter Injection (via setter method), and Interface Injection (via interface method).", example: "Real-life example: Spring Framework in Java uses constructor injection by default for mandatory dependencies." },
      { q: "How does DI relate to the Dependency Inversion Principle?", a: "Dependency Inversion says high-level modules should depend on abstractions, not concrete classes. DI is the technique used to implement this principle.", example: "Real-life example: UserService depends on IEmailService interface, not on GmailService directly — so you can switch to OutlookService without changing UserService." }
    ]
  },
  {
    icon: <FaCodeBranch />,
    title: "Operator Overloading",
    questions: [
      { q: "What is operator overloading?", a: "Operator overloading allows redefining how operators like +, -, *, == work for user-defined classes.", example: "Real-life example: A Vector class where v1 + v2 adds coordinates instead of throwing an error." },
      { q: "Which languages support operator overloading?", a: "C++ and Python support operator overloading. Java does not support it for user-defined classes (only for String concatenation internally).", example: "Real-life example: Python's __add__ method lets you define what + means for a Money class." },
      { q: "What are the benefits and risks of operator overloading?", a: "Benefit: makes code more readable and intuitive. Risk: can confuse other developers if overloaded behavior is unexpected or inconsistent.", example: "Real-life example: Overloading == to compare object values instead of references is useful — but overloading + to do subtraction is confusing." }
    ]
  },
  {
    icon: <FaRecycle />,
    title: "Immutability in OOP",
    questions: [
      { q: "What is an immutable object?", a: "An immutable object is one whose state cannot be changed after creation. All fields are set once in the constructor and never modified.", example: "Real-life example: Java's String class is immutable — every 'modification' creates a new String object." },
      { q: "How do you create an immutable class?", a: "Make all fields private and final, provide only a constructor (no setters), and ensure no methods modify state or return mutable references.", example: "Real-life example: A Money class with private final amount and currency — safe to share across threads without synchronization." },
      { q: "Why are immutable objects preferred in concurrent applications?", a: "Immutable objects are inherently thread-safe because their state never changes — no synchronization is needed, reducing bugs and complexity.", example: "Real-life example: Sharing a configuration object across multiple threads without locks." }
    ]
  },{
  icon: <FaLayerGroup />,
  title: "Method Hiding vs Overriding",
  questions: [
    { q: "What is method hiding?", a: "Method hiding occurs when a static method in a child class has the same signature as a static method in the parent class. The child method hides the parent method rather than overriding it.", example: "Real-life example: Calling Parent.show() always calls the parent static version even when using a child reference." },
    { q: "How is method hiding different from method overriding?", a: "Overriding uses runtime polymorphism (dynamic dispatch). Method hiding is resolved at compile time based on the reference type, not the object type.", example: "Real-life example: Parent ref = new Child() → ref.staticMethod() calls Parent's version (hiding), but ref.instanceMethod() calls Child's version (overriding)." },
    { q: "Why is method hiding considered a design smell?", a: "It creates confusion because behavior depends on reference type, not actual object — making code harder to predict and maintain.", example: "Real-life example: Code review catching unexpected behavior when static methods are 'overridden'." }
  ]
},
{
  icon: <FaCogs />,
  title: "Copy Constructor",
  questions: [
    { q: "What is a copy constructor?", a: "A copy constructor creates a new object as a copy of an existing object. It is used when you need an independent duplicate of an object.", example: "Real-life example: Creating a backup of a user profile object before making changes." },
    { q: "What is the difference between copy constructor and assignment operator?", a: "Copy constructor creates a new object. Assignment operator copies values into an already existing object.", example: "Real-life example: Person p2(p1) uses copy constructor. p2 = p1 uses assignment operator." },
    { q: "When is a copy constructor automatically called?", a: "When an object is passed by value to a function, returned by value from a function, or initialized with another object.", example: "Real-life example: Passing a Config object to a function that modifies it — the original is protected." }
  ]
},
{
  icon: <FaEyeSlash />,
  title: "Virtual Functions and VTable",
  questions: [
    { q: "What is a virtual function?", a: "A virtual function is a function declared in a base class that can be overridden in derived classes. It enables runtime polymorphism through dynamic dispatch.", example: "Real-life example: A Shape base class with virtual draw() — Circle and Rectangle each override it with their own drawing logic." },
    { q: "What is a vtable (virtual table)?", a: "A vtable is a lookup table maintained by the compiler for each class with virtual functions. It stores pointers to the actual function implementations.", example: "Real-life example: When you call shape->draw(), the compiler looks up the vtable to find and call the correct draw() for the actual object type." },
    { q: "What is a pure virtual function?", a: "A pure virtual function has no implementation in the base class (declared with = 0) and forces derived classes to provide an implementation.", example: "Real-life example: virtual void draw() = 0 in Shape makes Shape abstract — you cannot create a Shape object directly." }
  ]
},
{
  icon: <FaProjectDiagram />,
  title: "Multiple Inheritance and Diamond Problem",
  questions: [
    { q: "What is multiple inheritance?", a: "Multiple inheritance allows a class to inherit from more than one parent class, gaining features of all parent classes.", example: "Real-life example: A FlyingCar class inheriting from both Car and Aircraft." },
    { q: "What is the diamond problem?", a: "The diamond problem occurs when a class inherits from two classes that both inherit from the same base class, causing ambiguity about which base class implementation to use.", example: "Real-life example: D inherits from B and C, both inherit from A — D.method() is ambiguous if A.method() is not overridden." },
    { q: "How is the diamond problem solved?", a: "In C++, virtual inheritance is used. In Java, the problem is avoided by not allowing multiple class inheritance — only multiple interface implementation.", example: "Real-life example: Java uses interfaces to achieve multiple inheritance safely without the diamond problem." }
  ]
},
{
  icon: <FaRecycle />,
  title: "Destructor and Finalization",
  questions: [
    { q: "What is a destructor?", a: "A destructor is a special method called automatically when an object is destroyed. It is used to release resources like file handles or memory.", example: "Real-life example: A DatabaseConnection class destructor closing the connection when the object goes out of scope." },
    { q: "What is the difference between destructor and garbage collection?", a: "Destructors (C++) are deterministic — called at a predictable time. Garbage collection (Java) is non-deterministic — the JVM decides when to free memory.", example: "Real-life example: C++ RAII pattern guarantees cleanup. Java's finalize() method is deprecated because timing was unreliable." },
    { q: "What is the RAII pattern?", a: "Resource Acquisition Is Initialization — resources are tied to object lifetime. Acquired in constructor, released in destructor automatically.", example: "Real-life example: C++ smart pointers (unique_ptr) automatically delete memory when they go out of scope." }
  ]
},
{
  icon: <FaSitemap />,
  title: "Mixin and Traits",
  questions: [
    { q: "What is a mixin?", a: "A mixin is a class that provides methods to other classes without being a parent class. It adds reusable behavior without full inheritance.", example: "Real-life example: A Serializable mixin adding toJSON() and fromJSON() to any class that includes it." },
    { q: "How are mixins different from inheritance?", a: "Inheritance represents an 'is-a' relationship. Mixins represent a 'can-do' relationship — adding capabilities without implying a type hierarchy.", example: "Real-life example: A Bird is an Animal (inheritance). A Bird can-fly using a Flyable mixin." },
    { q: "What are traits in OOP?", a: "Traits are similar to mixins — reusable sets of methods that can be included in multiple classes. PHP and Scala use traits explicitly.", example: "Real-life example: PHP Trait Timestampable adding created_at and updated_at tracking to any model class." }
  ]
},
{
  icon: <FaTools />,
  title: "Refactoring OOP Code",
  questions: [
    { q: "What is refactoring?", a: "Refactoring is improving the internal structure of code without changing its external behavior — making it cleaner, more readable, and maintainable.", example: "Real-life example: Extracting a repeated validation block into a private method called validateInput()." },
    { q: "What are common OOP refactoring techniques?", a: "Extract Class (split large class), Extract Method (split long method), Replace Conditional with Polymorphism, Move Method, and Rename for clarity.", example: "Real-life example: A 500-line God Class split into UserService, UserRepository, and UserValidator." },
    { q: "How does refactoring relate to SOLID principles?", a: "Refactoring is often the process of moving code towards SOLID compliance — reducing violations of SRP, OCP, and other principles over time.", example: "Real-life example: Breaking a class that both saves data AND sends emails into two classes following SRP." }
  ]
},
{
  icon: <FaMemory />,
  title: "Object Serialization",
  questions: [
    { q: "What is object serialization?", a: "Serialization converts an object's state into a format (like JSON or binary) that can be stored or transmitted, and deserialization restores it.", example: "Real-life example: Saving a user session object to a database or sending it over a REST API as JSON." },
    { q: "Why is serialization important in OOP?", a: "It enables objects to persist beyond program execution, be transmitted over networks, and be reconstructed on the receiving end.", example: "Real-life example: A shopping cart object serialized to JSON stored in localStorage or sent to a backend." },
    { q: "What are common serialization formats?", a: "JSON (human-readable, widely used in web), XML (verbose, legacy systems), Protocol Buffers (fast, compact, used by Google), and Java's native binary serialization.", example: "Real-life example: REST APIs use JSON. gRPC uses Protocol Buffers for high-performance communication." }
  ]
},
{
  icon: <FaShieldAlt />,
  title: "Object-Oriented Testing",
  questions: [
    { q: "What is unit testing in OOP?", a: "Unit testing verifies that individual methods and classes work correctly in isolation. Each test focuses on one behavior of one class.", example: "Real-life example: Testing that calculateTax() returns the correct value for different salary inputs." },
    { q: "What is mocking in OOP testing?", a: "Mocking replaces real dependencies (like databases or APIs) with fake objects that simulate expected behavior during testing.", example: "Real-life example: Mocking a PaymentGateway in tests so no real charges occur while testing checkout logic." },
    { q: "How does good OOP design improve testability?", a: "Low coupling, dependency injection, and single responsibility make classes easy to test in isolation without needing real infrastructure.", example: "Real-life example: Injecting a mock EmailService into UserService during tests instead of sending real emails." }
  ]
},
{
  icon: <FaNetworkWired />,
  title: "Event-Driven OOP",
  questions: [
    { q: "What is event-driven programming in OOP?", a: "Event-driven OOP uses objects that emit events and other objects that listen and respond to them, decoupling producers from consumers.", example: "Real-life example: A Button object emitting a 'click' event, and a FormHandler object listening to that event." },
    { q: "What is the Observer pattern?", a: "The Observer pattern defines a one-to-many dependency — when one object changes state, all its observers are notified automatically.", example: "Real-life example: A Stock object notifying all registered StockAlertListeners when price changes." },
    { q: "How does event-driven design improve scalability?", a: "It decouples components so they can be developed, deployed, and scaled independently without tight dependencies.", example: "Real-life example: A microservice publishing an 'OrderPlaced' event — InventoryService and EmailService both listen and react independently." }
  ]
},
{
  icon: <FaCubes />,
  title: "Prototype-Based OOP",
  questions: [
    { q: "What is prototype-based OOP?", a: "In prototype-based OOP, objects inherit directly from other objects rather than from classes. JavaScript is the most well-known prototype-based language.", example: "Real-life example: In JavaScript, every object has a prototype chain — Dog.__proto__ points to Animal, inheriting its methods." },
    { q: "How is prototype-based OOP different from class-based OOP?", a: "Class-based OOP uses class blueprints to create objects. Prototype-based OOP clones and extends existing objects directly.", example: "Real-life example: JavaScript ES6 class syntax is syntactic sugar over prototype chains — the underlying mechanism is still prototype-based." },
    { q: "What is the prototype chain?", a: "The prototype chain is the lookup chain followed when accessing a property — if not found on the object, JavaScript looks up its prototype, then prototype's prototype, until null.", example: "Real-life example: dog.toString() — not on dog, look at Dog.prototype, not there, look at Object.prototype — found toString() there." }
  ]
},
{
  icon: <FaExchangeAlt />,
  title: "Covariance and Contravariance",
  questions: [
    { q: "What is covariance in OOP?", a: "Covariance means a method in a subclass can return a more specific type than declared in the parent class (return type narrows down).", example: "Real-life example: Parent returns Animal, child overrides to return Dog — allowed because Dog is an Animal." },
    { q: "What is contravariance?", a: "Contravariance means a method in a subclass can accept a more general parameter type than declared in the parent class (parameter type widens).", example: "Real-life example: Parent method takes Dog parameter, subclass overrides to take Animal — it can handle more types." },
    { q: "Why do covariance and contravariance matter in generics?", a: "They determine whether generic types can be substituted safely. Java uses ? extends T (covariance) and ? super T (contravariance) wildcards.", example: "Real-life example: List<? extends Animal> is covariant — you can read Animals from it. List<? super Dog> is contravariant — you can add Dogs to it." }
  ]
},
];


  const totalPages = Math.ceil(topics.length / topicsPerPage);
  const { markPageComplete, progressPercent } = useCourseProgress("oops", totalPages);
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
        <h1 style={styles.title} className="oops-title">Object Oriented Programming</h1>
        <p style={styles.subtitle} className="oops-subtitle">
          Starter notes for beginners with interview-focused explanations
        </p>
        <p style={{ color: "#4f46e5", fontWeight: 600, fontSize: "0.95rem" }}>
  📖 Your Progress: {progressPercent}%
</p>
      </header>

      <section style={styles.topicsGrid}>
        {paginatedTopics.map((topic, index) => (
          <article key={index} style={styles.card} className="oops-card">
            <div style={styles.cardHeader}>
              <span style={styles.icon} className="oops-icon">{topic.icon}</span>
              <h2 style={styles.cardTitle}>{topic.title}</h2>
            </div>

            {topic.questions.map((item, idx) => (
              <div key={idx} style={styles.qaBlock}>
                <h3 style={styles.question} className="oops-question">Q. {item.q}</h3>
                <p style={styles.answer} className="oops-answer">{item.a}</p>
                <p style={styles.example} className="oops-example">
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
  onClick={() => {
    markPageComplete(currentPage);
    setCurrentPage((p) => p - 1);
  }}
>Prev</button>

{Array.from({ length: totalPages }).map((_, i) => (
  <button
    key={i}
    style={{
      ...styles.pageBtn,
      backgroundColor: currentPage === i + 1 ? "#4f46e5" : "#fff",
      color: currentPage === i + 1 ? "#fff" : "#333"
    }}
    onClick={() => {
      markPageComplete(currentPage);
      setCurrentPage(i + 1);
    }}
  >{i + 1}</button>
))}

<button
  style={styles.pageBtn}
  disabled={currentPage === totalPages}
  onClick={() => {
    markPageComplete(currentPage);
    setCurrentPage((p) => p + 1);
  }}
>Next</button>
      </div>
      <style>{`
  @media (max-width: 480px) {
    .oops-title { font-size: 1.5rem !important; font-weight: 700 !important; }
    .oops-subtitle { font-size: 0.85rem !important; }
    .oops-card { padding: 14px !important; gap: 10px !important; }
    .oops-card-title { font-size: 1.05rem !important; font-weight: 600 !important; }
    .oops-icon { font-size: 1.3rem !important; }
    .oops-question { font-size: 0.88rem !important; font-weight: 600 !important; }
    .oops-answer { font-size: 0.82rem !important; }
    .oops-example { font-size: 0.78rem !important; }
  }
`}</style>
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

export default OopsNotes;