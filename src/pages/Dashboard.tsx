import { useState, useEffect } from "react";
import DashboardStats from "@/components/DashboardStats";
import MoodChart from "@/components/MoodChart";
import WellnessRecommendations from "@/components/WellnessRecommendations";
import { Card } from "@/components/ui/card";
import { Calendar, TrendingUp } from "lucide-react";

interface MoodEntry {
  date: string;
  mood: string;
  moodValue: number;
  notes?: string;
}

export default function Dashboard() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  // Sample data for demonstration
  useEffect(() => {
    const sampleData: MoodEntry[] = [
      { date: "Nov 1", mood: "good", moodValue: 4, notes: "Great day at work" },
      { date: "Nov 2", mood: "okay", moodValue: 3, notes: "Feeling neutral" },
      { date: "Nov 3", mood: "excellent", moodValue: 5, notes: "Amazing weather!" },
      { date: "Nov 4", mood: "good", moodValue: 4, notes: "Productive day" },
      { date: "Nov 5", mood: "poor", moodValue: 2, notes: "Stressful day" },
      { date: "Nov 6", mood: "okay", moodValue: 3, notes: "Getting better" },
      { date: "Nov 7", mood: "good", moodValue: 4, notes: "Nice weekend" },
    ];
    setMoodEntries(sampleData);
    setCurrentMood(sampleData[sampleData.length - 1]?.mood || null);
  }, []);

  const chartData = moodEntries.map(entry => ({
    date: entry.date,
    mood: entry.moodValue,
  }));

  const averageMood = moodEntries.length > 0 
    ? moodEntries.reduce((sum, entry) => sum + entry.moodValue, 0) / moodEntries.length 
    : 0;

  const checkInStreak = 7; // Sample streak
  const totalCheckIns = moodEntries.length;
  const improvementTrend = 15; // Sample improvement percentage

  const todayEntry = moodEntries.find(entry => 
    entry.date === new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome to Your Wellness Journey
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your mood, discover patterns, and nurture your mental health
          </p>
        </div>

        {/* Today's Status */}
        {todayEntry && (
          <Card className="p-6 mb-8 shadow-wellness bg-gradient-wellness">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Calendar size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Today's Check-in Complete ✨
                </h3>
                <p className="text-muted-foreground">
                  You're feeling {todayEntry.mood} today. {todayEntry.notes && `"${todayEntry.notes}"`}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="mb-8">
          <DashboardStats
            checkInStreak={checkInStreak}
            averageMood={averageMood}
            totalCheckIns={totalCheckIns}
            improvementTrend={improvementTrend}
          />
        </div>

        {/* Charts and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MoodChart data={chartData} />
          <WellnessRecommendations currentMood={currentMood} />
        </div>

        {/* Insights Section */}
        <Card className="p-6 mt-8 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">
              Weekly Insights
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-primary">
                {Math.round(averageMood * 20)}%
              </p>
              <p className="text-sm text-muted-foreground">Overall Wellness</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/50">
              <p className="text-2xl font-bold text-primary">
                {checkInStreak}
              </p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <p className="text-2xl font-bold text-primary">
                {improvementTrend > 0 ? '+' : ''}{improvementTrend}%
              </p>
              <p className="text-sm text-muted-foreground">Improvement</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}