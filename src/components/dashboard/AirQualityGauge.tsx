
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface AirQualityGaugeProps {
  value: number;
  max: number;
  title: string;
  unit: string;
  className?: string;
  color?: string;
}

const AirQualityGauge = ({ 
  value, 
  max, 
  title, 
  unit, 
  className,
  color = "hsl(var(--primary))"
}: AirQualityGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // Color definitions based on value
  const getColor = (currentValue: number) => {
    const percentage = (currentValue / max) * 100;
    if (percentage < 30) return "hsl(var(--success))";
    if (percentage < 70) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };
  
  const actualColor = color === "auto" ? getColor(value) : color;
  
  useEffect(() => {
    const animationDuration = 1000; // ms
    const steps = 60;
    const increment = value / steps;
    let currentValue = 0;
    
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= value) {
        clearInterval(interval);
        setAnimatedValue(value);
      } else {
        setAnimatedValue(currentValue);
      }
    }, animationDuration / steps);
    
    return () => clearInterval(interval);
  }, [value]);
  
  // Calculate percentage for the gauge
  const percentage = (value / max) * 100;
  
  // Data for the pie chart that acts as a gauge
  const data = [
    { name: 'Value', value: percentage },
    { name: 'Remaining', value: 100 - percentage }
  ];
  
  return (
    <div className={cn("glass-card p-4 flex flex-col items-center", className)}>
      <div className="text-sm font-medium text-center mb-2">{title}</div>
      
      <div className="relative w-full aspect-square max-w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={actualColor} />
              <Cell fill="rgba(255,255,255,0.1)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">
            {Math.round(animatedValue)}
          </div>
          <div className="text-xs text-muted-foreground">{unit}</div>
        </div>
      </div>
      
      <div className="flex justify-between w-full mt-2 text-xs">
        <span>0</span>
        <span className="text-muted-foreground">Good - Moderate - Poor</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default AirQualityGauge;
