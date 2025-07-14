import { usePWA } from "@/hooks/use-pwa";

export function InstallPrompt() {
  const { showInstallPrompt, installApp, dismissPrompt } = usePWA();

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-sm mx-auto install-animation">
        <div className="text-2xl">📱</div>
        <div className="flex-1">
          <p className="font-semibold">Install PrepQuiz Pro</p>
          <p className="text-sm text-gray-300">Quick access from your home screen</p>
        </div>
        <button 
          onClick={installApp}
          className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Install
        </button>
        <button 
          onClick={dismissPrompt}
          className="text-gray-400 hover:text-white ml-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
