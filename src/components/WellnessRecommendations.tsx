import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Activity, Sun, Moon, Leaf } from "lucide-react";

interface WellnessRecommendationsProps {
  currentMood: string | null;
}

const recommendations = {
  excellent: [
    { icon: Heart, title: "Spread Kindness", description: "Share your positive energy with others", color: "mood-excellent" },
    { icon: Activity, title: "Try Something New", description: "Challenge yourself with a new activity", color: "mood-good" },
  ],
  good: [
    { icon: Sun, title: "Gratitude Practice", description: "Write down 3 things you're grateful for", color: "mood-excellent" },
    { icon: Leaf, title: "Nature Walk", description: "Spend 15 minutes outdoors", color: "mood-good" },
  ],
  okay: [
    { icon: Brain, title: "Mindful Breathing", description: "Take 5 deep breaths and center yourself", color: "primary" },
    { icon: Activity, title: "Light Exercise", description: "Try gentle stretching or a short walk", color: "mood-good" },
  ],
  poor: [
    { icon: Heart, title: "Self-Compassion", description: "Practice kind self-talk and patience", color: "secondary" },
    { icon: Moon, title: "Rest & Recharge", description: "Take time to rest and be gentle with yourself", color: "accent" },
  ],
  terrible: [
    { icon: Brain, title: "Reach Out", description: "Consider talking to a friend or counselor", color: "secondary" },
    { icon: Heart, title: "Basic Self-Care", description: "Focus on basic needs: food, water, rest", color: "accent" },
  ],
};

export default function WellnessRecommendations({ currentMood }: WellnessRecommendationsProps) {
  const moodRecommendations = currentMood ? recommendations[currentMood as keyof typeof recommendations] : [];

  if (!currentMood || moodRecommendations.length === 0) {
    return (
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Wellness Recommendations
        </h3>
        <p className="text-muted-foreground text-center py-8">
          Select your mood to get personalized wellness recommendations
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-card">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Wellness Recommendations
      </h3>
      <div className="space-y-4">
        {moodRecommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div 
              key={index} 
              className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-card to-secondary/20 border border-border/50 transition-all duration-300 hover:shadow-wellness"
            >
              <div className={`p-2 rounded-full bg-${rec.color}/20`}>
                <Icon size={20} className={`text-${rec.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-card-foreground">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 text-xs"
                >
                  Try This
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}