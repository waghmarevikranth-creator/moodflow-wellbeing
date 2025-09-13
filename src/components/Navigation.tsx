import { Button } from "@/components/ui/button";
import { Home, Plus, TrendingUp, Brain } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/checkin", icon: Plus, label: "Check-in" },
    { path: "/insights", icon: TrendingUp, label: "Insights" },
    { path: "/wellness", icon: Brain, label: "Wellness" },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-primary p-0.5">
              <img 
                src="/src/assets/ravan-logo.jpeg" 
                alt="Ravan Wellness Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-xl font-bold text-foreground">RAVAN WELLNESS</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`
                    flex items-center gap-2 transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-primary shadow-wellness' 
                      : 'hover:bg-secondary/50'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}