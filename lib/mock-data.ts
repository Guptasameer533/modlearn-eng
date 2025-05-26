// Mock data for the ModLearn platform

export const mockCourses = [
  {
    _id: "course-1",
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course covers everything from basic syntax to building interactive web applications.",
    sections: [
      { _id: "section-1", title: "HTML Basics" },
      { _id: "section-2", title: "CSS Styling" },
      { _id: "section-3", title: "JavaScript Fundamentals" },
    ],
    createdAt: "2023-12-01T00:00:00.000Z",
  },
  {
    _id: "course-2",
    title: "React Development Masterclass",
    description:
      "Master React.js from beginner to advanced level. Build modern, scalable web applications using React hooks, context, and best practices.",
    sections: [
      { _id: "section-4", title: "React Basics" },
      { _id: "section-5", title: "State Management" },
      { _id: "section-6", title: "Advanced Patterns" },
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
  },
  {
    _id: "course-3",
    title: "Database Design and SQL",
    description:
      "Learn database design principles and master SQL queries. Understand relational databases, normalization, and advanced query optimization.",
    sections: [
      { _id: "section-7", title: "Database Fundamentals" },
      { _id: "section-8", title: "SQL Queries" },
      { _id: "section-9", title: "Advanced Topics" },
    ],
    createdAt: "2023-12-10T00:00:00.000Z",
  },
]

export const mockUsers = [
  {
    _id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    _id: "user-2",
    name: "John Doe",
    email: "john@example.com",
    role: "learner",
  },
  {
    _id: "user-3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "learner",
  },
  {
    _id: "user-4",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "learner",
  },
  {
    _id: "user-5",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "learner",
  },
]

export const mockEnrolledCourses = [
  {
    _id: "course-1",
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course covers everything from basic syntax to building interactive web applications.",
    progress: 65,
    lastAccessed: "2023-12-15T10:30:00.000Z",
  },
  {
    _id: "course-2",
    title: "React Development Masterclass",
    description:
      "Master React.js from beginner to advanced level. Build modern, scalable web applications using React hooks, context, and best practices.",
    progress: 30,
    lastAccessed: "2023-12-14T14:20:00.000Z",
  },
]

export const mockAvailableCourses = [
  {
    _id: "course-1",
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course covers everything from basic syntax to building interactive web applications.",
    sections: [
      { _id: "section-1", title: "HTML Basics" },
      { _id: "section-2", title: "CSS Styling" },
      { _id: "section-3", title: "JavaScript Fundamentals" },
    ],
    createdAt: "2023-12-01T00:00:00.000Z",
    enrolled: true,
  },
  {
    _id: "course-2",
    title: "React Development Masterclass",
    description:
      "Master React.js from beginner to advanced level. Build modern, scalable web applications using React hooks, context, and best practices.",
    sections: [
      { _id: "section-4", title: "React Basics" },
      { _id: "section-5", title: "State Management" },
      { _id: "section-6", title: "Advanced Patterns" },
    ],
    createdAt: "2023-12-05T00:00:00.000Z",
    enrolled: true,
  },
  {
    _id: "course-3",
    title: "Database Design and SQL",
    description:
      "Learn database design principles and master SQL queries. Understand relational databases, normalization, and advanced query optimization.",
    sections: [
      { _id: "section-7", title: "Database Fundamentals" },
      { _id: "section-8", title: "SQL Queries" },
      { _id: "section-9", title: "Advanced Topics" },
    ],
    createdAt: "2023-12-10T00:00:00.000Z",
    enrolled: false,
  },
  {
    _id: "course-4",
    title: "Python Programming Bootcamp",
    description:
      "Complete Python programming course from basics to advanced topics. Learn data structures, algorithms, and build real-world projects.",
    sections: [
      { _id: "section-10", title: "Python Basics" },
      { _id: "section-11", title: "Data Structures" },
      { _id: "section-12", title: "Advanced Python" },
    ],
    createdAt: "2023-12-12T00:00:00.000Z",
    enrolled: false,
  },
]

export const mockCourseDetails = [
  {
    _id: "course-1",
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course covers everything from basic syntax to building interactive web applications.",
    createdAt: "2023-12-01T00:00:00.000Z",
    sections: [
      {
        _id: "section-1",
        title: "HTML Basics",
        description: "Learn the fundamentals of HTML markup language",
        units: [
          {
            _id: "unit-1",
            title: "Getting Started with HTML",
            description: "Introduction to HTML structure and basic tags",
            chapters: [
              {
                _id: "chapter-1",
                title: "What is HTML?",
                description: "Understanding HTML and its role in web development",
                content:
                  "<h1>What is HTML?</h1><p>HTML (HyperText Markup Language) is the standard markup language for creating web pages...</p>",
                questions: [
                  {
                    _id: "question-1",
                    type: "mcq",
                    text: "What does HTML stand for?",
                    options: [
                      { text: "HyperText Markup Language", isCorrect: true },
                      { text: "High Tech Modern Language", isCorrect: false },
                      { text: "Home Tool Markup Language", isCorrect: false },
                    ],
                  },
                ],
              },
              {
                _id: "chapter-2",
                title: "HTML Document Structure",
                description: "Learn about the basic structure of an HTML document",
                content: "<h1>HTML Document Structure</h1><p>Every HTML document has a basic structure...</p>",
                questions: [
                  {
                    _id: "question-2",
                    type: "fillInBlank",
                    text: "The root element of an HTML document is ____",
                    correctAnswer: "html",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        _id: "section-2",
        title: "CSS Styling",
        description: "Learn how to style web pages with CSS",
        units: [
          {
            _id: "unit-2",
            title: "CSS Fundamentals",
            description: "Basic CSS concepts and syntax",
            chapters: [
              {
                _id: "chapter-3",
                title: "Introduction to CSS",
                description: "What is CSS and how it works",
                content:
                  "<h1>Introduction to CSS</h1><p>CSS (Cascading Style Sheets) is used to style HTML elements...</p>",
                questions: [
                  {
                    _id: "question-3",
                    type: "mcq",
                    text: "What does CSS stand for?",
                    options: [
                      { text: "Cascading Style Sheets", isCorrect: true },
                      { text: "Computer Style Sheets", isCorrect: false },
                      { text: "Creative Style Sheets", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: "course-2",
    title: "React Development Masterclass",
    description:
      "Master React.js from beginner to advanced level. Build modern, scalable web applications using React hooks, context, and best practices.",
    createdAt: "2023-12-05T00:00:00.000Z",
    sections: [
      {
        _id: "section-4",
        title: "React Basics",
        description: "Learn the fundamentals of React",
        units: [
          {
            _id: "unit-3",
            title: "Getting Started with React",
            description: "Introduction to React and JSX",
            chapters: [
              {
                _id: "chapter-4",
                title: "What is React?",
                description: "Understanding React and its benefits",
                content: "<h1>What is React?</h1><p>React is a JavaScript library for building user interfaces...</p>",
                questions: [
                  {
                    _id: "question-4",
                    type: "mcq",
                    text: "React is a ____",
                    options: [
                      { text: "JavaScript library", isCorrect: true },
                      { text: "Programming language", isCorrect: false },
                      { text: "Database", isCorrect: false },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export const mockChapterDetails = [
  {
    _id: "chapter-1",
    title: "What is HTML?",
    description: "Understanding HTML and its role in web development",
    content: `
      <h1>What is HTML?</h1>
      <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
      
      <h2>Key Features of HTML</h2>
      <ul>
        <li>Markup language for creating web pages</li>
        <li>Uses tags to define elements</li>
        <li>Platform independent</li>
        <li>Easy to learn and use</li>
      </ul>
      
      <h2>Basic HTML Structure</h2>
      <p>Every HTML document follows a basic structure:</p>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;This is a Heading&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
    `,
    questions: [
      {
        _id: "question-1",
        type: "mcq",
        text: "What does HTML stand for?",
        options: [
          { text: "HyperText Markup Language", isCorrect: true },
          { text: "High Tech Modern Language", isCorrect: false },
          { text: "Home Tool Markup Language", isCorrect: false },
          { text: "Hyperlink and Text Markup Language", isCorrect: false },
        ],
      },
      {
        _id: "question-2",
        type: "fillInBlank",
        text: "The DOCTYPE declaration for HTML5 is ____",
        correctAnswer: "<!DOCTYPE html>",
      },
      {
        _id: "question-3",
        type: "text",
        text: "Explain the purpose of the <head> element in an HTML document.",
        correctAnswer: "The head element contains metadata about the document",
      },
    ],
  },
  {
    _id: "chapter-2",
    title: "HTML Document Structure",
    description: "Learn about the basic structure of an HTML document",
    content: `
      <h1>HTML Document Structure</h1>
      <p>Every HTML document has a basic structure that includes several key elements. Understanding this structure is fundamental to creating well-formed HTML documents.</p>
      
      <h2>Document Type Declaration</h2>
      <p>The DOCTYPE declaration tells the browser which version of HTML the page is written in:</p>
      <pre><code>&lt;!DOCTYPE html&gt;</code></pre>
      
      <h2>HTML Element</h2>
      <p>The &lt;html&gt; element is the root element of an HTML page and contains all other elements.</p>
      
      <h2>Head Section</h2>
      <p>The &lt;head&gt; element contains metadata about the document, including:</p>
      <ul>
        <li>Title of the document</li>
        <li>Links to stylesheets</li>
        <li>Meta information</li>
        <li>Scripts</li>
      </ul>
      
      <h2>Body Section</h2>
      <p>The &lt;body&gt; element contains the visible content of the web page.</p>
    `,
    questions: [
      {
        _id: "question-4",
        type: "mcq",
        text: "Which element is the root element of an HTML document?",
        options: [
          { text: "<html>", isCorrect: true },
          { text: "<body>", isCorrect: false },
          { text: "<head>", isCorrect: false },
          { text: "<document>", isCorrect: false },
        ],
      },
      {
        _id: "question-5",
        type: "fillInBlank",
        text: "The visible content of a web page is contained within the ____ element.",
        correctAnswer: "body",
      },
    ],
  },
  {
    _id: "chapter-3",
    title: "Introduction to CSS",
    description: "What is CSS and how it works",
    content: `
      <h1>Introduction to CSS</h1>
      <p>CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.</p>
      
      <h2>Why Use CSS?</h2>
      <ul>
        <li>Separation of content and presentation</li>
        <li>Improved accessibility</li>
        <li>Reduced complexity and repetition</li>
        <li>Better control over layout</li>
      </ul>
      
      <h2>CSS Syntax</h2>
      <p>CSS rules consist of a selector and a declaration block:</p>
      <pre><code>selector {
  property: value;
  property: value;
}</code></pre>
      
      <h2>Example</h2>
      <pre><code>h1 {
  color: blue;
  font-size: 24px;
}</code></pre>
    `,
    questions: [
      {
        _id: "question-6",
        type: "mcq",
        text: "What does CSS stand for?",
        options: [
          { text: "Cascading Style Sheets", isCorrect: true },
          { text: "Computer Style Sheets", isCorrect: false },
          { text: "Creative Style Sheets", isCorrect: false },
          { text: "Colorful Style Sheets", isCorrect: false },
        ],
      },
      {
        _id: "question-7",
        type: "text",
        text: "What is the main purpose of CSS?",
        correctAnswer: "To style and layout web pages",
      },
    ],
  },
  {
    _id: "chapter-4",
    title: "What is React?",
    description: "Understanding React and its benefits",
    content: `
      <h1>What is React?</h1>
      <p>React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Facebook and the community.</p>
      
      <h2>Key Features of React</h2>
      <ul>
        <li>Component-based architecture</li>
        <li>Virtual DOM for better performance</li>
        <li>Unidirectional data flow</li>
        <li>JSX syntax</li>
        <li>Large ecosystem and community</li>
      </ul>
      
      <h2>Why Choose React?</h2>
      <p>React offers several advantages:</p>
      <ul>
        <li>Reusable components</li>
        <li>Easy to learn and use</li>
        <li>Strong community support</li>
        <li>Excellent developer tools</li>
        <li>SEO-friendly with server-side rendering</li>
      </ul>
      
      <h2>Simple React Component</h2>
      <pre><code>function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}</code></pre>
    `,
    questions: [
      {
        _id: "question-8",
        type: "mcq",
        text: "React is a ____",
        options: [
          { text: "JavaScript library", isCorrect: true },
          { text: "Programming language", isCorrect: false },
          { text: "Database", isCorrect: false },
          { text: "Web server", isCorrect: false },
        ],
      },
      {
        _id: "question-9",
        type: "fillInBlank",
        text: "React was developed by ____",
        correctAnswer: "Facebook",
      },
    ],
  },
]

export const mockUserProgress = [
  {
    courseId: "course-1",
    completedChapters: ["chapter-1", "chapter-2"],
    lastAccessedSection: "section-2",
    lastAccessedUnit: "unit-2",
    lastAccessedChapter: "chapter-3",
  },
  {
    courseId: "course-2",
    completedChapters: ["chapter-4"],
    lastAccessedSection: "section-4",
    lastAccessedUnit: "unit-3",
    lastAccessedChapter: "chapter-4",
  },
]
