import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState } from "react";
import { QuizQuestion } from "@/types/quiz";
import { ProgressBar } from "@/components/quiz/progress-bar";
import { QuestionDisplay } from "@/components/quiz/question-display";
import { useQuizState } from "@/hooks/use-quiz-state";
import { useOfflineStorage } from "@/hooks/use-offline-storage";
import { defaultQuestions } from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Quiz() {
  const [, navigate] = useLocation();
  const { cacheQuestions, getCachedQuestions } = useOfflineStorage();
  const [subjectId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/quiz\/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  });

  const { data: questions, isLoading } = useQuery({
    queryKey: ['/api/subjects', subjectId, 'questions'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/subjects/${subjectId}/questions`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        // Cache questions for offline use
        await cacheQuestions(data, subjectId);
        return data as QuizQuestion[];
      } catch (error) {
        console.error('Failed to fetch questions, using cached data:', error);
        const cached = await getCachedQuestions(subjectId);
        return cached.length > 0 ? cached : (subjectId === 1 ? defaultQuestions : []);
      }
    },
  });

  const {
    state,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    completeQuiz,
    resetQuiz,
    getProgress,
    canGoNext,
    canGoPrev,
    canSubmit
  } = useQuizState(questions || []);

  const handleSubmit = async () => {
    if (!questions) return;
    
    try {
      // Check answers with backend
      const response = await fetch(`/api/subjects/${subjectId}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: state.answers
        })
      });

      if (response.ok) {
        const results = await response.json();
        completeQuiz();
        navigate(`/results/${subjectId}`, { 
          state: { 
            ...results, 
            timeSpent: Math.floor((Date.now() - state.startTime) / 1000),
            answers: state.answers
          } 
        });
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      // Fallback to client-side checking
      completeQuiz();
      navigate(`/results/${subjectId}`, { 
        state: { 
          score: 0, 
          timeSpent: Math.floor((Date.now() - state.startTime) / 1000),
          answers: state.answers 
        } 
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-6"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-12"></div>
              <div className="h-6 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-center">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800">No Questions Available</h2>
            <p className="text-lg text-slate-600 mb-8">
              Questions are not available offline. Please connect to the internet to load questions.
            </p>
            <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary-dark">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[state.currentQuestion];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="quiz-header text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
              JavaScript Quiz
            </h2>
            
            <ProgressBar 
              current={state.currentQuestion + 1}
              total={questions.length}
              progress={getProgress()}
            />
          </div>

          <QuestionDisplay
            question={currentQuestion}
            selectedAnswer={state.answers[state.currentQuestion]}
            onAnswerSelect={answerQuestion}
          />

          <div className="quiz-actions flex justify-center gap-4 mt-12">
            <Button
              onClick={prevQuestion}
              disabled={!canGoPrev()}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>
            
            {state.currentQuestion < questions.length - 1 ? (
              <Button
                onClick={nextQuestion}
                disabled={!canGoNext()}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit()}
                className="bg-success hover:bg-green-600"
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
