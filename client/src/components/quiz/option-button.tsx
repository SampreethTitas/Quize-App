interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export function OptionButton({ option, index, isSelected, onClick }: OptionButtonProps) {
  return (
    <div 
      className={`option-hover bg-slate-50 border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-primary bg-primary/5' 
          : 'border-slate-200 hover:border-primary hover:bg-primary/5'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div 
          className={`w-5 h-5 border-2 rounded-full flex-shrink-0 ${
            isSelected 
              ? 'bg-primary border-primary' 
              : 'border-slate-300'
          }`}
        />
        <span className="text-lg">{option}</span>
      </div>
    </div>
  );
}
