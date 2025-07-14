interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="progress-container mb-6">
      <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-primary to-primary-dark h-3 rounded-full progress-animate"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-slate-600">
        Question {current} of {total}
      </p>
    </div>
  );
}
