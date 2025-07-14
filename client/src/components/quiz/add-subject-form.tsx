import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X } from "lucide-react";

interface AddSubjectFormProps {
  onClose: () => void;
}

export function AddSubjectForm({ onClose }: AddSubjectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    emoji: "",
    color: "#6366f1"
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createSubjectMutation = useMutation({
    mutationFn: (data: typeof formData) => 
      apiRequest("/api/subjects", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Quiz subject created successfully!"
      });
      queryClient.invalidateQueries({ queryKey: ["/api/subjects"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create quiz subject",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.emoji) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    createSubjectMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New Quiz Subject</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Subject Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Python"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the subject"
              required
            />
          </div>

          <div>
            <Label htmlFor="emoji">Emoji *</Label>
            <Input
              id="emoji"
              value={formData.emoji}
              onChange={(e) => handleInputChange("emoji", e.target.value)}
              placeholder="🐍"
              maxLength={2}
              required
            />
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange("color", e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={createSubjectMutation.isPending}
            >
              {createSubjectMutation.isPending ? "Creating..." : "Create Subject"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}