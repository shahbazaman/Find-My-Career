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
import React, { useState, useEffect , useRef} from "react";

const EnglishNotes = () => {
  const topicsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
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
},{
    icon: <FaSpellCheck />,
    title: "Vocabulary Building",
    questions: [
      { q: "Why is vocabulary important in professional life?", a: "A strong vocabulary helps express ideas precisely, improves writing quality, and creates a confident impression in interviews and meetings.", example: "Real-life example: Using 'collaborate' instead of 'work together' in a resume." },
      { q: "How can freshers build vocabulary effectively?", a: "Read newspapers, practice word-a-day habits, use vocabulary apps, and learn words in context rather than isolated lists.", example: "Real-life example: Reading The Hindu editorial daily improves both vocabulary and grammar." },
      { q: "What are synonyms and antonyms and why are they tested?", a: "Synonyms are words with similar meanings; antonyms are opposites. They are tested to assess word knowledge and communication range.", example: "Real-life example: 'Confident' synonyms: assured, self-reliant. Antonym: hesitant." }
    ]
  },
  {
    icon: <FaAlignLeft />,
    title: "Reading Comprehension",
    questions: [
      { q: "What is reading comprehension?", a: "Reading comprehension is the ability to read a passage and understand its meaning, main idea, tone, and implied information.", example: "Real-life example: Answering questions based on a company's policy document." },
      { q: "What strategy helps in comprehension questions?", a: "Read the questions first, then read the passage. Underline keywords and focus on topic sentences of each paragraph.", example: "Real-life example: Competitive exam RC sections like CAT or placement written tests." },
      { q: "What are inference questions?", a: "Inference questions ask what can be concluded from the passage even if it is not stated directly.", example: "Real-life example: 'What does the author imply about remote work in paragraph 2?'" }
    ]
  },
  {
    icon: <FaComments />,
    title: "Presentation Skills",
    questions: [
      { q: "What are presentation skills?", a: "Presentation skills involve organizing and delivering information clearly and confidently to an audience using speech, slides, and body language.", example: "Real-life example: Presenting a project demo during a technical interview." },
      { q: "What is the structure of a good presentation?", a: "Introduction (what you'll cover), body (key points with examples), and conclusion (summary and takeaway).", example: "Real-life example: A 5-minute college project presentation." },
      { q: "How to handle nervousness during presentations?", a: "Practice beforehand, breathe deeply, maintain eye contact, and focus on the message rather than yourself.", example: "Real-life example: Mock presentations before placement drives." }
    ]
  },
  {
    icon: <FaUserTie />,
    title: "Self Introduction",
    questions: [
      { q: "How should a fresher introduce themselves in an interview?", a: "Cover your name, education, key skills, a brief project or achievement, and why you are interested in the role — all in 60–90 seconds.", example: "Real-life example: 'I am Arjun, a Computer Science graduate from XYZ College. I have worked on a web app using React and Node.js and I am keen to join your team as a frontend developer.'" },
      { q: "What mistakes should be avoided in self-introduction?", a: "Reading from memory, repeating resume content word for word, going off-topic, and speaking too fast or too slow.", example: "Real-life example: Saying 'I am hardworking' without any supporting example." },
      { q: "How does a strong self-introduction impact an interview?", a: "A confident and structured introduction sets a positive tone for the entire interview and shows communication ability.", example: "Real-life example: Interviewers form 60% of their impression in the first 2 minutes." }
    ]
  },
  {
    icon: <FaExchangeAlt />,
    title: "Conjunctions and Connectors",
    questions: [
      { q: "What are conjunctions?", a: "Conjunctions are words that join clauses, sentences, or words together. Common types are coordinating (FANBOYS), subordinating, and correlative conjunctions.", example: "Real-life example: 'I applied for the job but did not hear back' — 'but' is a coordinating conjunction." },
      { q: "What are discourse connectors?", a: "Connectors link ideas between sentences logically — addition (furthermore), contrast (however), cause (therefore), and sequence (firstly).", example: "Real-life example: 'The project was delayed. However, we delivered it within budget.'" },
      { q: "Why are connectors important in written communication?", a: "They make writing flow smoothly, show logical relationships, and improve the overall quality of essays and emails.", example: "Real-life example: Using 'Moreover' and 'In addition' in a formal email." }
    ]
  },
  {
    icon: <FaMicrophone />,
    title: "Public Speaking",
    questions: [
      { q: "What is public speaking?", a: "Public speaking is the act of communicating a message to a live audience clearly, confidently, and engagingly.", example: "Real-life example: Speaking at a college seminar or company town hall." },
      { q: "What are the qualities of a good public speaker?", a: "Clarity of message, confident body language, audience awareness, appropriate pace, and good use of pauses.", example: "Real-life example: TED Talk speakers maintaining eye contact and pausing for effect." },
      { q: "How can freshers improve public speaking?", a: "Join debate clubs, practice in front of a mirror, record yourself, and volunteer for presentations.", example: "Real-life example: Taking part in college technical fest events." }
    ]
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: "Formal vs Informal English",
    questions: [
      { q: "What is the difference between formal and informal English?", a: "Formal English uses complete sentences, proper grammar, and professional tone. Informal English uses contractions, slang, and casual expressions.", example: "Real-life example: 'I would like to request a meeting' (formal) vs 'Can we meet?' (informal)." },
      { q: "When should formal English be used?", a: "In emails, reports, interviews, presentations, and any professional or academic setting.", example: "Real-life example: Writing to a company HR manager." },
      { q: "What are common informal phrases that should be avoided professionally?", a: "Phrases like 'gonna', 'wanna', 'u', 'asap' in full form, and filler words like 'like', 'you know', 'basically'.", example: "Real-life example: Avoiding slang in client-facing communication." }
    ]
  },
  {
    icon: <FaBalanceScale />,
    title: "Confusable Words",
    questions: [
      { q: "What are confusable words in English?", a: "Confusable words are pairs that look or sound similar but have different meanings, causing frequent errors.", example: "Real-life example: 'Accept' vs 'Except', 'Affect' vs 'Effect', 'Then' vs 'Than'." },
      { q: "What is the difference between 'its' and 'it's'?", a: "'Its' is a possessive pronoun. 'It's' is a contraction of 'it is' or 'it has'.", example: "Real-life example: 'The company updated its policy.' vs 'It's a great opportunity.'" },
      { q: "Why are confusable words important in competitive exams?", a: "They appear frequently in fill-in-the-blank, error spotting, and sentence correction questions.", example: "Real-life example: 'She has a fewer/less number of options' — correct answer is 'fewer'." }
    ]
  },
  {
    icon: <FaProjectDiagram />,
    title: "Paragraph Writing",
    questions: [
      { q: "What is a paragraph and what is its structure?", a: "A paragraph is a group of sentences about one idea. Structure: Topic sentence → Supporting sentences → Concluding sentence.", example: "Real-life example: Writing a paragraph about your strengths for an HR form." },
      { q: "What makes a good paragraph?", a: "Unity (one main idea), coherence (logical flow), and adequate development (enough detail).", example: "Real-life example: Project description in a resume or cover letter." },
      { q: "How long should a professional paragraph be?", a: "Typically 4–8 sentences. Avoid very long paragraphs in emails and reports as they reduce readability.", example: "Real-life example: Email body paragraphs." }
    ]
  },
  {
    icon: <FaListUl />,
    title: "Idioms and Phrases",
    questions: [
      { q: "What are idioms?", a: "Idioms are fixed expressions whose meaning cannot be understood from the individual words.", example: "Real-life example: 'Hit the ground running' means to start something energetically." },
      { q: "Why are idioms tested in placement exams?", a: "They test understanding of figurative language and exposure to natural English usage.", example: "Real-life example: 'The ball is in your court' — the decision is yours." },
      { q: "What are common professional idioms to know?", a: "'Think outside the box' (be creative), 'On the same page' (mutual understanding), 'Touch base' (make contact), 'Bite the bullet' (endure difficulty).", example: "Real-life example: 'Let's touch base after the meeting' in a work email." }
    ]
  },{
  icon: <FaLayerGroup />,
  title: "Degrees of Comparison",
  questions: [
    { q: "What are degrees of comparison?", a: "Degrees of comparison describe the level of quality — positive (basic), comparative (between two), and superlative (among three or more).", example: "Real-life example: Good → Better → Best. 'This laptop is better than that one.'" },
    { q: "How are comparatives and superlatives formed?", a: "Short adjectives add -er/-est. Long adjectives use more/most.", example: "Real-life example: 'More efficient' not 'efficienter'." },
    { q: "Why are comparison structures important in professional English?", a: "They are used when comparing options, products, or performance in reports, emails, and interviews.", example: "Real-life example: 'React is faster than Angular for this use case.'" }
  ]
},
{
  icon: <FaSpellCheck />,
  title: "Spelling and Word Formation",
  questions: [
    { q: "Why is correct spelling important in professional life?", a: "Spelling errors reduce credibility in emails, resumes, and reports and create a poor impression.", example: "Real-life example: Writing 'recieve' instead of 'receive' in a formal email." },
    { q: "What are prefixes and suffixes?", a: "Prefixes are added before a root word to change meaning. Suffixes are added after a root word to change its grammatical function.", example: "Real-life example: 'un-' + 'happy' = unhappy. 'manage' + '-ment' = management." },
    { q: "How can word formation help in exams?", a: "Knowing roots, prefixes, and suffixes helps guess meanings of unfamiliar words in reading comprehension and vocabulary tests.", example: "Real-life example: 'bio' means life — biology, biography, biodegradable." }
  ]
},
{
  icon: <FaComments />,
  title: "Feedback and Criticism",
  questions: [
    { q: "How should constructive feedback be given professionally?", a: "Use the sandwich method — start with a positive, give the improvement point, end with encouragement.", example: "Real-life example: 'Your code structure is clean. The error handling needs improvement. Overall a good attempt.'" },
    { q: "How should you respond to criticism at work?", a: "Listen calmly, acknowledge the feedback, ask clarifying questions if needed, and thank the person.", example: "Real-life example: 'Thank you for pointing that out. I will make sure to improve it.'" },
    { q: "Why is giving and receiving feedback an important workplace skill?", a: "It promotes growth, improves performance, and maintains healthy team dynamics.", example: "Real-life example: Code reviews and performance appraisals." }
  ]
},
{
  icon: <FaUserCheck />,
  title: "Tone and Register",
  questions: [
    { q: "What is tone in communication?", a: "Tone is the attitude conveyed through word choice, sentence structure, and style — it can be formal, neutral, assertive, or empathetic.", example: "Real-life example: 'Please ensure timely submission' (professional) vs 'Submit it on time!' (harsh)." },
    { q: "What is register in English?", a: "Register is the variety of language used for a specific purpose or social setting — academic, professional, or casual.", example: "Real-life example: Using technical register in a project presentation vs casual register with teammates." },
    { q: "Why does tone matter in emails and interviews?", a: "The wrong tone can make professional communication seem rude, unclear, or unprofessional even when the content is correct.", example: "Real-life example: 'As per my last email' can sound passive-aggressive in workplace context." }
  ]
},
{
  icon: <FaParagraph />,
  title: "Report Writing",
  questions: [
    { q: "What is a professional report?", a: "A report is a structured document presenting findings, analysis, and recommendations on a specific topic.", example: "Real-life example: Bug report, project status report, or internship report." },
    { q: "What is the structure of a formal report?", a: "Title → Introduction → Methodology → Findings → Conclusion → Recommendations.", example: "Real-life example: Project completion report submitted to a manager." },
    { q: "What language is used in report writing?", a: "Formal, objective, and impersonal language. Use passive voice and avoid personal pronouns.", example: "Real-life example: 'The results indicate...' rather than 'I found out that...'" }
  ]
},
{
  icon: <FaBriefcase />,
  title: "Resume Language",
  questions: [
    { q: "What language should be used in a resume?", a: "Use action verbs, quantified achievements, and concise phrases. Avoid personal pronouns and complete sentences.", example: "Real-life example: 'Developed a REST API reducing response time by 40%' instead of 'I made an API.'" },
    { q: "What are strong action verbs for resumes?", a: "Developed, Designed, Implemented, Optimized, Led, Collaborated, Analyzed, Delivered.", example: "Real-life example: 'Led a team of 4 to build a MERN stack application.'" },
    { q: "What are common resume language mistakes?", a: "Using weak verbs like 'helped' or 'did', vague phrases like 'responsible for various tasks', and spelling errors.", example: "Real-life example: 'Assisted in development' → change to 'Developed feature X independently.'" }
  ]
},
{
  icon: <FaHandshake />,
  title: "Negotiation Language",
  questions: [
    { q: "What is negotiation in professional settings?", a: "Negotiation involves reaching a mutually agreeable outcome through structured communication, compromise, and persuasion.", example: "Real-life example: Salary negotiation or deadline extension discussion." },
    { q: "What phrases are used in professional negotiation?", a: "'I understand your position...', 'Could we consider...', 'Would it be possible to...', 'I'd be willing to...'", example: "Real-life example: 'I understand the budget constraints. Could we consider a phased delivery instead?'" },
    { q: "How should freshers approach salary negotiation?", a: "Research market rates, express enthusiasm for the role, and propose a range confidently with justification.", example: "Real-life example: 'Based on my skills and market research, I was expecting a range of ₹5–6 LPA.'" }
  ]
},
{
  icon: <FaEarListen />,
  title: "Telephone and Video Call Etiquette",
  questions: [
    { q: "What is professional telephone etiquette?", a: "Answer promptly, introduce yourself clearly, speak slowly, listen without interrupting, and end politely.", example: "Real-life example: 'Good morning, this is Arjun from the development team. How may I help you?'" },
    { q: "What are tips for professional video calls?", a: "Check lighting, mute when not speaking, maintain eye contact with the camera, use a clean background, and dress professionally.", example: "Real-life example: Online interview or client demo call." },
    { q: "What language phrases are useful during calls?", a: "'Could you please repeat that?', 'I didn't catch that clearly.', 'Let me confirm what we discussed.', 'I'll follow up via email.'", example: "Real-life example: Asking for clarification politely during a standup call." }
  ]
},
{
  icon: <FaRandom />,
  title: "Transition Words and Phrases",
  questions: [
    { q: "What are transition words?", a: "Transition words connect ideas between sentences and paragraphs to create logical flow in writing and speech.", example: "Real-life example: 'However', 'Therefore', 'In addition', 'As a result', 'On the other hand'." },
    { q: "How are transition words categorized?", a: "Addition (furthermore, also), Contrast (however, although), Cause-effect (therefore, consequently), Sequence (firstly, finally).", example: "Real-life example: 'The feature was delivered on time. However, minor bugs were found in testing.'" },
    { q: "Why are transition words important in interviews and writing?", a: "They make answers and writing more structured, logical, and professional — showing organized thinking.", example: "Real-life example: Answering HR questions with 'Firstly... Additionally... Finally...' structure." }
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
        <h1 style={styles.title} className="eng-title">English</h1>
        <p style={styles.subtitle} className="eng-subtitle">
          Starter notes for beginners with interview-focused explanations
        </p>
      </header>

      <section style={styles.topicsGrid}>
        {paginatedTopics.map((topic, index) => (
          <article key={index} style={styles.card} className="eng-card">
            <div style={styles.cardHeader}>
              <span style={styles.icon} className="eng-icon">{topic.icon}</span>
              <h2 style={styles.cardTitle} className="eng-card-title">{topic.title}</h2>
            </div>

            {topic.questions.map((item, idx) => (
              <div key={idx} style={styles.qaBlock}>
                <h3 style={styles.question} className="eng-question">Q. {item.q}</h3>
                <p style={styles.answer} className="eng-answer">{item.a}</p>
                <p style={styles.example} className="eng-example">
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
      <style>{`
  @media (max-width: 480px) {
    .eng-title { font-size: 1.5rem !important; font-weight: 700 !important; }
    .eng-subtitle { font-size: 0.85rem !important; }
    .eng-card { padding: 14px !important; gap: 10px !important; }
    .eng-card-title { font-size: 1.05rem !important; font-weight: 600 !important; }
    .eng-icon { font-size: 1.3rem !important; }
    .eng-question { font-size: 0.88rem !important; font-weight: 600 !important; }
    .eng-answer { font-size: 0.82rem !important; }
    .eng-example { font-size: 0.78rem !important; }
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

export default EnglishNotes;