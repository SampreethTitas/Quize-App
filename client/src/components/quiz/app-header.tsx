import { useEffect, useState } from "react";

export function AppHeader() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="text-center mb-12 glass-card rounded-3xl p-8 md:p-12">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
        🎯 PrepQuiz Pro
      </h1>
      <p className="text-xl text-white/90 mb-6">
        Professional offline-first quiz app for technical interview preparation
      </p>
      
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {isOnline ? (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-sm font-medium">Offline</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
          </svg>
          <span className="text-sm font-medium">Cached</span>
        </div>
      </div>
    </header>
  );
}
