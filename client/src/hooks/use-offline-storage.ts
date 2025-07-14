import { useEffect, useState } from "react";
import { offlineStorage } from "@/lib/offline-storage";
import { QuizSubject, QuizQuestion } from "@/types/quiz";

export function useOfflineStorage() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        await offlineStorage.init();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize offline storage:', error);
      }
    };

    initDB();
  }, []);

  const cacheSubjects = async (subjects: QuizSubject[]) => {
    if (!isInitialized) return;
    try {
      await offlineStorage.storeSubjects(subjects);
    } catch (error) {
      console.error('Failed to cache subjects:', error);
    }
  };

  const getCachedSubjects = async (): Promise<QuizSubject[]> => {
    if (!isInitialized) return [];
    try {
      return await offlineStorage.getSubjects();
    } catch (error) {
      console.error('Failed to get cached subjects:', error);
      return [];
    }
  };

  const cacheQuestions = async (questions: QuizQuestion[], subjectId: number) => {
    if (!isInitialized) return;
    try {
      await offlineStorage.storeQuestions(questions, subjectId);
    } catch (error) {
      console.error('Failed to cache questions:', error);
    }
  };

  const getCachedQuestions = async (subjectId: number): Promise<QuizQuestion[]> => {
    if (!isInitialized) return [];
    try {
      return await offlineStorage.getQuestions(subjectId);
    } catch (error) {
      console.error('Failed to get cached questions:', error);
      return [];
    }
  };

  return {
    isInitialized,
    cacheSubjects,
    getCachedSubjects,
    cacheQuestions,
    getCachedQuestions
  };
}
