import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ResultsState {
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeSpent: number;
  answers: number[];
}

export default function Results() {
  const [, navigate] = useLocation();
  const [results, setResults] = useState<ResultsState | null>(null);
  const [subjectId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/results\/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  });

  useEffect(() => {
    // Get results from navigation state or localStorage
    const state = history.state?.state;
    if (state) {
      setResults(state);
    } else {
      // Fallback to localStorage or redirect to home
      navigate('/');
    }
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return '🎉';
    if (score >= 60) return '👍';
    return '💪';
  };

  const handleRetry = () => {
    navigate(`/quiz/${subjectId}`);
  };

  const handleHome = () => {
    navigate('/');
  };

  if (!results) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading results...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-center">
          <div className="mb-8">
            <div className="text-6xl mb-6">{getScoreEmoji(results.score)}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Quiz Complete!</h2>
            <p className="text-lg text-slate-600">Great job on completing the quiz</p>
          </div>

          <div className={`text-6xl md:text-8xl font-bold mb-8 ${getScoreColor(results.score)}`}>
            {results.score}%
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
              <div className="text-3xl font-bold text-primary mb-2">
                {results.correctCount}
              </div>
              <div className="text-slate-600">Correct</div>
            </div>
            <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {results.totalQuestions - results.correctCount}
              </div>
              <div className="text-slate-600">Incorrect</div>
            </div>
            <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {results.totalQuestions}
              </div>
              <div className="text-slate-600">Total</div>
            </div>
            <div className="bg-orange-500/10 p-6 rounded-xl border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {formatTime(results.timeSpent)}
              </div>
              <div className="text-slate-600">Time</div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button 
              onClick={handleRetry}
              className="bg-primary hover:bg-primary-dark"
            >
              Try Again
            </Button>
            <Button 
              onClick={handleHome}
              variant="secondary"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
