
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Wind, 
  Calendar, 
  Filter, 
  Map, 
  AlertTriangle, 
  Info
} from 'lucide-react';
import AirQualityGauge from '@/components/dashboard/AirQualityGauge';
import { useTheme } from '@/hooks/use-theme';

// Sample Data
const airQualityHistory = [
  { time: '00:00', pm25: 28, co2: 420, o3: 29, nox: 22 },
  { time: '03:00', pm25: 25, co2: 405, o3: 25, nox: 18 },
  { time: '06:00', pm25: 30, co2: 430, o3: 32, nox: 25 },
  { time: '09:00', pm25: 42, co2: 470, o3: 38, nox: 35 },
  { time: '12:00', pm25: 45, co2: 490, o3: 42, nox: 40 },
  { time: '15:00', pm25: 50, co2: 510, o3: 45, nox: 48 },
  { time: '18:00', pm25: 48, co2: 500, o3: 40, nox: 44 },
  { time: '21:00', pm25: 38, co2: 460, o3: 34, nox: 32 },
];

const districtData = [
  { district: 'Downtown', aqi: 78, pm25: 42, o3: 38, nox: 58 },
  { district: 'Westside', aqi: 52, pm25: 28, o3: 25, nox: 32 },
  { district: 'North Hills', aqi: 45, pm25: 24, o3: 22, nox: 28 },
  { district: 'Eastpark', aqi: 85, pm25: 48, o3: 42, nox: 62 },
  { district: 'South Bay', aqi: 63, pm25: 35, o3: 32, nox: 45 },
];

const weeklyAQI = [
  { day: 'Mon', aqi: 62, limit: 100 },
  { day: 'Tue', aqi: 58, limit: 100 },
  { day: 'Wed', aqi: 65, limit: 100 },
  { day: 'Thu', aqi: 72, limit: 100 },
  { day: 'Fri', aqi: 68, limit: 100 },
  { day: 'Sat', aqi: 52, limit: 100 },
  { day: 'Sun', aqi: 48, limit: 100 },
];

const alertsData = [
  { id: 1, time: '09:15 AM', type: 'Warning', message: 'PM2.5 levels exceeding threshold in Eastpark district', status: 'Active' },
  { id: 2, time: '11:30 AM', type: 'Advisory', message: 'Moderate ozone levels expected during afternoon hours', status: 'Active' },
  { id: 3, time: '08:45 AM', type: 'Information', message: 'Air quality improving in Westside following overnight rain', status: 'Resolved' },
  { id: 4, time: 'Yesterday', type: 'Warning', message: 'NOx levels elevated near industrial zone', status: 'Resolved' },
];

const AirQuality = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();
  const [timeRange, setTimeRange] = useState('today');
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const textColor = isDark ? '#f1f5f9' : '#334155';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  useEffect(() => {
    setTitle('Air Quality');
  }, [setTitle]);

  const getAQIColor = (aqi: number) => {
    if (aqi < 50) return 'text-success';
    if (aqi < 70) return 'text-warning';
    return 'text-destructive';
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi < 50) return 'Good';
    if (aqi < 70) return 'Moderate';
    return 'Poor';
  };

  const getAlertColor = (type: string) => {
    switch(type) {
      case 'Warning': return 'bg-destructive';
      case 'Advisory': return 'bg-warning';
      case 'Information': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Air Quality Monitoring</h1>
          <p className="text-muted-foreground">City-wide air quality metrics and pollution trends</p>
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

      {/* Current Air Quality Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AirQualityGauge 
          value={42} 
          max={100} 
          title="PM2.5" 
          unit="μg/m³"
          color="hsl(var(--info))"  
        />
        <AirQualityGauge 
          value={490} 
          max={1000} 
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

      {/* Historical Pollution Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wind className="mr-2 h-5 w-5" />
            <span>Air Quality Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Pollutants</TabsTrigger>
              <TabsTrigger value="pm25">PM2.5</TabsTrigger>
              <TabsTrigger value="o3">Ozone</TabsTrigger>
              <TabsTrigger value="nox">NOx</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={airQualityHistory}
                  margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pm25"
                    name="PM2.5"
                    stroke="hsl(var(--info))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--info))", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="co2"
                    name="CO2"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="o3"
                    name="O3"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nox"
                    name="NOx"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--warning))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="pm25" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={airQualityHistory}
                  margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
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
                  <Line
                    type="monotone"
                    dataKey="pm25"
                    name="PM2.5"
                    stroke="hsl(var(--info))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--info))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            {/* Similar content for other tabs - omitted for brevity */}
            <TabsContent value="o3" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={airQualityHistory}
                  margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="time" stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
                  <YAxis stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
                  <Tooltip contentStyle={{
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    borderColor: isDark ? '#333' : '#ccc',
                    color: textColor
                  }} />
                  <Line
                    type="monotone"
                    dataKey="o3"
                    name="O3"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="nox" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={airQualityHistory}
                  margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="time" stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
                  <YAxis stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
                  <Tooltip contentStyle={{
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    borderColor: isDark ? '#333' : '#ccc',
                    color: textColor
                  }} />
                  <Line
                    type="monotone"
                    dataKey="nox"
                    name="NOx"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--warning))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District AQI Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Air Quality by District</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {districtData.map((district) => (
                <div key={district.district} className="glass-card p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{district.district}</div>
                    <div className={`text-sm font-medium ${getAQIColor(district.aqi)}`}>
                      AQI: {district.aqi} - {getAQIStatus(district.aqi)}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex flex-col text-sm">
                      <span className="text-muted-foreground">PM2.5</span>
                      <span className="font-medium">{district.pm25} μg/m³</span>
                    </div>
                    <div className="flex flex-col text-sm">
                      <span className="text-muted-foreground">O3</span>
                      <span className="font-medium">{district.o3} ppb</span>
                    </div>
                    <div className="flex flex-col text-sm">
                      <span className="text-muted-foreground">NOx</span>
                      <span className="font-medium">{district.nox} ppb</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly AQI Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly AQI Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyAQI}
                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="day" stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
                <YAxis stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1c1c1c' : '#fff',
                    borderColor: isDark ? '#333' : '#ccc',
                    color: textColor
                  }}
                />
                <Bar
                  dataKey="aqi"
                  name="Air Quality Index"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="limit"
                  name="AQI Limit"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span>Air Quality Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alertsData.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell>
                    <Badge className={getAlertColor(alert.type)}>
                      {alert.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>
                    <Badge variant={alert.status === 'Active' ? 'default' : 'outline'}>
                      {alert.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            <span>AI Air Quality Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-info">Forecast</Badge>
                <h3 className="font-medium">24-Hour Prediction</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                PM2.5 levels are predicted to increase by 15% in the Eastpark district tomorrow
                due to forecasted weather patterns and industrial activity.
              </p>
            </div>
            
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-warning">Pattern</Badge>
                <h3 className="font-medium">Traffic Correlation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Analysis shows a strong correlation between rush hour traffic and elevated NOx levels in
                Downtown area. Consider expanding low-emission zones.
              </p>
            </div>
            
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-success">Improvement</Badge>
                <h3 className="font-medium">Green Initiative Impact</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Tree planting initiative in North Hills has contributed to a measurable 8% reduction
                in particulate matter over the past three months.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AirQuality;
