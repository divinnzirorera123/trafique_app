
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import IncidentCard, { Incident } from '@/components/dashboard/IncidentCard';
import {
  AlertTriangle,
  Calendar,
  Clock,
  Filter,
  MapPin,
  Search,
  ArrowUpRight,
  BarChart2,
  PieChart as PieChartIcon,
  Info
} from 'lucide-react';

// Sample data
const activeIncidents: Incident[] = [
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
  {
    id: '4',
    type: 'accident',
    location: 'Broadway & 34th St',
    time: '11:05 AM',
    severity: 'medium',
  },
  {
    id: '5',
    type: 'congestion',
    location: 'East River Bridge',
    time: '08:45 AM',
    severity: 'high',
  },
];

const recentIncidents = [
  { id: 1, time: '10:24 AM', type: 'Accident', location: 'Main St & 5th Ave', severity: 'High', status: 'Active' },
  { id: 2, time: '09:15 AM', type: 'Congestion', location: 'Highway 101, North', severity: 'Medium', status: 'Active' },
  { id: 3, time: '08:30 AM', type: 'Construction', location: 'Central Park West', severity: 'Low', status: 'Active' },
  { id: 4, time: 'Yesterday', type: 'Accident', location: 'Broadway & 34th St', severity: 'Medium', status: 'Resolved' },
  { id: 5, time: 'Yesterday', type: 'Congestion', location: 'East River Bridge', severity: 'High', status: 'Resolved' },
  { id: 6, time: '2 days ago', type: 'Event', location: 'Convention Center', severity: 'Medium', status: 'Resolved' },
  { id: 7, time: '2 days ago', type: 'Construction', location: 'South Boulevard', severity: 'Low', status: 'Resolved' },
];

const incidentsByType = [
  { name: 'Accidents', value: 42 },
  { name: 'Congestion', value: 28 },
  { name: 'Construction', value: 18 },
  { name: 'Events', value: 12 },
];

const incidentsBySeverity = [
  { name: 'Low', value: 35 },
  { name: 'Medium', value: 45 },
  { name: 'High', value: 20 },
];

const incidentsByTime = [
  { time: '6-9 AM', count: 18 },
  { time: '9-12 PM', count: 24 },
  { time: '12-3 PM', count: 16 },
  { time: '3-6 PM', count: 28 },
  { time: '6-9 PM', count: 22 },
  { time: '9-12 AM', count: 12 },
  { time: '12-6 AM', count: 8 },
];

const responseTimeData = [
  { type: 'Accidents', response: 8.5 },
  { type: 'Congestion', response: 12.3 },
  { type: 'Construction', response: 15.8 },
  { type: 'Events', response: 10.2 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--info))', 'hsl(var(--warning))', 'hsl(var(--accent))'];
const SEVERITY_COLORS = ['hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

const Incidents = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();
  const [timeRange, setTimeRange] = useState('today');
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const textColor = isDark ? '#f1f5f9' : '#334155';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  useEffect(() => {
    setTitle('Incidents');
  }, [setTitle]);

  const getSeverityColor = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return '';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-destructive' : 'bg-muted text-muted-foreground';
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Accident': return 'bg-destructive';
      case 'Congestion': return 'bg-warning';
      case 'Construction': return 'bg-info';
      case 'Event': return 'bg-accent';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Incident Management</h1>
          <p className="text-muted-foreground">Track, analyze and respond to city incidents</p>
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="relative w-full md:w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search incidents..."
              className="pl-8"
            />
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
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
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center text-sm text-destructive pt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex items-center text-sm text-muted-foreground pt-1">
              <Clock className="h-4 w-4 mr-1" /> 
              <span>3 require immediate action</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10.2 min</div>
            <div className="flex items-center text-sm text-success pt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 
              <span>15% faster than target</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recurring Hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center text-sm text-warning pt-1">
              <MapPin className="h-4 w-4 mr-1" /> 
              <span>2 high priority locations</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-0">
              <CardTitle>Active Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-4 pr-1" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {activeIncidents.map(incident => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center">
                <PieChartIcon className="mr-2 h-5 w-5" />
                <span>Incidents by Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentsByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {incidentsByType.map((entry, index) => (
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
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              <span>Incidents by Time of Day</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={incidentsByTime}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis 
                  dataKey="time" 
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
                  dataKey="count" 
                  name="Number of Incidents" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Response Time by Incident Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={responseTimeData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  stroke={textColor} 
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="type"
                  stroke={textColor}
                  tick={{ fill: textColor, fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} minutes`, 'Response Time']}
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    borderColor: isDark ? '#333' : '#ccc',
                    color: textColor 
                  }}
                />
                <Bar 
                  dataKey="response" 
                  name="Average Response Time (min)" 
                  fill="hsl(var(--info))" 
                  radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <Tabs defaultValue="all">
              <div className="flex justify-between items-center">
                <CardTitle>Incident History</CardTitle>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>{incident.time}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(incident.type)}>
                        {incident.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{incident.location}</TableCell>
                    <TableCell>
                      <span className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            <span>AI Incident Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-info">Pattern</Badge>
                <h3 className="font-medium">Traffic Pattern Insight</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                AI analysis shows 68% of accidents occur at three specific intersections during peak hours.
                Recommended action: Increase traffic control measures at these locations between 7-9 AM and 4-6 PM.
              </p>
            </div>
            
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-warning">Prediction</Badge>
                <h3 className="font-medium">Upcoming Risk Forecast</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on weather forecasts and historical data, there's a 75% likelihood of increased accident rates
                tomorrow due to predicted precipitation. Recommended: Pre-position emergency response units.
              </p>
            </div>
            
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-success">Optimization</Badge>
                <h3 className="font-medium">Response Efficiency</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Optimizing emergency vehicle routing through AI-powered traffic light control could reduce response
                times by up to 32% in congested areas during peak hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Incidents;
