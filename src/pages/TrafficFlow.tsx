
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
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
import { Separator } from '@/components/ui/separator';
import { BarChart2, Clock, Filter, Map, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import HeatMap from '@/components/dashboard/HeatMap';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

// Sample Data
const hourlyTrafficData = [
  { hour: '00:00', volume: 240, speed: 65 },
  { hour: '02:00', volume: 180, speed: 70 },
  { hour: '04:00', volume: 150, speed: 72 },
  { hour: '06:00', volume: 320, speed: 55 },
  { hour: '08:00', volume: 720, speed: 30 },
  { hour: '10:00', volume: 580, speed: 42 },
  { hour: '12:00', volume: 460, speed: 48 },
  { hour: '14:00', volume: 500, speed: 45 },
  { hour: '16:00', volume: 680, speed: 35 },
  { hour: '18:00', volume: 780, speed: 28 },
  { hour: '20:00', volume: 450, speed: 50 },
  { hour: '22:00', volume: 320, speed: 62 },
];

const roadSegmentData = [
  { name: 'Main Highway', congestion: 78, speed: 32, volume: 980 },
  { name: 'Downtown', congestion: 85, speed: 24, volume: 1250 },
  { name: 'North Bridge', congestion: 45, speed: 52, volume: 650 },
  { name: 'East Expressway', congestion: 35, speed: 65, volume: 720 },
  { name: 'South Boulevard', congestion: 68, speed: 38, volume: 850 },
  { name: 'West Access Road', congestion: 42, speed: 58, volume: 690 },
];

const weeklyTrends = [
  { day: 'Mon', volume: 5800, congestion: 62 },
  { day: 'Tue', volume: 5600, congestion: 58 },
  { day: 'Wed', volume: 5750, congestion: 61 },
  { day: 'Thu', volume: 5900, congestion: 65 },
  { day: 'Fri', volume: 6300, congestion: 72 },
  { day: 'Sat', volume: 4200, congestion: 45 },
  { day: 'Sun', volume: 3800, congestion: 38 },
];

const TrafficFlow = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();
  const [timeRange, setTimeRange] = useState('today');
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const textColor = isDark ? '#f1f5f9' : '#334155';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  useEffect(() => {
    setTitle('Traffic Flow');
  }, [setTitle]);

  const getStatusColor = (congestion: number) => {
    if (congestion < 50) return 'text-success';
    if (congestion < 70) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusText = (congestion: number) => {
    if (congestion < 50) return 'Flowing';
    if (congestion < 70) return 'Moderate';
    return 'Congested';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Traffic Flow Analysis</h1>
          <p className="text-muted-foreground">Detailed city-wide traffic patterns and congestion metrics</p>
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
            <CardTitle className="text-sm font-medium">Current Traffic Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,853</div>
            <div className="flex items-center text-sm text-success pt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 
              <span>12% from yesterday</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 mph</div>
            <div className="flex items-center text-sm text-destructive pt-1">
              <ArrowDownRight className="h-4 w-4 mr-1" /> 
              <span>8% from usual</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Congestion Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <div className="flex items-center text-sm text-destructive pt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 
              <span>15% above baseline</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Traffic Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex items-center text-sm text-warning pt-1">
              <Clock className="h-4 w-4 mr-1" /> 
              <span>3 active incidents</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              <span>Hourly Traffic Flow</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="volume">
              <TabsList className="mb-4">
                <TabsTrigger value="volume">Volume</TabsTrigger>
                <TabsTrigger value="speed">Speed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="volume" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={hourlyTrafficData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis 
                      dataKey="hour" 
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
                    <Bar 
                      dataKey="volume" 
                      name="Vehicle Volume" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="speed" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={hourlyTrafficData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
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
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDark ? '#1c1c1c' : '#fff',
                        borderColor: isDark ? '#333' : '#ccc',
                        color: textColor 
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="speed" 
                      name="Average Speed (mph)" 
                      stroke="hsl(var(--info))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--info))", r: 4 }}
                      activeDot={{ r: 6, stroke: "hsl(var(--info))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Traffic Congestion Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <HeatMap />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Road Segment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roadSegmentData.map((segment) => (
                <div key={segment.name} className="glass-card p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{segment.name}</div>
                    <div className={cn("text-sm font-medium", getStatusColor(segment.congestion))}>
                      {getStatusText(segment.congestion)}
                    </div>
                  </div>
                  
                  <div className="mb-1 flex justify-between text-xs">
                    <span>Congestion</span>
                    <span>{segment.congestion}%</span>
                  </div>
                  
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full", 
                        segment.congestion < 50 ? "bg-success" : 
                        segment.congestion < 70 ? "bg-warning" : "bg-destructive"
                      )} 
                      style={{ width: `${segment.congestion}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Speed:</span>
                      <span className="ml-1">{segment.speed} mph</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="ml-1">{segment.volume} vehicles</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Weekly Traffic Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyTrends}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis 
                  dataKey="day" 
                  stroke={textColor} 
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <YAxis
                  yAxisId="left"
                  stroke={textColor}
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
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
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="volume" 
                  name="Vehicle Volume" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary)/0.2)" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="congestion" 
                  name="Congestion %" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--destructive))", r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Traffic Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-info">Prediction</Badge>
                <h3 className="font-medium">Rush Hour Forecast</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on current patterns, evening rush hour is predicted to be 22% heavier than normal today.
                Consider implementing dynamic lane management on Main Highway between 4-6 PM.
              </p>
            </div>
            
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-warning">Alert</Badge>
                <h3 className="font-medium">Unusual Congestion</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Downtown area is showing unusually high congestion for this time of day.
                Nearby construction and a scheduled event at the convention center are likely causes.
              </p>
            </div>
            
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-success">Optimization</Badge>
                <h3 className="font-medium">Signal Timing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                AI suggests optimizing traffic signal timing at 5 key intersections which could reduce
                wait times by up to 18% during peak hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficFlow;
