
import { useRef, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { AreaChart, Area } from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface TrafficData {
  time: string;
  primary: number;
  secondary: number;
  congestion: number;
}

const data: TrafficData[] = [
  { time: '00:00', primary: 240, secondary: 160, congestion: 12 },
  { time: '03:00', primary: 180, secondary: 120, congestion: 8 },
  { time: '06:00', primary: 320, secondary: 240, congestion: 27 },
  { time: '09:00', primary: 580, secondary: 380, congestion: 78 },
  { time: '12:00', primary: 460, secondary: 320, congestion: 52 },
  { time: '15:00', primary: 530, secondary: 350, congestion: 64 },
  { time: '18:00', primary: 610, secondary: 420, congestion: 82 },
  { time: '21:00', primary: 380, secondary: 240, congestion: 42 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 !bg-popover">
        <p className="text-sm font-medium">{`Time: ${label}`}</p>
        <p className="text-xs text-info">
          {`Primary Roads: ${payload[0].value} vehicles`}
        </p>
        <p className="text-xs text-accent">
          {`Secondary Roads: ${payload[1].value} vehicles`}
        </p>
        <p className="text-xs text-destructive">
          {`Congestion: ${payload[2].value}%`}
        </p>
      </div>
    );
  }

  return null;
};

const TrafficFlowChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const textColor = isDark ? '#f1f5f9' : '#334155';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-medium mb-4">Traffic Flow Trends</h3>
      
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="time" 
              stroke={textColor} 
              tick={{ fill: textColor, fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              orientation="left" 
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              label={{ 
                value: 'Vehicles', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: textColor, fontSize: 12 }
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              label={{ 
                value: 'Congestion %', 
                angle: 90, 
                position: 'insideRight',
                style: { fill: textColor, fontSize: 12 }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="primary"
              name="Primary Roads"
              stroke="hsl(var(--info))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--info))", r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--info))", strokeWidth: 2 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="secondary"
              name="Secondary Roads"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--accent))", r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--accent))", strokeWidth: 2 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="congestion"
              name="Congestion Index"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--destructive))", r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--destructive))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficFlowChart;
