
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeatMapProps {
  className?: string;
}

const HeatMap = ({ className }: HeatMapProps) => {
  const gridSize = 10;
  const [heatData, setHeatData] = useState<number[][]>([]);
  
  // Generate random heat data for visualization
  useEffect(() => {
    const generateHeatData = () => {
      const data: number[][] = [];
      
      // Generate a cluster of higher values in the center
      const centerX = Math.floor(gridSize / 2);
      const centerY = Math.floor(gridSize / 2);
      
      for (let i = 0; i < gridSize; i++) {
        const row: number[] = [];
        for (let j = 0; j < gridSize; j++) {
          // Calculate distance from center
          const distance = Math.sqrt(
            Math.pow(i - centerX, 2) + Math.pow(j - centerY, 2)
          );
          
          // Value decreases as distance increases (with some randomness)
          const baseValue = Math.max(0, 100 - (distance * 20));
          const randomFactor = Math.random() * 30 - 15; // -15 to +15
          row.push(Math.min(100, Math.max(0, baseValue + randomFactor)));
        }
        data.push(row);
      }
      
      // Add a couple more random hotspots
      const hotspots = 2;
      for (let h = 0; h < hotspots; h++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        
        // Increase values around the hotspot
        for (let i = Math.max(0, x-2); i <= Math.min(gridSize-1, x+2); i++) {
          for (let j = Math.max(0, y-2); j <= Math.min(gridSize-1, y+2); j++) {
            const distance = Math.sqrt(Math.pow(i - x, 2) + Math.pow(j - y, 2));
            const intensity = Math.max(0, 80 - (distance * 30));
            data[i][j] = Math.min(100, data[i][j] + intensity);
          }
        }
      }
      
      return data;
    };
    
    setHeatData(generateHeatData());
    
    // Update heat data periodically
    const interval = setInterval(() => {
      setHeatData(generateHeatData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Color mapping function
  const getColor = (value: number) => {
    if (value < 20) return 'bg-green-500/30';
    if (value < 40) return 'bg-green-500/60';
    if (value < 60) return 'bg-yellow-500/70';
    if (value < 80) return 'bg-orange-500/80';
    return 'bg-red-500/90';
  };
  
  return (
    <div className={cn("glass-card p-4", className)}>
      <h3 className="text-lg font-medium mb-3">Traffic Congestion Heatmap</h3>
      
      <div className="relative overflow-hidden mb-2">
        <div 
          className="grid gap-1 w-full aspect-square relative overflow-hidden"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {heatData.map((row, rowIndex) => (
            row.map((value, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "rounded-sm transition-colors duration-700 ease-in-out",
                  getColor(value)
                )}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            ))
          ))}
        </div>
        
        {/* Overlay city grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
          {Array(9).fill(0).map((_, i) => (
            <div key={i} className="border border-white/10"></div>
          ))}
        </div>
        
        {/* Overlay main roads */}
        <div className="absolute inset-0 pointer-events-none flex items-center">
          <div className="w-full h-[2px] bg-white/20"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none flex justify-center">
          <div className="h-full w-[2px] bg-white/20"></div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-green-500/60"></div>
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-yellow-500/70"></div>
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-red-500/90"></div>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
