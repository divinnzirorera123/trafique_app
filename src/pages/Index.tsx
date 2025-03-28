
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import StatCard from '@/components/dashboard/StatCard';
import TrafficFlowChart from '@/components/dashboard/TrafficFlowChart';
import AirQualityGauge from '@/components/dashboard/AirQualityGauge';
import IncidentCard, { Incident } from '@/components/dashboard/IncidentCard';
import PublicTransportStatus from '@/components/dashboard/PublicTransportStatus';
import HeatMap from '@/components/dashboard/HeatMap';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Wind, AlertTriangle, Train } from 'lucide-react';

const incidents: Incident[] = [
  {
    id: '1',
    type: 'accident',
    location: 'Main St & 5th Ave',
    time: '10:24 AM',
    severity: 'high',
  },
  {
    id: '2',
    type: 'congestion',
    location: 'Highway 101, North',
    time: '09:15 AM',
    severity: 'medium',
  },
  {
    id: '3',
    type: 'construction',
    location: 'Central Park West',
    time: '08:30 AM',
    severity: 'low',
  },
];

const Dashboard = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('Dashboard');
  }, [setTitle]);
  
  return (
    <div className="space-y-6">
      <div className="dashboard-stats">
        <StatCard 
          title="Total Traffic Volume" 
          value="24,853"
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 12, isUpward: true }}
        />
        <StatCard 
          title="Average Air Quality Index" 
          value="64"
          icon={<Wind className="h-5 w-5" />}
          trend={{ value: 8, isUpward: false }}
        />
        <StatCard 
          title="Active Incidents" 
          value="7"
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: 2, isUpward: true }}
        />
        <StatCard 
          title="Public Transport Delays" 
          value="3"
          icon={<Train className="h-5 w-5" />}
          trend={{ value: 1, isUpward: false }}
        />
      </div>
      
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 chart-container">
          <TrafficFlowChart />
        </div>
        <div className="w-full xl:w-96 glass-card p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">AI Insights</h3>
            <Badge className="bg-accent">Smart Analysis</Badge>
          </div>
          
          <div className="glass-panel p-3 mb-3 text-sm">
            <p className="font-medium mb-1 text-primary">Traffic Forecast</p>
            <p className="text-muted-foreground">
              Expect heavy congestion on Highway 101 between 4-6 PM due to ongoing construction and 
              a 28% increase in commuter traffic.
            </p>
          </div>
          
          <div className="glass-panel p-3 mb-3 text-sm">
            <p className="font-medium mb-1 text-primary">Air Quality Alert</p>
            <p className="text-muted-foreground">
              PM2.5 levels rising in downtown area. Air quality forecasted to 
              deteriorate by 15% in the next 6 hours. Consider rerouting traffic.
            </p>
          </div>
          
          <div className="glass-panel p-3 text-sm">
            <p className="font-medium mb-1 text-primary">Optimization Suggestion</p>
            <p className="text-muted-foreground">
              Reconfiguring traffic signal timing at Central & Main intersection could 
              reduce wait times by up to 32% during peak hours.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5 flex flex-col">
          <h3 className="text-lg font-medium mb-4">Air Quality Metrics</h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <AirQualityGauge 
              value={42} 
              max={100} 
              title="PM2.5" 
              unit="μg/m³"
              color="hsl(var(--info))"  
            />
            <AirQualityGauge 
              value={78} 
              max={100} 
              title="CO2" 
              unit="ppm"
              color="hsl(var(--accent))"  
            />
            <AirQualityGauge 
              value={35} 
              max={100} 
              title="O3" 
              unit="ppb" 
              color="hsl(var(--primary))" 
            />
            <AirQualityGauge 
              value={58} 
              max={100} 
              title="NOx" 
              unit="ppb"
              color="hsl(var(--warning))"  
            />
          </div>
        </div>
        
        <div className="glass-card p-5 flex flex-col">
          <h3 className="text-lg font-medium mb-4">Recent Incidents</h3>
          <div className="space-y-3 flex-1">
            {incidents.map(incident => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </div>
        
        <div className="glass-card p-5 flex flex-col">
          <div className="flex-1 grid grid-rows-2 gap-4">
            <HeatMap />
            <PublicTransportStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
