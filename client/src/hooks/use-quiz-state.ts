import { useState, useEffect } from "react";
import { QuizQuestion } from "@/types/quiz";

export interface QuizState {
  currentQuestion: number;
  answers: number[];
  score: number;
  startTime: number;
  endTime?: number;
  isComplete: boolean;
}

export function useQuizState(questions: QuizQuestion[]) {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    score: 0,
    startTime: Date.now(),
    isComplete: false
  });

  const answerQuestion = (answer: number) => {
    setState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestion] = answer;
      return { ...prev, answers: newAnswers };
    });
  };

  const nextQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.min(prev.currentQuestion + 1, questions.length - 1)
    }));
  };

  const prevQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.max(prev.currentQuestion - 1, 0)
    }));
  };

  const completeQuiz = () => {
    setState(prev => ({
      ...prev,
      isComplete: true,
      endTime: Date.now()
    }));
  };

  const resetQuiz = () => {
    setState({
      currentQuestion: 0,
      answers: [],
      score: 0,
      startTime: Date.now(),
      isComplete: false
    });
  };

  const getProgress = () => {
    return questions.length > 0 ? ((state.currentQuestion + 1) / questions.length) * 100 : 0;
  };

  const getTimeSpent = () => {
    const endTime = state.endTime || Date.now();
    return Math.floor((endTime - state.startTime) / 1000);
  };

  const canGoNext = () => {
    return state.answers[state.currentQuestion] !== undefined && 
           state.currentQuestion < questions.length - 1;
  };

  const canGoPrev = () => {
    return state.currentQuestion > 0;
  };

  const canSubmit = () => {
    return state.answers[state.currentQuestion] !== undefined && 
           state.currentQuestion === questions.length - 1;
  };

  return {
    state,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    completeQuiz,
    resetQuiz,
    getProgress,
    getTimeSpent,
    canGoNext,
    canGoPrev,
    canSubmit
  };
}
