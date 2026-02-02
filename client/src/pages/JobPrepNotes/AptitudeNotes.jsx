import React, { useState, useEffect } from "react";
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
  FaBug,
  FaCalculator,
  FaPercentage,
  FaBalanceScale,
  FaRunning,
  FaChartLine,
  FaDice,
  FaCoins,
  FaWater,
  FaChartPie,
  FaTable,
  FaTrain,
  FaRoad,
  FaPercent,
  FaBoxes,
  FaRandom,
  FaDivide,
  FaSortNumericUp,
  FaBalanceScaleRight,
  FaChessBoard,
  FaChartBar
} from "react-icons/fa";

const AptitudeNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

const topics = [
  {
    icon: <FaCalculator />,
    title: "Number System",
    questions: [
      {
        q: "What is the number system and how is it classified?",
        a: "The number system classifies numbers into natural, whole, integers, rational, and irrational numbers. This helps in choosing the correct method to solve arithmetic problems.",
        example:
          "Real-life example: Temperatures like -5°C, 0°C, and 30°C are integers."
      },
      {
        q: "What are prime, composite, and co-prime numbers?",
        a: "Prime numbers have exactly two factors, composite numbers have more than two factors, and co-prime numbers have only 1 as a common factor.",
        example:
          "Real-life example: Prime numbers are used in encryption."
      },
      {
        q: "What are HCF and LCM?",
        a: "HCF is the highest common factor, and LCM is the least common multiple of given numbers.",
        example:
          "Real-life example: Scheduling common meeting times."
      }
    ]
  },

  {
    icon: <FaPercentage />,
    title: "Percentages",
    questions: [
      {
        q: "What is a percentage?",
        a: "A percentage represents a number as a part of 100.",
        example:
          "Real-life example: 80% marks in an exam."
      },
      {
        q: "How is percentage increase or decrease calculated?",
        a: "(Change / Original value) × 100",
        example:
          "Real-life example: Price rise from ₹100 to ₹120 is 20%."
      },
      {
        q: "Why are percentages important in aptitude?",
        a: "They form the base for profit & loss, interest, and data interpretation.",
        example:
          "Real-life example: Calculating shopping discounts."
      }
    ]
  },

  {
    icon: <FaBalanceScale />,
    title: "Profit and Loss",
    questions: [
      {
        q: "What is profit and loss?",
        a: "Profit occurs when selling price is more than cost price, and loss occurs when it is less.",
        example:
          "Real-life example: Buying for ₹800 and selling for ₹1000."
      },
      {
        q: "What is marked price and discount?",
        a: "Marked price is the listed price, discount is the reduction given.",
        example:
          "Real-life example: 30% off on a ₹2000 product."
      },
      {
        q: "Why are these questions important?",
        a: "They test business sense and calculation speed.",
        example:
          "Real-life example: Retail pricing."
      }
    ]
  },

  {
    icon: <FaClock />,
    title: "Time and Work",
    questions: [
      {
        q: "What is the basic concept of time and work?",
        a: "Work depends on efficiency and time taken.",
        example:
          "Real-life example: Two people working together."
      },
      {
        q: "How does efficiency affect work?",
        a: "More efficiency means less time.",
        example:
          "Real-life example: Skilled worker finishes faster."
      },
      {
        q: "Why is this topic important?",
        a: "It tests logical reasoning and ratios.",
        example:
          "Real-life example: Project planning."
      }
    ]
  },

  {
    icon: <FaRunning />,
    title: "Time, Speed, and Distance",
    questions: [
      {
        q: "What is the basic formula?",
        a: "Speed = Distance ÷ Time",
        example:
          "Real-life example: Driving speed."
      },
      {
        q: "What is average speed?",
        a: "Total distance ÷ total time.",
        example:
          "Real-life example: Daily travel."
      },
      {
        q: "Why is this topic asked in exams?",
        a: "It checks formula application skills.",
        example:
          "Real-life example: Delivery routing."
      }
    ]
  },

  {
    icon: <FaChartLine />,
    title: "Ratio and Proportion",
    questions: [
      {
        q: "What is ratio?",
        a: "Comparison of two quantities of the same kind.",
        example:
          "Real-life example: Ingredients in cooking."
      },
      {
        q: "What is proportion?",
        a: "Equality of two ratios.",
        example:
          "Real-life example: Workforce scaling."
      },
      {
        q: "Where is it used?",
        a: "Mixtures, time & work, partnerships.",
        example:
          "Real-life example: Business profit sharing."
      }
    ]
  },

  {
    icon: <FaDice />,
    title: "Probability (Basics)",
    questions: [
      {
        q: "What is probability?",
        a: "Measure of likelihood of an event.",
        example:
          "Real-life example: Tossing a coin."
      },
      {
        q: "How is probability calculated?",
        a: "Favorable outcomes ÷ total outcomes.",
        example:
          "Real-life example: Dice roll."
      },
      {
        q: "Why is probability important?",
        a: "It tests analytical thinking.",
        example:
          "Real-life example: Risk analysis."
      }
    ]
  },

  {
    icon: <FaCoins />,
    title: "Simple and Compound Interest",
    questions: [
      {
        q: "What is simple interest?",
        a: "Interest calculated only on principal.",
        example:
          "Real-life example: Short-term loans."
      },
      {
        q: "What is compound interest?",
        a: "Interest on principal plus accumulated interest.",
        example:
          "Real-life example: Bank deposits."
      },
      {
        q: "Which grows faster and why?",
        a: "Compound interest because interest compounds.",
        example:
          "Real-life example: Long-term investments."
      }
    ]
  },

  {
    icon: <FaWater />,
    title: "Mixtures and Alligations",
    questions: [
      {
        q: "What are mixture problems?",
        a: "Problems involving combination of items in ratios.",
        example:
          "Real-life example: Milk and water."
      },
      {
        q: "What is alligation?",
        a: "Shortcut method to find mixing ratio.",
        example:
          "Real-life example: Rice price mixing."
      },
      {
        q: "Why are these asked?",
        a: "They test ratio and percentage together.",
        example:
          "Real-life example: Business pricing."
      }
    ]
  },

  {
    icon: <FaChartPie />,
    title: "Data Interpretation (Basics)",
    questions: [
      {
        q: "What is data interpretation?",
        a: "Analyzing data from charts and tables.",
        example:
          "Real-life example: Sales analysis."
      },
      {
        q: "What types of graphs are used?",
        a: "Bar, pie, line, table.",
        example:
          "Real-life example: Population data."
      },
      {
        q: "Why is DI important?",
        a: "It tests speed and accuracy.",
        example:
          "Real-life example: Company reports."
      }
    ]
  },

  {
    icon: <FaExchangeAlt />,
    title: "Averages",
    questions: [
      {
        q: "What is average?",
        a: "Sum of values ÷ number of values.",
        example:
          "Real-life example: Average marks."
      },
      {
        q: "What is weighted average?",
        a: "Average considering importance of values.",
        example:
          "Real-life example: GPA calculation."
      },
      {
        q: "When does average increase?",
        a: "When new value > current average.",
        example:
          "Real-life example: Adding topper."
      }
    ]
  },

  {
    icon: <FaCalculator />,
    title: "Problems on Ages",
    questions: [
      {
        q: "What are age problems?",
        a: "Problems involving present, past, and future ages.",
        example:
          "Real-life example: Father–son age."
      },
      {
        q: "Why are age problems important?",
        a: "They test equation formulation.",
        example:
          "Real-life example: Timeline logic."
      },
      {
        q: "Common solving technique?",
        a: "Assume present age as variable x.",
        example:
          "Real-life example: Competitive exam shortcuts."
      }
    ]
  },

  {
    icon: <FaTable />,
    title: "Simplification and Approximation",
    questions: [
      {
        q: "What is simplification?",
        a: "Solving expressions using BODMAS.",
        example:
          "Real-life example: Mental maths."
      },
      {
        q: "What is approximation?",
        a: "Estimating near values.",
        example:
          "Real-life example: Rounding prices."
      },
      {
        q: "Why are these important?",
        a: "Improve speed and accuracy.",
        example:
          "Real-life example: Time-based tests."
      }
    ]
  },

  {
    icon: <FaTrain />,
    title: "Problems on Trains",
    questions: [
      {
        q: "What are train problems?",
        a: "Problems involving relative speed and time.",
        example:
          "Real-life example: Crossing a platform."
      },
      {
        q: "Why is train length important?",
        a: "Distance includes full train length.",
        example:
          "Real-life example: Pole vs platform."
      },
      {
        q: "Common mistake?",
        a: "Wrong speed addition/subtraction.",
        example:
          "Real-life example: Opposite direction confusion."
      }
    ]
  },

  {
    icon: <FaRoad />,
    title: "Boats and Streams",
    questions: [
      {
        q: "What is downstream?",
        a: "Movement with stream flow.",
        example:
          "Real-life example: Boat with river."
      },
      {
        q: "What is upstream?",
        a: "Movement against stream flow.",
        example:
          "Real-life example: Boat against river."
      },
      {
        q: "Key formula?",
        a: "Stream speed = (D − U)/2",
        example:
          "Real-life example: River current."
      }
    ]
  },

  {
    icon: <FaPercent />,
    title: "Partnership",
    questions: [
      {
        q: "What is partnership?",
        a: "Sharing profit based on capital & time.",
        example:
          "Real-life example: Business partners."
      },
      {
        q: "How is profit shared?",
        a: "Capital × Time ratio.",
        example:
          "Real-life example: Early investor benefit."
      },
      {
        q: "Why are these asked?",
        a: "They mix ratio and logic.",
        example:
          "Real-life example: Startup equity."
      }
    ]
  },

  {
    icon: <FaBoxes />,
    title: "Pipes and Cisterns",
    questions: [
      {
        q: "What are pipes problems?",
        a: "Tank filling and emptying questions.",
        example:
          "Real-life example: Water tanks."
      },
      {
        q: "How are outlet pipes treated?",
        a: "As negative work.",
        example:
          "Real-life example: Leaking tank."
      },
      {
        q: "Common trick?",
        a: "Assume total work as LCM.",
        example:
          "Real-life example: Faster solving."
      }
    ]
  },

  {
    icon: <FaRandom />,
    title: "Permutations and Combinations (Basics)",
    questions: [
      {
        q: "What is permutation?",
        a: "Arrangement where order matters.",
        example:
          "Real-life example: Seating people."
      },
      {
        q: "What is combination?",
        a: "Selection where order doesn't matter.",
        example:
          "Real-life example: Choosing team."
      },
      {
        q: "Why are these important?",
        a: "Used in probability.",
        example:
          "Real-life example: Exam problems."
      }
    ]
  },

  {
    icon: <FaDivide />,
    title: "Logarithms (Basics)",
    questions: [
      {
        q: "What is logarithm?",
        a: "Inverse of exponentiation.",
        example:
          "Real-life example: Scientific maths."
      },
      {
        q: "Common log base?",
        a: "Base 10.",
        example:
          "Real-life example: Log tables."
      },
      {
        q: "Why are logs asked?",
        a: "They test math fundamentals.",
        example:
          "Real-life example: Engineering exams."
      }
    ]
  },{
  icon: <FaCalculator />,
  title: "Quadratic Equations",
  questions: [
    {
      q: "What is a quadratic equation?",
      a: "A quadratic equation is an equation of degree 2, generally written as ax² + bx + c = 0, where a ≠ 0.",
      example:
        "Real-life example: Calculating projectile motion paths in physics."
    },
    {
      q: "What are the methods to solve quadratic equations?",
      a: "Common methods include factorization, completing the square, and using the quadratic formula.",
      example:
        "Real-life example: Finding break-even points in business."
    },
    {
      q: "What does the discriminant tell us?",
      a: "The discriminant (b² − 4ac) determines the nature of roots: real and distinct, real and equal, or complex.",
      example:
        "Real-life example: Determining if a solution exists for a given constraint."
    }
  ]
},

{
  icon: <FaCalculator />,
  title: "Surds and Indices",
  questions: [
    {
      q: "What are surds?",
      a: "Surds are irrational roots that cannot be simplified into rational numbers.",
      example:
        "Real-life example: √2 appearing in diagonal calculations."
    },
    {
      q: "What are indices (exponents)?",
      a: "Indices represent repeated multiplication of a number by itself.",
      example:
        "Real-life example: Powers of 10 in scientific notation."
    },
    {
      q: "Why are surds and indices important in aptitude?",
      a: "They test understanding of algebraic manipulation and simplification.",
      example:
        "Real-life example: Engineering entrance problem solving."
    }
  ]
},

{
  icon: <FaChartLine />,
  title: "Mensuration (2D and 3D)",
  questions: [
    {
      q: "What is mensuration?",
      a: "Mensuration deals with measuring geometric figures like area, perimeter, volume, and surface area.",
      example:
        "Real-life example: Calculating carpet area for a room."
    },
    {
      q: "Which shapes are commonly asked in aptitude?",
      a: "Circle, rectangle, triangle, cylinder, cone, and sphere.",
      example:
        "Real-life example: Water tank capacity calculation."
    },
    {
      q: "Why is mensuration important in exams?",
      a: "It tests formula memory and application skills.",
      example:
        "Real-life example: Construction planning."
    }
  ]
},

{
  icon: <FaPercent />,
  title: "Set Theory and Venn Diagrams",
  questions: [
    {
      q: "What is set theory?",
      a: "Set theory deals with collections of objects and their relationships.",
      example:
        "Real-life example: Students enrolled in different courses."
    },
    {
      q: "What is a Venn diagram?",
      a: "A Venn diagram visually represents relationships between sets using overlapping circles.",
      example:
        "Real-life example: Students studying Maths and Science."
    },
    {
      q: "Why are Venn diagrams used in aptitude?",
      a: "They simplify complex data relationships and improve logical clarity.",
      example:
        "Real-life example: Survey data analysis."
    }
  ]
},

{
  icon: <FaDice />,
  title: "Number Series",
  questions: [
    {
      q: "What is a number series?",
      a: "A number series is a sequence of numbers following a specific pattern.",
      example:
        "Real-life example: Monthly savings increasing steadily."
    },
    {
      q: "What are common types of number series?",
      a: "Arithmetic, geometric, alternating, and mixed series.",
      example:
        "Real-life example: Salary increments over years."
    },
    {
      q: "Why are number series questions common in aptitude?",
      a: "They test pattern recognition and logical thinking.",
      example:
        "Real-life example: Predicting trends from past data."
    }
  ]
},{
  icon: <FaSortNumericUp />,
  title: "Number Series (Advanced)",
  questions: [
    {
      q: "What are missing number problems?",
      a: "Missing number problems require identifying the pattern in a sequence to find the absent value.",
      example:
        "Real-life example: Predicting next salary increment based on previous years."
    },
    {
      q: "What are common patterns in number series?",
      a: "Addition, subtraction, multiplication, division, squares, cubes, and mixed patterns.",
      example:
        "Real-life example: Growth patterns in business sales."
    },
    {
      q: "Why are number series important in aptitude?",
      a: "They test observation skills and logical reasoning speed.",
      example:
        "Real-life example: Pattern recognition tasks."
    }
  ]
},

{
  icon: <FaProjectDiagram />,
  title: "Linear Equations",
  questions: [
    {
      q: "What is a linear equation?",
      a: "A linear equation is an equation of degree one involving one or more variables.",
      example:
        "Real-life example: Budget calculations."
    },
    {
      q: "How are linear equations solved in aptitude?",
      a: "By forming equations based on given conditions and solving systematically.",
      example:
        "Real-life example: Price comparison problems."
    },
    {
      q: "Why are linear equations commonly asked?",
      a: "They test equation formation and logical interpretation.",
      example:
        "Real-life example: Cost and quantity estimation."
    }
  ]
},

{
  icon: <FaBalanceScaleRight />,
  title: "Inequalities",
  questions: [
    {
      q: "What are inequalities?",
      a: "Inequalities compare two values showing greater than, less than, or equal to relationships.",
      example:
        "Real-life example: Comparing salaries."
    },
    {
      q: "How are inequalities solved?",
      a: "By simplifying expressions and finding the range of values.",
      example:
        "Real-life example: Minimum qualification criteria."
    },
    {
      q: "Why are inequality questions important?",
      a: "They test decision-making and comparison skills.",
      example:
        "Real-life example: Eligibility checks."
    }
  ]
},

{
  icon: <FaChessBoard />,
  title: "Logical Arrangement",
  questions: [
    {
      q: "What is logical arrangement?",
      a: "Logical arrangement problems involve arranging people or objects based on given conditions.",
      example:
        "Real-life example: Seating arrangements in meetings."
    },
    {
      q: "What types of arrangements are common?",
      a: "Linear, circular, and matrix arrangements.",
      example:
        "Real-life example: Office desk planning."
    },
    {
      q: "Why are these questions asked in aptitude?",
      a: "They test logical reasoning, patience, and accuracy.",
      example:
        "Real-life example: Planning schedules."
    }
  ]
},

{
  icon: <FaRandom />,
  title: "Data Sufficiency",
  questions: [
    {
      q: "What is data sufficiency?",
      a: "Data sufficiency problems test whether given data is enough to answer a question.",
      example:
        "Real-life example: Deciding if information is sufficient to make a decision."
    },
    {
      q: "Why is data sufficiency important in exams?",
      a: "It tests analytical thinking rather than calculation.",
      example:
        "Real-life example: Managerial decision-making."
    },
    {
      q: "What is a common mistake in data sufficiency?",
      a: "Solving the entire problem instead of checking data adequacy.",
      example:
        "Real-life example: Over-analyzing requirements."
    }
  ]
},

{
  icon: <FaChartBar />,
  title: "Caselet-Based Data Interpretation",
  questions: [
    {
      q: "What are caselet-based DI questions?",
      a: "These questions present data in paragraph form instead of charts.",
      example:
        "Real-life example: Business reports in text format."
    },
    {
      q: "What skills are required for caselets?",
      a: "Strong reading comprehension and calculation skills.",
      example:
        "Real-life example: Financial analysis."
    },
    {
      q: "Why are caselets considered difficult?",
      a: "Because data is hidden within text and requires careful extraction.",
      example:
        "Real-life example: Policy documents."
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
        <h1 style={styles.title}>Technical Aptitude</h1>
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

export default AptitudeNotes;