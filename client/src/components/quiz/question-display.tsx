import { QuizQuestion } from "@/types/quiz";
import { OptionButton } from "./option-button";

interface QuestionDisplayProps {
  question: QuizQuestion;
  selectedAnswer?: number;
  onAnswerSelect: (answer: number) => void;
}

export function QuestionDisplay({ question, selectedAnswer, onAnswerSelect }: QuestionDisplayProps) {
  return (
    <div className="mb-12 question-fade-in">
      <h3 className="text-xl md:text-2xl font-semibold mb-8 text-slate-800 leading-relaxed">
        {question.question}
      </h3>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            onClick={() => onAnswerSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}
