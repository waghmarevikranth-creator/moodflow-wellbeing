import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MoodSelector from "./MoodSelector";
import { Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckInFormProps {
  onSubmit: (data: { mood: string; notes: string; date: string }) => void;
}

export default function CheckInForm({ onSubmit }: CheckInFormProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling today before saving",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toLocaleDateString();
    onSubmit({
      mood: selectedMood,
      notes,
      date: today,
    });

    toast({
      title: "Check-in saved! ✨",
      description: "Your mood and notes have been recorded for today",
    });

    // Reset form
    setSelectedMood(null);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <MoodSelector 
        selectedMood={selectedMood} 
        onMoodSelect={setSelectedMood} 
      />
      
      <Card className="p-6 shadow-card">
        <div className="space-y-4">
          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-card-foreground">
              How was your day? (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Share what's on your mind... any thoughts, experiences, or reflections about your day"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 min-h-[100px] resize-none focus:ring-primary"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {notes.length}/500 characters
            </p>
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="lg"
            disabled={!selectedMood}
          >
            <Save size={18} className="mr-2" />
            Save Today's Check-in
            <Sparkles size={16} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}