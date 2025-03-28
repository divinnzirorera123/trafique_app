
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start mb-3">
        <div className="stat-card-title">{title}</div>
        <div className="text-muted-foreground">{icon}</div>
      </div>

      <div className="stat-card-value">{value}</div>
      
      {trend && (
        <div className={cn(
          "stat-card-trend mt-2",
          trend.isUpward ? "trend-up" : "trend-down"
        )}>
          {trend.isUpward ? 
            <TrendingUp className="h-4 w-4" /> : 
            <TrendingDown className="h-4 w-4" />
          }
          <span>{Math.abs(trend.value)}%</span>
          <span className="text-muted-foreground">vs last week</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
