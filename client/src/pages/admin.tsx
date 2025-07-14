import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddSubjectForm } from "@/components/quiz/add-subject-form";
import { AddQuestionForm } from "@/components/quiz/add-question-form";
import { QuizSubject } from "@/types/quiz";
import { Plus, BookOpen, HelpCircle } from "lucide-react";

export default function Admin() {
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState<{ subjectId: number; subjectName: string } | null>(null);

  const { data: subjects, isLoading } = useQuery({
    queryKey: ['/api/subjects'],
    queryFn: async () => {
      const response = await fetch('/api/subjects');
      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }
      return response.json() as Promise<QuizSubject[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Admin</h1>
            <p className="text-white/80">Manage quiz subjects and questions</p>
          </div>
          <Button 
            onClick={() => setShowAddSubject(true)}
            className="bg-primary hover:bg-primary-dark"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </div>

        {showAddSubject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <AddSubjectForm onClose={() => setShowAddSubject(false)} />
          </div>
        )}

        {showAddQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <AddQuestionForm 
              subjectId={showAddQuestion.subjectId}
              subjectName={showAddQuestion.subjectName}
              onClose={() => setShowAddQuestion(null)} 
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects?.map((subject) => (
            <Card key={subject.id} className="bg-white shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{subject.emoji}</span>
                    <span className="text-lg">{subject.name}</span>
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                  >
                    {subject.questionCount} questions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{subject.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{subject.questionCount} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Best: {subject.bestScore}%</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => setShowAddQuestion({ subjectId: subject.id, subjectName: subject.name })}
                    className="flex-1"
                    variant="outline"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {subjects && subjects.length === 0 && (
          <Card className="bg-white text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">No quiz subjects yet</h3>
              <p className="text-gray-600 mb-6">Create your first quiz subject to get started</p>
              <Button onClick={() => setShowAddSubject(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Subject
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}