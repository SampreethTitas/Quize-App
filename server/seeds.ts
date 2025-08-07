import dotenv from "dotenv";
dotenv.config();

import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { quizSubjects, quizQuestions } from "@shared/schema";
import { fileURLToPath } from 'url';
import path from 'path';

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { quizSubjects, quizQuestions } });

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data to reseed with comprehensive data
    await db.delete(quizQuestions);
    await db.delete(quizSubjects);
    console.log(
      "✅ Cleared existing data, reseeding with comprehensive data..."
    );

    // Seed subjects
    const subjects = [
      {
        name: "JavaScript",
        description:
          "Core concepts, ES6+, async programming, and modern JavaScript features",
        emoji: "⚡",
        color: "#6366f1",
      },
      {
        name: "React",
        description: "Components, hooks, state management, and React ecosystem",
        emoji: "⚛️",
        color: "#22c55e",
      },
      {
        name: "Node.js",
        description:
          "Server-side JavaScript, APIs, databases, and backend development",
        emoji: "🚀",
        color: "#3b82f6",
      },
      {
        name: "Algorithms",
        description:
          "Data structures, sorting, searching, and algorithm complexity",
        emoji: "🧠",
        color: "#8b5cf6",
      },
      {
        name: "System Design",
        description:
          "Scalability, architecture patterns, and distributed systems",
        emoji: "🏗️",
        color: "#f59e0b",
      },
      {
        name: "Databases",
        description: "SQL, NoSQL, database design, and optimization techniques",
        emoji: "🗄️",
        color: "#6366f1",
      },
    ];

    const insertedSubjects = await db
      .insert(quizSubjects)
      .values(subjects)
      .returning();
    console.log("✅ Subjects seeded:", insertedSubjects.length);

    // Seed JavaScript questions (10 questions)
    const jsSubjectId = insertedSubjects.find(
      (s) => s.name === "JavaScript"
    )?.id;
    if (jsSubjectId) {
      const jsQuestions = [
        {
          subjectId: jsSubjectId,
          question: "What is the difference between let and var in JavaScript?",
          options: [
            "let has block scope, var has function scope",
            "var has block scope, let has function scope",
            "There is no difference between let and var",
            "let is deprecated in favor of var",
          ],
          correctAnswer: 0,
          explanation:
            "let has block scope while var has function scope. This is one of the key differences introduced in ES6.",
          difficulty: "easy",
        },
        {
          subjectId: jsSubjectId,
          question: "What does the 'this' keyword refer to in JavaScript?",
          options: [
            "The current function",
            "The global object",
            "It depends on the context",
            "The parent object",
          ],
          correctAnswer: 2,
          explanation:
            "The 'this' keyword's value depends on how the function is called and in what context it's executed.",
          difficulty: "medium",
        },
        {
          subjectId: jsSubjectId,
          question:
            "Which of the following is NOT a primitive data type in JavaScript?",
          options: ["string", "number", "object", "boolean"],
          correctAnswer: 2,
          explanation:
            "object is not a primitive data type. The primitive types are: string, number, boolean, undefined, null, symbol, and bigint.",
          difficulty: "easy",
        },
        {
          subjectId: jsSubjectId,
          question: "What is a closure in JavaScript?",
          options: [
            "A function that has access to variables in its outer scope",
            "A way to close a function",
            "A method to end a loop",
            "A type of object",
          ],
          correctAnswer: 0,
          explanation:
            "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
          difficulty: "medium",
        },
        {
          subjectId: jsSubjectId,
          question: "What does the async/await syntax do in JavaScript?",
          options: [
            "Makes code run faster",
            "Handles asynchronous operations more readably",
            "Creates multiple threads",
            "Prevents errors",
          ],
          correctAnswer: 1,
          explanation:
            "async/await provides a more readable way to handle asynchronous operations compared to traditional promise chains.",
          difficulty: "medium",
        },
        {
          subjectId: jsSubjectId,
          question: "What is the difference between == and === in JavaScript?",
          options: [
            "No difference",
            "== compares values, === compares types",
            "== compares values and types, === compares only values",
            "== checks type coercion, === checks strict equality",
          ],
          correctAnswer: 3,
          explanation:
            "== allows type coercion while === checks for strict equality without type conversion.",
          difficulty: "easy",
        },
        {
          subjectId: jsSubjectId,
          question: "What is hoisting in JavaScript?",
          options: [
            "Moving code to the top",
            "Variable and function declarations are moved to the top of their scope",
            "A way to optimize code",
            "A debugging technique",
          ],
          correctAnswer: 1,
          explanation:
            "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their containing scope during compilation.",
          difficulty: "medium",
        },
        {
          subjectId: jsSubjectId,
          question: "What is the purpose of the 'use strict' directive?",
          options: [
            "Makes code run faster",
            "Enables strict mode for safer JavaScript",
            "Prevents errors from occurring",
            "Allows new ES6 features",
          ],
          correctAnswer: 1,
          explanation:
            "'use strict' enables strict mode which catches common mistakes and prevents the use of certain problematic features.",
          difficulty: "medium",
        },
        {
          subjectId: jsSubjectId,
          question: "What is the difference between null and undefined?",
          options: [
            "No difference",
            "null is an object, undefined is a type",
            "null is assigned, undefined is default",
            "null is falsy, undefined is truthy",
          ],
          correctAnswer: 2,
          explanation:
            "null is explicitly assigned to indicate 'no value', while undefined is the default value for uninitialized variables.",
          difficulty: "easy",
        },
        {
          subjectId: jsSubjectId,
          question: "What is event delegation in JavaScript?",
          options: [
            "Passing events between functions",
            "Using a parent element to handle events for child elements",
            "Creating custom events",
            "Preventing event bubbling",
          ],
          correctAnswer: 1,
          explanation:
            "Event delegation uses event bubbling to handle events at a parent level rather than attaching handlers to each child element.",
          difficulty: "hard",
        },
      ];

      await db.insert(quizQuestions).values(jsQuestions);
      console.log("✅ JavaScript questions seeded:", jsQuestions.length);
    }

    // Seed React questions (10 questions)
    const reactSubjectId = insertedSubjects.find((s) => s.name === "React")?.id;
    if (reactSubjectId) {
      const reactQuestions = [
        {
          subjectId: reactSubjectId,
          question: "What is the purpose of useState hook in React?",
          options: [
            "To manage component state",
            "To handle side effects",
            "To optimize performance",
            "To create components",
          ],
          correctAnswer: 0,
          explanation:
            "useState is a React Hook that allows you to add state to functional components.",
          difficulty: "easy",
        },
        {
          subjectId: reactSubjectId,
          question: "What is the virtual DOM in React?",
          options: [
            "A copy of the real DOM kept in memory",
            "A new type of DOM",
            "A faster DOM implementation",
            "A DOM manipulation library",
          ],
          correctAnswer: 0,
          explanation:
            "The virtual DOM is a JavaScript representation of the real DOM kept in memory and synced with the real DOM.",
          difficulty: "medium",
        },
        {
          subjectId: reactSubjectId,
          question: "When should you use useEffect hook?",
          options: [
            "For managing state",
            "For handling side effects",
            "For creating components",
            "For styling components",
          ],
          correctAnswer: 1,
          explanation:
            "useEffect is used for performing side effects in functional components like data fetching, subscriptions, or manual DOM changes.",
          difficulty: "medium",
        },
        {
          subjectId: reactSubjectId,
          question: "What is JSX in React?",
          options: [
            "A new programming language",
            "JavaScript XML syntax extension",
            "A testing framework",
            "A state management library",
          ],
          correctAnswer: 1,
          explanation:
            "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
          difficulty: "easy",
        },
        {
          subjectId: reactSubjectId,
          question: "What is the difference between props and state?",
          options: [
            "No difference",
            "Props are mutable, state is immutable",
            "Props are passed from parent, state is internal",
            "Props are for styling, state is for data",
          ],
          correctAnswer: 2,
          explanation:
            "Props are passed from parent components and are immutable, while state is internal to a component and can be changed.",
          difficulty: "easy",
        },
        {
          subjectId: reactSubjectId,
          question: "What is the purpose of keys in React lists?",
          options: [
            "For styling",
            "For identification and efficient re-rendering",
            "For sorting",
            "For filtering",
          ],
          correctAnswer: 1,
          explanation:
            "Keys help React identify which items have changed, been added, or removed, enabling efficient re-rendering of lists.",
          difficulty: "medium",
        },
        {
          subjectId: reactSubjectId,
          question: "What is a React component lifecycle?",
          options: [
            "The time a component takes to load",
            "Stages a component goes through from creation to destruction",
            "The rendering process",
            "The state update process",
          ],
          correctAnswer: 1,
          explanation:
            "Component lifecycle refers to the series of stages a component goes through: mounting, updating, and unmounting.",
          difficulty: "medium",
        },
        {
          subjectId: reactSubjectId,
          question: "What is the purpose of useContext hook?",
          options: [
            "To manage local state",
            "To consume context values",
            "To handle side effects",
            "To optimize performance",
          ],
          correctAnswer: 1,
          explanation:
            "useContext allows you to consume values from a React context without nesting Consumer components.",
          difficulty: "medium",
        },
        {
          subjectId: reactSubjectId,
          question: "What is React.memo used for?",
          options: [
            "Memory management",
            "Performance optimization by preventing unnecessary re-renders",
            "State management",
            "Error handling",
          ],
          correctAnswer: 1,
          explanation:
            "React.memo is a higher-order component that optimizes performance by preventing re-renders when props haven't changed.",
          difficulty: "hard",
        },
        {
          subjectId: reactSubjectId,
          question:
            "What is the difference between controlled and uncontrolled components?",
          options: [
            "Controlled components use state, uncontrolled use refs",
            "No difference",
            "Controlled are faster",
            "Uncontrolled are deprecated",
          ],
          correctAnswer: 0,
          explanation:
            "Controlled components have their value controlled by React state, while uncontrolled components store their own state internally and use refs.",
          difficulty: "hard",
        },
      ];

      await db.insert(quizQuestions).values(reactQuestions);
      console.log("✅ React questions seeded:", reactQuestions.length);
    }

    // Seed Node.js questions (10 questions)
    const nodeSubjectId = insertedSubjects.find(
      (s) => s.name === "Node.js"
    )?.id;
    if (nodeSubjectId) {
      const nodeQuestions = [
        {
          subjectId: nodeSubjectId,
          question: "What is the event loop in Node.js?",
          options: [
            "A loop that handles events",
            "The main thread execution mechanism",
            "A way to handle asynchronous operations",
            "All of the above",
          ],
          correctAnswer: 3,
          explanation:
            "The event loop is the core mechanism that allows Node.js to handle asynchronous operations efficiently.",
          difficulty: "medium",
        },
        {
          subjectId: nodeSubjectId,
          question: "Which module is used to create HTTP servers in Node.js?",
          options: ["fs", "http", "path", "url"],
          correctAnswer: 1,
          explanation:
            "The http module provides utilities to create HTTP servers and clients.",
          difficulty: "easy",
        },
        {
          subjectId: nodeSubjectId,
          question: "What does npm stand for?",
          options: [
            "Node Package Manager",
            "Node Project Manager",
            "New Package Manager",
            "Network Package Manager",
          ],
          correctAnswer: 0,
          explanation:
            "npm stands for Node Package Manager, used for installing and managing packages.",
          difficulty: "easy",
        },
        {
          subjectId: nodeSubjectId,
          question: "How do you handle errors in Node.js callbacks?",
          options: [
            "Try-catch blocks",
            "Error-first callbacks",
            "Promise rejection",
            "All of the above",
          ],
          correctAnswer: 1,
          explanation:
            "Node.js uses error-first callbacks where the first parameter is reserved for errors.",
          difficulty: "medium",
        },
        {
          subjectId: nodeSubjectId,
          question: "What is middleware in Express.js?",
          options: [
            "A database layer",
            "Functions that execute during request-response cycle",
            "A routing system",
            "A templating engine",
          ],
          correctAnswer: 1,
          explanation:
            "Middleware functions are functions that execute during the request-response cycle and have access to req, res, and next objects.",
          difficulty: "medium",
        },
        {
          subjectId: nodeSubjectId,
          question: "What is the purpose of package.json file?",
          options: [
            "To store JavaScript code",
            "To define project dependencies and metadata",
            "To configure the server",
            "To store database credentials",
          ],
          correctAnswer: 1,
          explanation:
            "package.json contains metadata about the project and defines dependencies, scripts, and other project information.",
          difficulty: "easy",
        },
        {
          subjectId: nodeSubjectId,
          question: "What is the difference between require() and import?",
          options: [
            "No difference",
            "require() is CommonJS, import is ES6 modules",
            "require() is faster",
            "import is deprecated",
          ],
          correctAnswer: 1,
          explanation:
            "require() is used in CommonJS module system while import is used in ES6 modules system.",
          difficulty: "medium",
        },
        {
          subjectId: nodeSubjectId,
          question: "What is clustering in Node.js?",
          options: [
            "Database clustering",
            "Running multiple Node.js processes to handle load",
            "Code organization",
            "Memory management",
          ],
          correctAnswer: 1,
          explanation:
            "Clustering allows you to create multiple Node.js processes to take advantage of multi-core systems.",
          difficulty: "hard",
        },
        {
          subjectId: nodeSubjectId,
          question: "What is the purpose of the fs module?",
          options: [
            "For creating servers",
            "For file system operations",
            "For networking",
            "For database operations",
          ],
          correctAnswer: 1,
          explanation:
            "The fs module provides APIs for interacting with the file system (reading, writing, creating files and directories).",
          difficulty: "easy",
        },
        {
          subjectId: nodeSubjectId,
          question: "What is a stream in Node.js?",
          options: [
            "A data structure",
            "A way to handle flowing data",
            "A database connection",
            "A network protocol",
          ],
          correctAnswer: 1,
          explanation:
            "Streams are objects that let you read data from a source or write data to a destination in a continuous manner.",
          difficulty: "hard",
        },
      ];

      await db.insert(quizQuestions).values(nodeQuestions);
      console.log("✅ Node.js questions seeded:", nodeQuestions.length);
    }

    // Seed Algorithms questions (10 questions)
    const algoSubjectId = insertedSubjects.find(
      (s) => s.name === "Algorithms"
    )?.id;
    if (algoSubjectId) {
      const algoQuestions = [
        {
          subjectId: algoSubjectId,
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
          correctAnswer: 1,
          explanation:
            "Binary search divides the search space in half each time, resulting in O(log n) complexity.",
          difficulty: "medium",
        },
        {
          subjectId: algoSubjectId,
          question:
            "Which sorting algorithm has the best average time complexity?",
          options: [
            "Bubble Sort",
            "Quick Sort",
            "Merge Sort",
            "Selection Sort",
          ],
          correctAnswer: 2,
          explanation:
            "Merge Sort has a consistent O(n log n) time complexity in all cases.",
          difficulty: "medium",
        },
        {
          subjectId: algoSubjectId,
          question: "What data structure uses LIFO (Last In, First Out)?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correctAnswer: 1,
          explanation:
            "Stack follows the LIFO principle where the last element added is the first to be removed.",
          difficulty: "easy",
        },
        {
          subjectId: algoSubjectId,
          question: "What is the space complexity of merge sort?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correctAnswer: 2,
          explanation:
            "Merge sort requires O(n) additional space for the temporary arrays during merging.",
          difficulty: "hard",
        },
        {
          subjectId: algoSubjectId,
          question: "What data structure uses FIFO (First In, First Out)?",
          options: ["Stack", "Queue", "Tree", "Graph"],
          correctAnswer: 1,
          explanation:
            "Queue follows the FIFO principle where the first element added is the first to be removed.",
          difficulty: "easy",
        },
        {
          subjectId: algoSubjectId,
          question: "What is the worst-case time complexity of quicksort?",
          options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
          correctAnswer: 1,
          explanation:
            "Quicksort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element.",
          difficulty: "medium",
        },
        {
          subjectId: algoSubjectId,
          question: "What is a hash table?",
          options: [
            "A sorted array",
            "A data structure that maps keys to values",
            "A tree structure",
            "A linked list",
          ],
          correctAnswer: 1,
          explanation:
            "A hash table is a data structure that uses a hash function to map keys to values for efficient lookup.",
          difficulty: "easy",
        },
        {
          subjectId: algoSubjectId,
          question:
            "What is the time complexity of accessing an element in a hash table?",
          options: ["O(n)", "O(log n)", "O(1) average", "O(n log n)"],
          correctAnswer: 2,
          explanation:
            "Hash tables provide O(1) average time complexity for access, insertion, and deletion operations.",
          difficulty: "medium",
        },
        {
          subjectId: algoSubjectId,
          question: "What is dynamic programming?",
          options: [
            "A programming language",
            "A technique that solves problems by breaking them into overlapping subproblems",
            "A sorting algorithm",
            "A data structure",
          ],
          correctAnswer: 1,
          explanation:
            "Dynamic programming is an optimization technique that solves problems by breaking them into overlapping subproblems and storing their solutions.",
          difficulty: "hard",
        },
        {
          subjectId: algoSubjectId,
          question: "What is the difference between BFS and DFS?",
          options: [
            "No difference",
            "BFS explores breadth-first, DFS explores depth-first",
            "BFS is faster",
            "DFS uses more memory",
          ],
          correctAnswer: 1,
          explanation:
            "BFS (Breadth-First Search) explores nodes level by level, while DFS (Depth-First Search) explores as far as possible along each branch.",
          difficulty: "medium",
        },
      ];

      await db.insert(quizQuestions).values(algoQuestions);
      console.log("✅ Algorithms questions seeded:", algoQuestions.length);
    }

    // Seed System Design questions (10 questions)
    const systemSubjectId = insertedSubjects.find(
      (s) => s.name === "System Design"
    )?.id;
    if (systemSubjectId) {
      const systemQuestions = [
        {
          subjectId: systemSubjectId,
          question: "What is horizontal scaling?",
          options: [
            "Adding more power to existing servers",
            "Adding more servers to handle load",
            "Increasing memory capacity",
            "Upgrading CPU",
          ],
          correctAnswer: 1,
          explanation:
            "Horizontal scaling means adding more servers to distribute the load across multiple machines.",
          difficulty: "medium",
        },
        {
          subjectId: systemSubjectId,
          question: "What is a load balancer?",
          options: [
            "A server that stores data",
            "A system that distributes traffic",
            "A database optimization tool",
            "A caching mechanism",
          ],
          correctAnswer: 1,
          explanation:
            "A load balancer distributes incoming network traffic across multiple servers.",
          difficulty: "easy",
        },
        {
          subjectId: systemSubjectId,
          question: "What is the CAP theorem?",
          options: [
            "Consistency, Availability, Performance",
            "Consistency, Availability, Partition tolerance",
            "Capacity, Availability, Performance",
            "Consistency, Accuracy, Partition tolerance",
          ],
          correctAnswer: 1,
          explanation:
            "CAP theorem states that a distributed system can provide only two of: Consistency, Availability, and Partition tolerance.",
          difficulty: "hard",
        },
        {
          subjectId: systemSubjectId,
          question: "What is caching?",
          options: [
            "Storing data permanently",
            "Storing frequently accessed data in fast storage",
            "Deleting old data",
            "Compressing data",
          ],
          correctAnswer: 1,
          explanation:
            "Caching is the practice of storing frequently accessed data in fast storage to reduce access times.",
          difficulty: "easy",
        },
        {
          subjectId: systemSubjectId,
          question: "What is vertical scaling?",
          options: [
            "Adding more servers",
            "Adding more power to existing servers",
            "Distributing load",
            "Creating backups",
          ],
          correctAnswer: 1,
          explanation:
            "Vertical scaling means adding more power (CPU, RAM) to existing servers rather than adding more servers.",
          difficulty: "easy",
        },
        {
          subjectId: systemSubjectId,
          question: "What is database sharding?",
          options: [
            "Creating database backups",
            "Partitioning data across multiple databases",
            "Optimizing queries",
            "Indexing tables",
          ],
          correctAnswer: 1,
          explanation:
            "Database sharding is the practice of splitting large databases into smaller, more manageable parts across multiple servers.",
          difficulty: "hard",
        },
        {
          subjectId: systemSubjectId,
          question: "What is a CDN (Content Delivery Network)?",
          options: [
            "A database system",
            "A distributed network of servers that deliver content",
            "A programming framework",
            "A security system",
          ],
          correctAnswer: 1,
          explanation:
            "A CDN is a geographically distributed network of servers that deliver content to users from the nearest location.",
          difficulty: "medium",
        },
        {
          subjectId: systemSubjectId,
          question: "What is microservices architecture?",
          options: [
            "A single large application",
            "Small, independent services working together",
            "A database design pattern",
            "A programming language",
          ],
          correctAnswer: 1,
          explanation:
            "Microservices architecture breaks down applications into small, independent services that communicate over APIs.",
          difficulty: "medium",
        },
        {
          subjectId: systemSubjectId,
          question: "What is eventual consistency?",
          options: [
            "Data is always consistent",
            "Data becomes consistent over time",
            "Data is never consistent",
            "Data consistency is not important",
          ],
          correctAnswer: 1,
          explanation:
            "Eventual consistency means that the system will become consistent over time, even if it's not immediately consistent.",
          difficulty: "hard",
        },
        {
          subjectId: systemSubjectId,
          question: "What is a message queue?",
          options: [
            "A database table",
            "A system for asynchronous communication between services",
            "A web server",
            "A caching mechanism",
          ],
          correctAnswer: 1,
          explanation:
            "A message queue is a system that enables asynchronous communication between different parts of a system.",
          difficulty: "medium",
        },
      ];

      await db.insert(quizQuestions).values(systemQuestions);
      console.log("✅ System Design questions seeded:", systemQuestions.length);
    }

    // Seed Database questions (10 questions)
    const dbSubjectId = insertedSubjects.find(
      (s) => s.name === "Databases"
    )?.id;
    if (dbSubjectId) {
      const dbQuestions = [
        {
          subjectId: dbSubjectId,
          question: "What does SQL stand for?",
          options: [
            "Structured Query Language",
            "Simple Query Language",
            "Sequential Query Language",
            "Standard Query Language",
          ],
          correctAnswer: 0,
          explanation:
            "SQL stands for Structured Query Language, used for managing relational databases.",
          difficulty: "easy",
        },
        {
          subjectId: dbSubjectId,
          question: "What is a primary key?",
          options: [
            "A key that opens databases",
            "A unique identifier for records",
            "The most important field",
            "A password for database access",
          ],
          correctAnswer: 1,
          explanation:
            "A primary key is a unique identifier that ensures each record can be uniquely identified.",
          difficulty: "easy",
        },
        {
          subjectId: dbSubjectId,
          question: "What is database normalization?",
          options: [
            "Making databases faster",
            "Organizing data to reduce redundancy",
            "Creating backups",
            "Encrypting data",
          ],
          correctAnswer: 1,
          explanation:
            "Database normalization is the process of organizing data to minimize redundancy and dependency.",
          difficulty: "medium",
        },
        {
          subjectId: dbSubjectId,
          question: "What is the difference between SQL and NoSQL?",
          options: [
            "SQL is newer",
            "SQL uses tables, NoSQL uses documents/key-value",
            "No difference",
            "SQL is faster",
          ],
          correctAnswer: 1,
          explanation:
            "SQL databases use structured tables while NoSQL databases use flexible formats like documents or key-value pairs.",
          difficulty: "medium",
        },
        {
          subjectId: dbSubjectId,
          question: "What is a foreign key?",
          options: [
            "A key from another country",
            "A field that links to primary key of another table",
            "A backup key",
            "An encrypted key",
          ],
          correctAnswer: 1,
          explanation:
            "A foreign key is a field that creates a link between two tables by referencing the primary key of another table.",
          difficulty: "easy",
        },
        {
          subjectId: dbSubjectId,
          question: "What is an index in databases?",
          options: [
            "A table of contents",
            "A data structure that improves query performance",
            "A backup system",
            "A security feature",
          ],
          correctAnswer: 1,
          explanation:
            "An index is a data structure that improves the speed of data retrieval operations on a database table.",
          difficulty: "medium",
        },
        {
          subjectId: dbSubjectId,
          question: "What is a transaction in databases?",
          options: [
            "A financial operation",
            "A sequence of database operations treated as a single unit",
            "A backup process",
            "A security check",
          ],
          correctAnswer: 1,
          explanation:
            "A transaction is a sequence of database operations that are treated as a single unit of work.",
          difficulty: "medium",
        },
        {
          subjectId: dbSubjectId,
          question: "What does ACID stand for in databases?",
          options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Access, Control, Integration, Development",
            "Automated, Consistent, Integrated, Distributed",
            "Advanced, Complete, Isolated, Durable",
          ],
          correctAnswer: 0,
          explanation:
            "ACID stands for Atomicity, Consistency, Isolation, and Durability - key properties of database transactions.",
          difficulty: "hard",
        },
        {
          subjectId: dbSubjectId,
          question: "What is a JOIN in SQL?",
          options: [
            "Connecting to database",
            "Combining rows from multiple tables",
            "Creating a new table",
            "Deleting records",
          ],
          correctAnswer: 1,
          explanation:
            "A JOIN is used to combine rows from two or more tables based on a related column between them.",
          difficulty: "medium",
        },
        {
          subjectId: dbSubjectId,
          question: "What is database replication?",
          options: [
            "Creating duplicate databases",
            "Copying data to multiple database servers",
            "Backing up data",
            "Optimizing queries",
          ],
          correctAnswer: 1,
          explanation:
            "Database replication is the process of copying and maintaining database objects in multiple database servers.",
          difficulty: "hard",
        },
      ];

      await db.insert(quizQuestions).values(dbQuestions);
      console.log("✅ Database questions seeded:", dbQuestions.length);
    }

    console.log("🎉 Database seeded successfully with comprehensive data!");
    console.log("📊 Summary:");
    console.log("- Subjects:", insertedSubjects.length);
    console.log("- Total Questions: 60 (10 per subject)");
    console.log("- Difficulty levels: Easy, Medium, Hard");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await pool.end();
  }
}


  seedDatabase()
    .then(() => {
      console.log("✅ Seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });

