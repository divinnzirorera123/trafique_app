
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import PublicTransportStatus from '@/components/dashboard/PublicTransportStatus';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { 
  Train, 
  Bus, 
  Calendar, 
  Filter, 
  Map, 
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  AlertTriangle,
  Bike,
  Info
} from 'lucide-react';

// Sample data
const transportUsage = [
  { day: 'Mon', bus: 4200, train: 5800, bike: 1200 },
  { day: 'Tue', bus: 4100, train: 5600, bike: 1150 },
  { day: 'Wed', bus: 4300, train: 5750, bike: 1250 },
  { day: 'Thu', bus: 4350, train: 5900, bike: 1300 },
  { day: 'Fri', bus: 4500, train: 6300, bike: 1400 },
  { day: 'Sat', bus: 2800, train: 4200, bike: 1800 },
  { day: 'Sun', bus: 2400, train: 3800, bike: 1700 },
];

const onTimePerformance = [
  { hour: '06:00', bus: 92, train: 96 },
  { hour: '08:00', bus: 78, train: 85 },
  { hour: '10:00', bus: 88, train: 92 },
  { hour: '12:00', bus: 90, train: 94 },
  { hour: '14:00', bus: 92, train: 95 },
  { hour: '16:00', bus: 72, train: 82 },
  { hour: '18:00', bus: 68, train: 78 },
  { hour: '20:00', bus: 86, train: 92 },
];

const transportModeShare = [
  { name: 'Bus', value: 35 },
  { name: 'Train', value: 42 },
  { name: 'Bike Share', value: 8 },
  { name: 'Walking', value: 15 },
];

const routePerformance = [
  { 
    route: 'Blue Line', 
    type: 'train',
    onTime: 92, 
    ridership: { current: 4250, target: 5000 },
    satisfaction: 85,
  },
  { 
    route: 'Route 42', 
    type: 'bus',
    onTime: 78, 
    ridership: { current: 2800, target: 3500 },
    satisfaction: 72,
  },
  { 
    route: 'Express A', 
    type: 'train',
    onTime: 95, 
    ridership: { current: 3850, target: 4000 },
    satisfaction: 88,
  },
  { 
    route: 'Route 15', 
    type: 'bus',
    onTime: 82, 
    ridership: { current: 2100, target: 2500 },
    satisfaction: 76,
  },
  { 
    route: 'Red Line', 
    type: 'train',
    onTime: 88, 
    ridership: { current: 4800, target: 5500 },
    satisfaction: 82,
  },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--info))', 'hsl(var(--accent))', 'hsl(var(--warning))'];

