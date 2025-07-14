import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { AppHeader } from "@/components/quiz/app-header";
import { SubjectCard } from "@/components/quiz/subject-card";
import { InstallPrompt } from "@/components/quiz/install-prompt";
import { OfflineIndicator } from "@/components/quiz/offline-indicator";
import { QuizSubject } from "@/types/quiz";
import { useOfflineStorage } from "@/hooks/use-offline-storage";
import { defaultSubjects } from "@/lib/quiz-data";
import { useEffect } from "react";

export default function Home() {
  const [, navigate] = useLocation();
  const { cacheSubjects, getCachedSubjects } = useOfflineStorage();

  const { data: subjects, isLoading } = useQuery({
    queryKey: ['/api/subjects'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/subjects');
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const data = await response.json();
        // Cache subjects for offline use
        await cacheSubjects(data);
        return data as QuizSubject[];
      } catch (error) {
        console.error('Failed to fetch subjects, using cached data:', error);
        const cached = await getCachedSubjects();
        return cached.length > 0 ? cached : defaultSubjects;
      }
    },
  });

  const handleSubjectClick = (subject: QuizSubject) => {
    navigate(`/quiz/${subject.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <AppHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-xl animate-pulse">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="flex justify-around pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="h-8 w-8 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-8 w-8 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <OfflineIndicator />
      <InstallPrompt />
      
      <div className="max-w-4xl mx-auto">
        <AppHeader />
        
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate('/admin')}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            ⚙️ Admin Panel
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subjects?.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={() => handleSubjectClick(subject)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
