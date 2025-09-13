import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";

interface DashboardStatsProps {
  checkInStreak: number;
  averageMood: number;
  totalCheckIns: number;
  improvementTrend: number;
}

export default function DashboardStats({ 
  checkInStreak, 
  averageMood, 
  totalCheckIns, 
  improvementTrend 
}: DashboardStatsProps) {
  const moodLabels = ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];
  const averageMoodLabel = moodLabels[Math.round(averageMood) - 1] || 'Unknown';

  const stats = [
    {
      icon: Calendar,
      label: "Check-in Streak",
      value: `${checkInStreak} days`,
      color: "primary",
      description: "Keep it up!"
    },
    {
      icon: TrendingUp,
      label: "Average Mood",
      value: averageMoodLabel,
      color: "mood-good",
      description: "This week"
    },
    {
      icon: Target,
      label: "Total Check-ins",
      value: totalCheckIns.toString(),
      color: "accent",
      description: "All time"
    },
    {
      icon: Award,
      label: "Improvement",
      value: `${improvementTrend > 0 ? '+' : ''}${improvementTrend}%`,
      color: improvementTrend >= 0 ? "mood-excellent" : "mood-poor",
      description: "vs last week"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className="p-4 shadow-card hover:shadow-wellness transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-${stat.color}/20`}>
                <Icon size={20} className={`text-${stat.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}