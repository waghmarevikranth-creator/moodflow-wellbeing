import CheckInForm from "@/components/CheckInForm";
import { Heart, Sparkles } from "lucide-react";

export default function CheckIn() {
  const handleCheckInSubmit = (data: { mood: string; notes: string; date: string }) => {
    console.log("Check-in submitted:", data);
    // Here you would typically save to a database
    // For now, we'll just log it
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart size={32} className="text-primary" />
            <Sparkles size={24} className="text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Daily Check-in
          </h1>
          <p className="text-muted-foreground text-lg">
            Take a moment to reflect on your day and check in with yourself
          </p>
        </div>

        {/* Check-in Form */}
        <CheckInForm onSubmit={handleCheckInSubmit} />

        {/* Motivation Section */}
        <div className="mt-8 text-center">
          <div className="p-6 rounded-lg bg-card/50 border border-border/50">
            <p className="text-muted-foreground italic">
              "The greatest revolution of our generation is the discovery that human beings, 
              by changing the inner attitudes of their minds, can change the outer aspects of their lives."
            </p>
            <p className="text-sm text-muted-foreground mt-2">— William James</p>
          </div>
        </div>
      </div>
    </div>
  );
}