
import { RefreshCcw, Train, Bus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TransportRoute {
  id: string;
  name: string;
  type: 'bus' | 'train';
  status: 'on-time' | 'delayed' | 'cancelled';
  delay?: number;
  occupancy: number;
}

const routes: TransportRoute[] = [
  { id: '1', name: 'Blue Line', type: 'train', status: 'on-time', occupancy: 65 },
  { id: '2', name: 'Route 42', type: 'bus', status: 'delayed', delay: 8, occupancy: 82 },
  { id: '3', name: 'Express A', type: 'train', status: 'on-time', occupancy: 45 },
  { id: '4', name: 'Route 15', type: 'bus', status: 'on-time', occupancy: 35 },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case 'on-time': return 'text-success';
    case 'delayed': return 'text-warning';
    case 'cancelled': return 'text-destructive';
    default: return '';
  }
};

const getOccupancyLevel = (occupancy: number) => {
  if (occupancy < 50) return { color: 'bg-success', text: 'Low' };
  if (occupancy < 80) return { color: 'bg-warning', text: 'Medium' };
  return { color: 'bg-destructive', text: 'High' };
};

const PublicTransportStatus = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Public Transport Status</h3>
        <RefreshCcw className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
      </div>
      
      <div className="flex flex-col gap-4 overflow-auto">
        {routes.map((route) => (
          <div key={route.id} className="glass-card p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {route.type === 'train' ? 
                  <Train className="h-5 w-5 text-primary" /> : 
                  <Bus className="h-5 w-5 text-primary" />
                }
                <span className="font-medium">{route.name}</span>
              </div>
              <div className={cn("text-sm font-medium", getStatusColor(route.status))}>
                {route.status.toUpperCase()}
                {route.delay && ` (${route.delay} min)`}
              </div>
            </div>
            
            <div className="mb-1 flex justify-between text-xs">
              <span>Occupancy</span>
              <span>{route.occupancy}%</span>
            </div>
            
            <Progress 
              value={route.occupancy} 
              className={cn("h-2", getOccupancyLevel(route.occupancy).color)} 
            />
            
            <div className="mt-1 text-xs text-right text-muted-foreground">
              {getOccupancyLevel(route.occupancy).text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicTransportStatus;
