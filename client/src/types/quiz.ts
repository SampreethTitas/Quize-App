export interface QuizSubject {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  questionCount: number;
  bestScore: number;
  createdAt: Date;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  difficulty: string;
}

export interface QuizAttempt {
  id: number;
  subjectId: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  answers: number[];
  completedAt: Date;
}

export interface QuizResult {
  results: {
    questionId: number;
    correct: boolean;
    correctAnswer: number;
    explanation?: string;
  }[];
  score: number;
  correctCount: number;
  totalQuestions: number;
}
