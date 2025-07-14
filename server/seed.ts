import { db } from "./db";
import { quizSubjects, quizQuestions } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingSubjects = await db.select().from(quizSubjects);
    if (existingSubjects.length > 0) {
      console.log("Database already seeded");
      return;
    }

    // Seed subjects
    const subjects = [
      { name: "JavaScript", description: "Core concepts, ES6+, async programming, and modern JavaScript features", emoji: "⚡", color: "#6366f1" },
      { name: "React", description: "Components, hooks, state management, and React ecosystem", emoji: "⚛️", color: "#22c55e" },
      { name: "Node.js", description: "Server-side JavaScript, APIs, databases, and backend development", emoji: "🚀", color: "#3b82f6" },
      { name: "Algorithms", description: "Data structures, sorting, searching, and algorithm complexity", emoji: "🧠", color: "#8b5cf6" },
      { name: "System Design", description: "Scalability, architecture patterns, and distributed systems", emoji: "🏗️", color: "#f59e0b" },
      { name: "Databases", description: "SQL, NoSQL, database design, and optimization techniques", emoji: "🗄️", color: "#6366f1" },
    ];

    const insertedSubjects = await db.insert(quizSubjects).values(subjects).returning();
    console.log("Subjects seeded:", insertedSubjects.length);

    // Seed JavaScript questions
    const jsSubjectId = insertedSubjects.find(s => s.name === "JavaScript")?.id;
    if (jsSubjectId) {
      const jsQuestions = [
        {
          subjectId: jsSubjectId,
          question: "What is the difference between let and var in JavaScript?",
          options: ["let has block scope, var has function scope", "var has block scope, let has function scope", "There is no difference between let and var", "let is deprecated in favor of var"],
          correctAnswer: 0,
          explanation: "let has block scope while var has function scope. This is one of the key differences introduced in ES6.",
          difficulty: "easy"
        },
        {
          subjectId: jsSubjectId,
          question: "What does the 'this' keyword refer to in JavaScript?",
          options: ["The current function", "The global object", "It depends on the context", "The parent object"],
          correctAnswer: 2,
          explanation: "The 'this' keyword's value depends on how the function is called and in what context it's executed.",
          difficulty: "medium"
        },
        {
          subjectId: jsSubjectId,
          question: "Which of the following is NOT a primitive data type in JavaScript?",
          options: ["string", "number", "object", "boolean"],
          correctAnswer: 2,
          explanation: "object is not a primitive data type. The primitive types are: string, number, boolean, undefined, null, symbol, and bigint.",
          difficulty: "easy"
        },
        {
          subjectId: jsSubjectId,
          question: "What is a closure in JavaScript?",
          options: ["A function that has access to variables in its outer scope", "A way to close a function", "A method to end a loop", "A type of object"],
          correctAnswer: 0,
          explanation: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
          difficulty: "medium"
        },
        {
          subjectId: jsSubjectId,
          question: "What does the async/await syntax do in JavaScript?",
          options: ["Makes code run faster", "Handles asynchronous operations more readably", "Creates multiple threads", "Prevents errors"],
          correctAnswer: 1,
          explanation: "async/await provides a more readable way to handle asynchronous operations compared to traditional promise chains.",
          difficulty: "medium"
        }
      ];

      const insertedQuestions = await db.insert(quizQuestions).values(jsQuestions).returning();
      console.log("JavaScript questions seeded:", insertedQuestions.length);
    }

    // Seed React questions
    const reactSubjectId = insertedSubjects.find(s => s.name === "React")?.id;
    if (reactSubjectId) {
      const reactQuestions = [
        {
          subjectId: reactSubjectId,
          question: "What is the purpose of useState hook in React?",
          options: ["To manage component state", "To handle side effects", "To optimize performance", "To create components"],
          correctAnswer: 0,
          explanation: "useState is a React Hook that allows you to add state to functional components.",
          difficulty: "easy"
        },
        {
          subjectId: reactSubjectId,
          question: "What is the virtual DOM in React?",
          options: ["A copy of the real DOM kept in memory", "A new type of DOM", "A faster DOM implementation", "A DOM manipulation library"],
          correctAnswer: 0,
          explanation: "The virtual DOM is a JavaScript representation of the real DOM kept in memory and synced with the real DOM.",
          difficulty: "medium"
        },
        {
          subjectId: reactSubjectId,
          question: "When should you use useEffect hook?",
          options: ["For managing state", "For handling side effects", "For creating components", "For styling components"],
          correctAnswer: 1,
          explanation: "useEffect is used for performing side effects in functional components like data fetching, subscriptions, or manual DOM changes.",
          difficulty: "medium"
        }
      ];

      const insertedReactQuestions = await db.insert(quizQuestions).values(reactQuestions).returning();
      console.log("React questions seeded:", insertedReactQuestions.length);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}