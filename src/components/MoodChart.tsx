import { Card } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MoodChartProps {
  data: { date: string; mood: number }[];
}

export default function MoodChart({ data }: MoodChartProps) {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Mood Trend',
        data: data.map(item => item.mood),
        borderColor: 'hsl(187, 85%, 53%)',
        backgroundColor: 'hsla(187, 85%, 53%, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'hsl(187, 85%, 53%)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: 'hsl(187, 85%, 53%)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const moodLabels = ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];
            return `Mood: ${moodLabels[context.raw - 1] || 'Unknown'}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 1,
        max: 5,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6b7280',
          stepSize: 1,
          callback: function(value: any) {
            const moodLabels = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];
            return moodLabels[value] || '';
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <Card className="p-6 shadow-card">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Mood Trends
      </h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
}