import {
  FaProjectDiagram,
  FaListUl,
  FaLayerGroup,
  FaMicrophone,
  FaBriefcase,
  FaUserTie,
  FaEnvelopeOpenText,
  FaPeopleArrows,
  FaRandom,
  FaParagraph,
  FaBalanceScale,
  FaLink,
  FaExclamationTriangle,
  FaQuoteRight
} from "react-icons/fa";
import {  
  FaClock,
  FaLanguage,
  FaAlignLeft,
  FaSpellCheck,
  FaComments,
  FaUserCheck,
  FaKeyboard,
  FaEarListen,
  FaHandshake
} from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const EnglishNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);


  const topics = [
  {
    icon: <FaLanguage />,
    title: "Parts of Speech",
    questions: [
      {
        q: "What are parts of speech in English grammar?",
        a: "Parts of speech are categories that explain how a word functions in a sentence. They form the foundation of English grammar and help in constructing correct and meaningful sentences.",
        example:
          "Real-life example: In 'She quickly finished her work', 'She' is a pronoun, 'quickly' is an adverb, 'finished' is a verb."
      },
      {
        q: "Why are parts of speech important in communication?",
        a: "Understanding parts of speech helps avoid grammatical errors, improves sentence clarity, and boosts confidence in speaking and writing.",
        example:
          "Real-life example: Correct verb usage in interviews creates a professional impression."
      },
      {
        q: "Name the main parts of speech.",
        a: "Noun, pronoun, verb, adjective, adverb, preposition, conjunction, and interjection.",
        example:
          "Real-life example: Using adjectives to describe skills in a resume."
      }
    ]
  },

  {
    icon: <FaClock />,
    title: "Tenses",
    questions: [
      {
        q: "What are tenses and why are they important?",
        a: "Tenses indicate the time of an action. Correct tense usage ensures clarity and avoids misunderstanding in communication.",
        example:
          "Real-life example: 'I completed the task' vs 'I complete the task yesterday'."
      },
      {
        q: "How many tenses are there in English?",
        a: "There are three main tenses—past, present, and future—each having four forms: simple, continuous, perfect, and perfect continuous.",
        example:
          "Real-life example: 'I am working' vs 'I have worked'."
      },
      {
        q: "Why do interviewers focus on tense accuracy?",
        a: "Incorrect tense usage reflects poor communication skills and can confuse timelines of work or achievements.",
        example:
          "Real-life example: Explaining past project experience accurately."
      }
    ]
  },

  {
    icon: <FaAlignLeft />,
    title: "Sentence Structure",
    questions: [
      {
        q: "What is sentence structure?",
        a: "Sentence structure refers to the order of words to form clear and meaningful sentences, usually following Subject + Verb + Object.",
        example:
          "Real-life example: 'She writes code daily.'"
      },
      {
        q: "Why is sentence structure important?",
        a: "Good sentence structure improves readability, clarity, and confidence in communication.",
        example:
          "Real-life example: Clear answers during HR interviews."
      },
      {
        q: "What are common sentence structure mistakes?",
        a: "Incorrect word order, missing verbs, and run-on sentences.",
        example:
          "Real-life example: Poorly framed answers in interviews."
      }
    ]
  },

  {
    icon: <FaSpellCheck />,
    title: "Articles (A, An, The)",
    questions: [
      {
        q: "What are articles?",
        a: "Articles are words used before nouns to specify whether they are general or specific.",
        example:
          "Real-life example: 'a job' vs 'the job'."
      },
      {
        q: "When do we use 'a' and 'an'?",
        a: "'A' is used before consonant sounds, and 'an' is used before vowel sounds.",
        example:
          "Real-life example: 'an interview', 'a company'."
      },
      {
        q: "Why is article usage important in professional English?",
        a: "Incorrect article usage makes sentences sound unnatural or grammatically wrong.",
        example:
          "Real-life example: Resume summaries."
      }
    ]
  },

  {
    icon: <FaExchangeAlt />,
    title: "Active and Passive Voice",
    questions: [
      {
        q: "What is active and passive voice?",
        a: "In active voice, the subject performs the action. In passive voice, the subject receives the action.",
        example:
          "Real-life example: 'The team completed the project.'"
      },
      {
        q: "Which voice is preferred in professional communication?",
        a: "Active voice is preferred because it is direct, clear, and engaging.",
        example:
          "Real-life example: Project descriptions in resumes."
      },
      {
        q: "When is passive voice useful?",
        a: "When the doer is unknown or unimportant.",
        example:
          "Real-life example: 'The issue was resolved.'"
      }
    ]
  },

  {
    icon: <FaComments />,
    title: "Communication Skills",
    questions: [
      {
        q: "What are communication skills?",
        a: "Communication skills involve effectively sharing ideas through speaking, writing, listening, and body language.",
        example:
          "Real-life example: Explaining a project clearly in an interview."
      },
      {
        q: "Why are communication skills important for freshers?",
        a: "Good communication helps freshers express ideas clearly and work effectively in teams.",
        example:
          "Real-life example: Collaborating in group discussions."
      },
      {
        q: "What are the types of communication?",
        a: "Verbal, non-verbal, written, and visual communication.",
        example:
          "Real-life example: Email, meetings, presentations."
      }
    ]
  },

  {
    icon: <FaUserCheck />,
    title: "Verbal Communication",
    questions: [
      {
        q: "What is verbal communication?",
        a: "Verbal communication uses spoken words to convey messages clearly and confidently.",
        example:
          "Real-life example: Answering HR questions."
      },
      {
        q: "What makes verbal communication effective?",
        a: "Clarity, tone, pronunciation, and confidence.",
        example:
          "Real-life example: Client meetings."
      },
      {
        q: "How can freshers improve verbal skills?",
        a: "Practice speaking, mock interviews, and active listening.",
        example:
          "Real-life example: College presentations."
      }
    ]
  },

  {
    icon: <FaKeyboard />,
    title: "Written Communication",
    questions: [
      {
        q: "Why is written communication important?",
        a: "It is used in emails, resumes, reports, and documentation, reflecting professionalism.",
        example:
          "Real-life example: Writing emails to HR."
      },
      {
        q: "What are common written communication mistakes?",
        a: "Grammar errors, unclear structure, and informal tone.",
        example:
          "Real-life example: Poorly written resumes."
      },
      {
        q: "How to improve written communication?",
        a: "Practice writing, proofread content, and learn grammar basics.",
        example:
          "Real-life example: Improving cover letters."
      }
    ]
  },

  {
    icon: <FaEarListen />,
    title: "Listening Skills",
    questions: [
      {
        q: "Why are listening skills important?",
        a: "Listening ensures better understanding and accurate responses.",
        example:
          "Real-life example: Understanding project requirements."
      },
      {
        q: "What are active listening skills?",
        a: "Paying full attention, asking questions, and giving feedback.",
        example:
          "Real-life example: Team discussions."
      },
      {
        q: "How does listening impact teamwork?",
        a: "Good listening reduces mistakes and improves collaboration.",
        example:
          "Real-life example: Agile standup meetings."
      }
    ]
  },

  {
    icon: <FaHandshake />,
    title: "Professional Etiquette",
    questions: [
      {
        q: "What is professional etiquette?",
        a: "It refers to expected workplace behavior such as respect, punctuality, and communication style.",
        example:
          "Real-life example: Proper email tone."
      },
      {
        q: "Why is professional etiquette important?",
        a: "It helps build trust, respect, and career growth.",
        example:
          "Real-life example: First impression in office."
      },
      {
        q: "What are examples of good workplace etiquette?",
        a: "Being punctual, respectful, and responsive.",
        example:
          "Real-life example: Attending meetings on time."
      }
    ]
  },{
  icon: <FaMicrophone />,
  title: "Group Discussion Skills",
  questions: [
    {
      q: "What is a group discussion?",
      a: "A group discussion is a structured conversation where multiple participants share ideas on a given topic to assess communication skills, clarity of thought, teamwork, and leadership.",
      example:
        "Real-life example: Placement GD rounds in IT companies to shortlist candidates."
    },
    {
      q: "What are recruiters looking for in a group discussion?",
      a: "Recruiters evaluate clarity, confidence, listening ability, logical thinking, and respectful interaction rather than dominance.",
      example:
        "Real-life example: Allowing others to speak and building on their points."
    },
    {
      q: "How can freshers perform well in GD rounds?",
      a: "By understanding the topic, speaking with structure, listening actively, and staying calm.",
      example:
        "Real-life example: Starting with a brief definition and adding one strong point."
    }
  ]
},

{
  icon: <FaBriefcase />,
  title: "Interview Communication",
  questions: [
    {
      q: "Why is communication important in interviews?",
      a: "Clear communication helps interviewers understand your skills, experience, and attitude effectively.",
      example:
        "Real-life example: Explaining a final-year project in simple terms."
    },
    {
      q: "How should freshers answer interview questions?",
      a: "Freshers should answer clearly, honestly, and with relevant examples without memorizing answers.",
      example:
        "Real-life example: Describing internship tasks confidently."
    },
    {
      q: "What are common communication mistakes in interviews?",
      a: "Speaking too fast, giving unclear answers, and avoiding eye contact.",
      example:
        "Real-life example: Rambling instead of giving structured answers."
    }
  ]
},

{
  icon: <FaUserTie />,
  title: "Body Language",
  questions: [
    {
      q: "What is body language in communication?",
      a: "Body language includes posture, gestures, facial expressions, and eye contact that support verbal communication.",
      example:
        "Real-life example: Maintaining eye contact during an interview."
    },
    {
      q: "Why is body language important in interviews?",
      a: "Positive body language builds confidence, trust, and professionalism.",
      example:
        "Real-life example: Sitting upright shows attentiveness."
    },
    {
      q: "What are common negative body language signs?",
      a: "Avoiding eye contact, slouching, crossing arms excessively.",
      example:
        "Real-life example: Appearing nervous during HR rounds."
    }
  ]
},

{
  icon: <FaEnvelopeOpenText />,
  title: "Email Writing Skills",
  questions: [
    {
      q: "Why is email writing important in professional life?",
      a: "Emails are the primary mode of formal communication in workplaces.",
      example:
        "Real-life example: Sending project updates to managers."
    },
    {
      q: "What are key elements of a professional email?",
      a: "Clear subject, polite greeting, concise body, and professional closing.",
      example:
        "Real-life example: Requesting leave through email."
    },
    {
      q: "What common mistakes should be avoided in emails?",
      a: "Informal language, grammar mistakes, and missing subject lines.",
      example:
        "Real-life example: Using slang in office emails."
    }
  ]
},

{
  icon: <FaPeopleArrows />,
  title: "Team Communication",
  questions: [
    {
      q: "What is team communication?",
      a: "Team communication refers to sharing information clearly and effectively among team members.",
      example:
        "Real-life example: Daily standup meetings in IT teams."
    },
    {
      q: "Why is effective team communication important?",
      a: "It improves collaboration, reduces misunderstandings, and increases productivity.",
      example:
        "Real-life example: Clear task allocation in projects."
    },
    {
      q: "How can freshers improve team communication?",
      a: "By listening actively, asking questions, and giving timely updates.",
      example:
        "Real-life example: Clarifying tasks with seniors."
    }
  ]
},{
  icon: <FaQuoteRight />,
  title: "Direct and Indirect Speech",
  questions: [
    {
      q: "What is direct and indirect speech?",
      a: "Direct speech reports the exact words spoken by a person, while indirect speech reports the meaning without quoting the exact words.",
      example:
        "Real-life example: He said, 'I am ready' (direct) vs He said that he was ready (indirect)."
    },
    {
      q: "Why is indirect speech commonly used in professional communication?",
      a: "Indirect speech sounds more formal and is widely used in reports, emails, and discussions.",
      example:
        "Real-life example: Reporting meeting outcomes to a manager."
    }
  ]
},

{
  icon: <FaExclamationTriangle />,
  title: "Common Grammar Mistakes",
  questions: [
    {
      q: "What are common grammar mistakes made by freshers?",
      a: "Common mistakes include subject-verb disagreement, wrong tense usage, incorrect articles, and preposition errors.",
      example:
        "Real-life example: Saying 'He have completed' instead of 'He has completed'."
    },
    {
      q: "Why should grammar mistakes be avoided in interviews?",
      a: "Grammar mistakes reduce clarity and create a negative impression, even if the content is correct.",
      example:
        "Real-life example: Incorrect grammar in self-introduction."
    }
  ]
},

{
  icon: <FaLink />,
  title: "Prepositions",
  questions: [
    {
      q: "What are prepositions?",
      a: "Prepositions show the relationship between a noun or pronoun and another word in the sentence.",
      example:
        "Real-life example: 'The laptop is on the table.'"
    },
    {
      q: "Why are prepositions confusing for learners?",
      a: "Because their usage often depends on context rather than fixed rules.",
      example:
        "Real-life example: 'Interested in' vs 'Interested on'."
    }
  ]
},

{
  icon: <FaBalanceScale />,
  title: "Subject–Verb Agreement",
  questions: [
    {
      q: "What is subject–verb agreement?",
      a: "It means the verb must agree with the subject in number and person.",
      example:
        "Real-life example: 'She works hard' vs 'They work hard'."
    },
    {
      q: "Why is subject–verb agreement important?",
      a: "Incorrect agreement makes sentences grammatically wrong and unprofessional.",
      example:
        "Real-life example: Errors while explaining experience in interviews."
    }
  ]
},

{
  icon: <FaParagraph />,
  title: "Punctuation",
  questions: [
    {
      q: "Why is punctuation important in English?",
      a: "Punctuation clarifies meaning and improves readability of sentences.",
      example:
        "Real-life example: 'Let’s eat, grandma' vs 'Let’s eat grandma'."
    },
    {
      q: "What are commonly misused punctuation marks?",
      a: "Comma, apostrophe, and full stop are commonly misused.",
      example:
        "Real-life example: Using apostrophe incorrectly in plurals."
    }
  ]
},

{
  icon: <FaRandom />,
  title: "Sentence Types",
  questions: [
    {
      q: "What are the types of sentences?",
      a: "Declarative, interrogative, imperative, and exclamatory sentences.",
      example:
        "Real-life example: Asking interview questions (interrogative)."
    },
    {
      q: "Why should sentence variety be used?",
      a: "Using different sentence types makes communication more engaging and clear.",
      example:
        "Real-life example: Professional presentations."
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
        <h1 style={styles.title}>English</h1>
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

export default EnglishNotes;