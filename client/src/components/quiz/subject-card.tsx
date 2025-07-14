import { QuizSubject } from "@/types/quiz";

interface SubjectCardProps {
  subject: QuizSubject;
  onClick: () => void;
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-l-4 group"
      style={{ borderLeftColor: subject.color }}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {subject.emoji}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-slate-800">{subject.name}</h3>
        <p className="text-slate-600 mb-6">{subject.description}</p>
        
        <div className="flex justify-around pt-6 border-t border-slate-200">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: subject.color }}>
              {subject.questionCount}
            </div>
            <div className="text-sm text-slate-500">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: subject.color }}>
              {subject.bestScore}%
            </div>
            <div className="text-sm text-slate-500">Best Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}
