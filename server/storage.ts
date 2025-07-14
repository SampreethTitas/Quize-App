import { users, quizSubjects, quizQuestions, quizAttempts, type User, type InsertUser, type QuizSubject, type QuizQuestion, type QuizAttempt, type InsertQuizSubject, type InsertQuizQuestion, type InsertQuizAttempt } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz subjects
  getAllSubjects(): Promise<QuizSubject[]>;
  getSubject(id: number): Promise<QuizSubject | undefined>;
  createSubject(subject: InsertQuizSubject): Promise<QuizSubject>;
  
  // Quiz questions
  getQuestionsBySubject(subjectId: number): Promise<QuizQuestion[]>;
  getQuestion(id: number): Promise<QuizQuestion | undefined>;
  createQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  
  // Quiz attempts
  getAttemptsBySubject(subjectId: number, userId?: number): Promise<QuizAttempt[]>;
  getBestScore(subjectId: number, userId?: number): Promise<number>;
  createAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subjects: Map<number, QuizSubject>;
  private questions: Map<number, QuizQuestion>;
  private attempts: Map<number, QuizAttempt>;
  private currentUserId: number;
  private currentSubjectId: number;
  private currentQuestionId: number;
  private currentAttemptId: number;

  constructor() {
    this.users = new Map();
    this.subjects = new Map();
    this.questions = new Map();
    this.attempts = new Map();
    this.currentUserId = 1;
    this.currentSubjectId = 1;
    this.currentQuestionId = 1;
    this.currentAttemptId = 1;
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize subjects
    const subjectsData = [
      { name: "JavaScript", description: "Core concepts, ES6+, async programming, and modern JavaScript features", emoji: "⚡", color: "#6366f1" },
      { name: "React", description: "Components, hooks, state management, and React ecosystem", emoji: "⚛️", color: "#22c55e" },
      { name: "Node.js", description: "Server-side JavaScript, APIs, databases, and backend development", emoji: "🚀", color: "#3b82f6" },
      { name: "Algorithms", description: "Data structures, sorting, searching, and algorithm complexity", emoji: "🧠", color: "#8b5cf6" },
      { name: "System Design", description: "Scalability, architecture patterns, and distributed systems", emoji: "🏗️", color: "#f59e0b" },
      { name: "Databases", description: "SQL, NoSQL, database design, and optimization techniques", emoji: "🗄️", color: "#6366f1" },
    ];

    subjectsData.forEach(subject => {
      const id = this.currentSubjectId++;
      this.subjects.set(id, { ...subject, id, createdAt: new Date() });
    });

    // Initialize questions for JavaScript
    const jsQuestions = [
      {
        subjectId: 1,
        question: "What is the difference between let and var in JavaScript?",
        options: ["let has block scope, var has function scope", "var has block scope, let has function scope", "There is no difference between let and var", "let is deprecated in favor of var"],
        correctAnswer: 0,
        explanation: "let has block scope while var has function scope. This is one of the key differences introduced in ES6.",
        difficulty: "easy"
      },
      {
        subjectId: 1,
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: ["The current function", "The global object", "It depends on the context", "The parent object"],
        correctAnswer: 2,
        explanation: "The 'this' keyword's value depends on how the function is called and in what context it's executed.",
        difficulty: "medium"
      },
      {
        subjectId: 1,
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["string", "number", "object", "boolean"],
        correctAnswer: 2,
        explanation: "object is not a primitive data type. The primitive types are: string, number, boolean, undefined, null, symbol, and bigint.",
        difficulty: "easy"
      },
      {
        subjectId: 1,
        question: "What is a closure in JavaScript?",
        options: ["A function that has access to variables in its outer scope", "A way to close a function", "A method to end a loop", "A type of object"],
        correctAnswer: 0,
        explanation: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
        difficulty: "medium"
      },
      {
        subjectId: 1,
        question: "What does the async/await syntax do in JavaScript?",
        options: ["Makes code run faster", "Handles asynchronous operations more readably", "Creates multiple threads", "Prevents errors"],
        correctAnswer: 1,
        explanation: "async/await provides a more readable way to handle asynchronous operations compared to traditional promise chains.",
        difficulty: "medium"
      }
    ];

    jsQuestions.forEach(question => {
      const id = this.currentQuestionId++;
      this.questions.set(id, { ...question, id, createdAt: new Date() });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllSubjects(): Promise<QuizSubject[]> {
    return Array.from(this.subjects.values());
  }

  async getSubject(id: number): Promise<QuizSubject | undefined> {
    return this.subjects.get(id);
  }

  async createSubject(insertSubject: InsertQuizSubject): Promise<QuizSubject> {
    const id = this.currentSubjectId++;
    const subject: QuizSubject = { ...insertSubject, id, createdAt: new Date() };
    this.subjects.set(id, subject);
    return subject;
  }

  async getQuestionsBySubject(subjectId: number): Promise<QuizQuestion[]> {
    return Array.from(this.questions.values()).filter(q => q.subjectId === subjectId);
  }

  async getQuestion(id: number): Promise<QuizQuestion | undefined> {
    return this.questions.get(id);
  }

  async createQuestion(insertQuestion: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = this.currentQuestionId++;
    const question: QuizQuestion = { 
      ...insertQuestion, 
      id, 
      createdAt: new Date(),
      explanation: insertQuestion.explanation || null,
      difficulty: insertQuestion.difficulty || "medium"
    };
    this.questions.set(id, question);
    return question;
  }

  async getAttemptsBySubject(subjectId: number, userId?: number): Promise<QuizAttempt[]> {
    return Array.from(this.attempts.values()).filter(a => 
      a.subjectId === subjectId && (userId ? a.userId === userId : true)
    );
  }

  async getBestScore(subjectId: number, userId?: number): Promise<number> {
    const attempts = await this.getAttemptsBySubject(subjectId, userId);
    if (attempts.length === 0) return 0;
    return Math.max(...attempts.map(a => a.score));
  }

  async createAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = this.currentAttemptId++;
    const attempt: QuizAttempt = { 
      ...insertAttempt, 
      id, 
      completedAt: new Date(),
      userId: insertAttempt.userId || null
    };
    this.attempts.set(id, attempt);
    return attempt;
  }
}

export const storage = new MemStorage();