const Transport = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();
  const [timeRange, setTimeRange] = useState('today');
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const textColor = isDark ? '#f1f5f9' : '#334155';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  useEffect(() => {
    setTitle('Public Transport');
  }, [setTitle]);

  const getOnTimeColor = (value: number) => {
    if (value >= 90) return 'text-success';
    if (value >= 80) return 'text-warning';
    return 'text-destructive';
  };

  const getSatisfactionColor = (value: number) => {
    if (value >= 85) return 'bg-success';
    if (value >= 75) return 'bg-warning';
    return 'bg-destructive';
  };

  const getRouteIcon = (type: string) => {
    return type === 'train' ? 
      <Train className="h-4 w-4 text-primary" /> : 
      <Bus className="h-4 w-4 text-info" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Public Transport Dashboard</h1>
          <p className="text-muted-foreground">Monitor and optimize city-wide public transportation</p>
        </div>
        
        <div className="flex gap-2 items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Map className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Ridership Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38,542</div>
            <div className="flex items-center text-sm text-success pt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 
              <span>8% from last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <div className="flex items-center text-sm text-destructive pt-1">
              <ArrowDownRight className="h-4 w-4 mr-1" /> 
              <span>3% below target</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <div className="flex items-center text-sm text-muted-foreground pt-1">
              <Users className="h-4 w-4 mr-1" /> 
              <span>185 buses, 60 trains</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Service Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-sm text-warning pt-1">
              <AlertTriangle className="h-4 w-4 mr-1" /> 
              <span>1 major disruption</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Ridership by Mode</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transportUsage}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke={textColor} 
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <YAxis
                  stroke={textColor}
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    borderColor: isDark ? '#333' : '#ccc',
                    color: textColor 
                  }} 
                />
                <Legend />
                <Bar 
                  dataKey="bus" 
                  name="Bus" 
                  fill="hsl(var(--info))" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="train" 
                  name="Train" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="bike" 
                  name="Bike Share" 
                  fill="hsl(var(--accent))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transport Mode Share</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transportModeShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {transportModeShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#1c1c1c' : '#fff',
                      borderColor: isDark ? '#333' : '#ccc',
                      color: textColor 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {transportModeShare.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="text-sm">{item.name}: {item.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>On-Time Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={onTimePerformance}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis 
                  dataKey="hour" 
                  stroke={textColor} 
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <YAxis
                  stroke={textColor}
                  tick={{ fill: textColor, fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'On-Time Percentage']}
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    borderColor: isDark ? '#333' : '#ccc',
                    color: textColor 
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="bus" 
                  name="Bus" 
                  stroke="hsl(var(--info))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--info))", r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--info))", strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="train" 
                  name="Train" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
                <line
                  x1="0%"
                  y1="90%"
                  x2="100%"
                  y2="90%"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Route Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routePerformance.map(route => (
                <div key={route.route} className="glass-card p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      {getRouteIcon(route.type)}
                      <span className="font-medium">{route.route}</span>
                    </div>
                    <div className={cn("text-sm font-medium", getOnTimeColor(route.onTime))}>
                      {route.onTime}% On-Time
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>Ridership</span>
                        <span>{Math.round(route.ridership.current / route.ridership.target * 100)}%</span>
                      </div>
                      <Progress 
                        value={Math.round(route.ridership.current / route.ridership.target * 100)}
                        className="h-2 bg-secondary" 
                      />
                      <div className="mt-1 text-xs text-muted-foreground">
                        {route.ridership.current} of {route.ridership.target} target
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>Satisfaction</span>
                        <span>{route.satisfaction}%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full", getSatisfactionColor(route.satisfaction))} 
                          style={{ width: `${route.satisfaction}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-right text-muted-foreground">
                        {route.satisfaction >= 85 ? "Good" : route.satisfaction >= 75 ? "Average" : "Needs Improvement"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Tabs defaultValue="realtime">
                <div className="flex justify-between items-center">
                  <CardTitle>Service Status</CardTitle>
                  <TabsList>
                    <TabsTrigger value="realtime">Real-time</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </CardHeader>
            <CardContent>
              <PublicTransportStatus />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                <span>Service Disruptions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="glass-card p-4 border-l-4 border-destructive mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-destructive">Major</Badge>
                  <h3 className="font-medium">Red Line Delay</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Signal problems causing 20-25 minute delays between Central Station and North Terminal.
                </p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Timer className="h-3 w-3 mr-1" />
                    Started 45 min ago
                  </span>
                  <span className="flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Est. resolution: 2 hours
                  </span>
                </div>
              </div>
              
              <div className="glass-card p-4 border-l-4 border-warning mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-warning">Minor</Badge>
                  <h3 className="font-medium">Route 42 Detour</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Construction on Main St requiring temporary detour. Expect 5-10 minute additional travel time.
                </p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Timer className="h-3 w-3 mr-1" />
                    Started 2 hours ago
                  </span>
                  <span className="flex items-center">
                    <Map className="h-3 w-3 mr-1" />
                    5 stops affected
                  </span>
                </div>
              </div>
              
              <div className="glass-card p-4 border-l-4 border-info">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-info">Info</Badge>
                  <h3 className="font-medium">Blue Line Schedule Change</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Additional service added during evening hours to accommodate downtown event.
                </p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Effective today only
                  </span>
                  <span className="flex items-center">
                    <Train className="h-3 w-3 mr-1" />
                    10-minute frequency
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            <span>Transport Optimization Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-info">Prediction</Badge>
                <h3 className="font-medium">Demand Forecast</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                AI predicts 22% higher ridership on Route 42 tomorrow due to downtown event.
                Recommending 4 additional buses between 5-8 PM to maintain service quality.
              </p>
            </div>
            
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-success">Optimization</Badge>
                <h3 className="font-medium">Route Efficiency</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Optimizing Express A route with one fewer stop could improve on-time performance by 8% 
                while affecting only 3% of riders. Recommended implementation date: next month.
              </p>
            </div>
            
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary flex items-center gap-1">
                  <Bike className="h-3 w-3" />
                  <span>Multimodal</span>
                </Badge>
                <h3 className="font-medium">Bike Integration</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Adding bike share stations at West Side and Central Station terminals could reduce bus ridership 
                during peak hours by up to 12%, improving overall system capacity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transport;
