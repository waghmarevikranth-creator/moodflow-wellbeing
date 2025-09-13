import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smile, Meh, Frown, Heart, Sun } from "lucide-react";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { id: "excellent", label: "Excellent", icon: Heart, color: "mood-excellent", description: "Feeling fantastic!" },
  { id: "good", label: "Good", icon: Sun, color: "mood-good", description: "Pretty good day" },
  { id: "okay", label: "Okay", icon: Smile, color: "mood-okay", description: "Just okay" },
  { id: "poor", label: "Poor", icon: Meh, color: "mood-poor", description: "Not so great" },
  { id: "terrible", label: "Terrible", icon: Frown, color: "mood-terrible", description: "Really struggling" }
];

export default function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <Card className="p-6 bg-gradient-wellness shadow-wellness">
      <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
        How are you feeling today?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <Button
              key={mood.id}
              variant="outline"
              className={`
                h-20 flex-col gap-2 transition-all duration-300 hover:scale-105
                ${isSelected 
                  ? `bg-${mood.color} border-${mood.color} text-white shadow-glow` 
                  : 'bg-card/50 hover:bg-card border-border'
                }
              `}
              onClick={() => onMoodSelect(mood.id)}
            >
              <Icon size={24} />
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          );
        })}
      </div>
      {selectedMood && (
        <p className="text-center text-muted-foreground mt-4 animate-in fade-in duration-300">
          {moods.find(m => m.id === selectedMood)?.description}
        </p>
      )}
    </Card>
  );
}