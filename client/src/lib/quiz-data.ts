import { QuizSubject, QuizQuestion } from "@/types/quiz";

export const defaultSubjects: QuizSubject[] = [
  {
    id: 1,
    name: "JavaScript",
    description: "Core concepts, ES6+, async programming, and modern JavaScript features",
    emoji: "⚡",
    color: "#6366f1",
    questionCount: 5,
    bestScore: 0,
    createdAt: new Date()
  },
  {
    id: 2,
    name: "React",
    description: "Components, hooks, state management, and React ecosystem",
    emoji: "⚛️",
    color: "#22c55e",
    questionCount: 0,
    bestScore: 0,
    createdAt: new Date()
  },
  {
    id: 3,
    name: "Node.js",
    description: "Server-side JavaScript, APIs, databases, and backend development",
    emoji: "🚀",
    color: "#3b82f6",
    questionCount: 0,
    bestScore: 0,
    createdAt: new Date()
  },
  {
    id: 4,
    name: "Algorithms",
    description: "Data structures, sorting, searching, and algorithm complexity",
    emoji: "🧠",
    color: "#8b5cf6",
    questionCount: 0,
    bestScore: 0,
    createdAt: new Date()
  },
  {
    id: 5,
    name: "System Design",
    description: "Scalability, architecture patterns, and distributed systems",
    emoji: "🏗️",
    color: "#f59e0b",
    questionCount: 0,
    bestScore: 0,
    createdAt: new Date()
  },
  {
    id: 6,
    name: "Databases",
    description: "SQL, NoSQL, database design, and optimization techniques",
    emoji: "🗄️",
    color: "#6366f1",
    questionCount: 0,
    bestScore: 0,
    createdAt: new Date()
  }
];

export const defaultQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the difference between let and var in JavaScript?",
    options: [
      "let has block scope, var has function scope",
      "var has block scope, let has function scope",
      "There is no difference between let and var",
      "let is deprecated in favor of var"
    ],
    difficulty: "easy"
  },
  {
    id: 2,
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      "The current function",
      "The global object",
      "It depends on the context",
      "The parent object"
    ],
    difficulty: "medium"
  },
  {
    id: 3,
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    options: [
      "string",
      "number",
      "object",
      "boolean"
    ],
    difficulty: "easy"
  },
  {
    id: 4,
    question: "What is a closure in JavaScript?",
    options: [
      "A function that has access to variables in its outer scope",
      "A way to close a function",
      "A method to end a loop",
      "A type of object"
    ],
    difficulty: "medium"
  },
  {
    id: 5,
    question: "What does the async/await syntax do in JavaScript?",
    options: [
      "Makes code run faster",
      "Handles asynchronous operations more readably",
      "Creates multiple threads",
      "Prevents errors"
    ],
    difficulty: "medium"
  }
];
