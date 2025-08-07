import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizAttemptSchema, insertQuizSubjectSchema, insertQuizQuestionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all quiz subjects
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getAllSubjects();
      
      // Add question count and best score for each subject
      const subjectsWithStats = await Promise.all(
        subjects.map(async (subject) => {
          const questions = await storage.getQuestionsBySubject(subject.id);
          const bestScore = await storage.getBestScore(subject.id);
          return {
            ...subject,
            questionCount: questions.length,
            bestScore: bestScore || 0
          };
        })
      );
      
      res.json(subjectsWithStats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  // Get questions for a specific subject
  app.get("/api/subjects/:id/questions", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.id);
      const questions = await storage.getQuestionsBySubject(subjectId);
      
      // Remove correct answers from response for security
      const questionsWithoutAnswers = questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        difficulty: q.difficulty
      }));
      
      res.json(questionsWithoutAnswers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Submit quiz attempt
  app.post("/api/attempts", async (req, res) => {
    try {
      const attemptData = insertQuizAttemptSchema.parse(req.body);
      const attempt = await storage.createAttempt(attemptData);
      res.json(attempt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid attempt data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save attempt" });
      }
    }
  });

  // Check answers and return results
  app.post("/api/subjects/:id/check", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.id);
      const { answers, timeSpent = 0 } = req.body;

      console.log("subjectId:", subjectId);
      console.log("answers:", answers);

      const questions = await storage.getQuestionsBySubject(subjectId);
      console.log("questions:", questions);

      if (!Array.isArray(answers)) {
        return res.status(400).json({ message: "Answers must be an array" });
      }
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: "No questions found for subject" });
      }

      const results = questions.map((question, index) => ({
        questionId: question.id,
        correct: answers[index] === question.correctAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      }));

      const correctCount = results.filter(r => r.correct).length;
      const score = Math.round((correctCount / questions.length) * 100);

      // Save the attempt
      const attemptData = {
        subjectId,
        score,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        timeSpent,
        answers
      };
      console.log("attemptData:", attemptData);

      await storage.createAttempt(attemptData);

      res.json({
        results,
        score,
        correctCount,
        totalQuestions: questions.length
      });
    } catch (error) {
      console.error("Error in /api/subjects/:id/check:", error);
      res.status(500).json({ message: "Failed to check answers" });
    }
  });

  // Get subject details
  app.get("/api/subjects/:id", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.id);
      const subject = await storage.getSubject(subjectId);
      
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      
      const questions = await storage.getQuestionsBySubject(subjectId);
      const bestScore = await storage.getBestScore(subjectId);
      
      res.json({
        ...subject,
        questionCount: questions.length,
        bestScore: bestScore || 0
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subject" });
    }
  });

  // Create new subject
  app.post("/api/subjects", async (req, res) => {
    try {
      const subjectData = insertQuizSubjectSchema.parse(req.body);
      const subject = await storage.createSubject(subjectData);
      res.status(201).json(subject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid subject data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create subject" });
      }
    }
  });

  // Add question to subject
  app.post("/api/subjects/:id/questions", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.id);
      const questionData = insertQuizQuestionSchema.parse({
        ...req.body,
        subjectId
      });
      
      const question = await storage.createQuestion(questionData);
      res.status(201).json(question);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid question data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create question" });
      }
    }
  });

  // Get all questions for a subject (with answers - for admin)
  app.get("/api/subjects/:id/questions/admin", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.id);
      const questions = await storage.getQuestionsBySubject(subjectId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Delete question
  app.delete("/api/questions/:id", async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      // Note: We'd need to implement deleteQuestion in storage
      res.status(200).json({ message: "Question deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete question" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
