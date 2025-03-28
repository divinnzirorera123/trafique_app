
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Eye, 
  Layout, 
  Lock, 
  User, 
  Clock,
  PieChart,
  LineChart,
  BarChart,
  LayoutGrid,
  Save,
  AlertTriangle,
  RefreshCcw,
  Wind,
  Train,
  BarChart2
} from 'lucide-react';

const Settings = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();
  const [notifications, setNotifications] = useState({
    incidents: true,
    traffic: true,
    airQuality: true,
    publicTransport: false,
    systemUpdates: true,
    weeklyReports: true
  });
  
  const [visualization, setVisualization] = useState({
    animatedCharts: true,
    darkModeCharts: true,
    highContrast: false,
    compactView: false,
    autoRefresh: true,
    showAIInsights: true,
    detailedTooltips: true
  });
  
  const [dataPrefs, setDataPrefs] = useState({
    refreshInterval: '5m',
    defaultTimeRange: 'today',
    trafficDataPrecision: 'medium',
    aiInsightFrequency: 'high',
    defaultMapView: 'traffic'
  });

  useEffect(() => {
    setTitle('Settings');
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Settings</h1>
          <p className="text-muted-foreground">Configure your Smart City Dashboard experience</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      <Tabs defaultValue="display">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="display">
            <Eye className="mr-2 h-4 w-4" />
            Display
          </TabsTrigger>
          <TabsTrigger value="data">
            <PieChart className="mr-2 h-4 w-4" />
            Data
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="layout">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>
                  Configure how data and visualizations are displayed in your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Animated Charts</div>
                      <div className="text-sm text-muted-foreground">
                        Enable smooth animations for charts and graphs
                      </div>
                    </div>
                    <Switch 
                      checked={visualization.animatedCharts} 
                      onCheckedChange={(checked) => setVisualization({...visualization, animatedCharts: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Dark Mode Charts</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically adjust chart colors for dark mode
                      </div>
                    </div>
                    <Switch 
                      checked={visualization.darkModeCharts} 
                      onCheckedChange={(checked) => setVisualization({...visualization, darkModeCharts: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">High Contrast Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Increase contrast for better accessibility
                      </div>
                    </div>
                    <Switch 
                      checked={visualization.highContrast} 
                      onCheckedChange={(checked) => setVisualization({...visualization, highContrast: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Compact View</div>
                      <div className="text-sm text-muted-foreground">
                        Condense dashboard elements to show more content
                      </div>
                    </div>
                    <Switch 
                      checked={visualization.compactView} 
                      onCheckedChange={(checked) => setVisualization({...visualization, compactView: checked})} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Chart Style</div>
                      <div className="text-sm text-muted-foreground">
                        Choose your preferred default chart style
                      </div>
                    </div>
                    <Select defaultValue="modern">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="colorful">Colorful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Default Chart Type</div>
                      <div className="text-sm text-muted-foreground">
                        Select the default visualization type
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="group data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-state="active">
                        <LineChart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="group data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <BarChart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="group data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <PieChart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  Adjust settings for better accessibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Screen Reader Support</div>
                    <div className="text-sm text-muted-foreground">
                      Optimize charts and visuals for screen readers
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Text Size</div>
                    <div className="text-sm text-muted-foreground">
                      Adjust the size of text throughout the dashboard
                    </div>
                  </div>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Data Settings */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Preferences</CardTitle>
                <CardDescription>
                  Configure how data is collected, refreshed, and displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Auto Refresh</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically refresh dashboard data
                      </div>
                    </div>
                    <Switch 
                      checked={visualization.autoRefresh} 
                      onCheckedChange={(checked) => setVisualization({...visualization, autoRefresh: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Refresh Interval</div>
                      <div className="text-sm text-muted-foreground">
                        How often to refresh dashboard data
                      </div>
                    </div>
                    <Select 
                      value={dataPrefs.refreshInterval} 
                      onValueChange={(value) => setDataPrefs({...dataPrefs, refreshInterval: value})}
                    >
                      <SelectTrigger className="w-[180px]">
                        <Clock className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1m">Every minute</SelectItem>
                        <SelectItem value="5m">Every 5 minutes</SelectItem>
                        <SelectItem value="10m">Every 10 minutes</SelectItem>
                        <SelectItem value="30m">Every 30 minutes</SelectItem>
                        <SelectItem value="1h">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Default Time Range</div>
                      <div className="text-sm text-muted-foreground">
                        Default time period for data display
                      </div>
                    </div>
                    <Select 
                      value={dataPrefs.defaultTimeRange} 
                      onValueChange={(value) => setDataPrefs({...dataPrefs, defaultTimeRange: value})}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Show AI Insights</div>
                      <div className="text-sm text-muted-foreground">
                        Display AI-generated insights and recommendations
                      </div>
                    </div>
                    <Switch 
                      checked={visualization.showAIInsights} 
                      onCheckedChange={(checked) => setVisualization({...visualization, showAIInsights: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">AI Insight Frequency</div>
                      <div className="text-sm text-muted-foreground">
                        How often AI should generate new insights
                      </div>
                    </div>
                    <Select 
                      value={dataPrefs.aiInsightFrequency} 
                      onValueChange={(value) => setDataPrefs({...dataPrefs, aiInsightFrequency: value})}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Daily)</SelectItem>
                        <SelectItem value="medium">Medium (Hourly)</SelectItem>
                        <SelectItem value="high">High (Real-time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Traffic Data Precision</div>
                      <div className="text-sm text-muted-foreground">
                        Level of detail for traffic flow data
                      </div>
                    </div>
                    <Select 
                      value={dataPrefs.trafficDataPrecision} 
                      onValueChange={(value) => setDataPrefs({...dataPrefs, trafficDataPrecision: value})}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select precision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Save bandwidth)</SelectItem>
                        <SelectItem value="medium">Medium (Balanced)</SelectItem>
                        <SelectItem value="high">High (Detailed)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reset to Default Preferences
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Storage</CardTitle>
                <CardDescription>
                  Manage how data is stored and cached locally
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Cache Data Locally</div>
                    <div className="text-sm text-muted-foreground">
                      Store data locally for offline viewing
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Local Storage Limit</div>
                    <div className="text-sm text-muted-foreground">
                      Maximum amount of data to store locally
                    </div>
                  </div>
                  <Select defaultValue="100">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50 MB</SelectItem>
                      <SelectItem value="100">100 MB</SelectItem>
                      <SelectItem value="250">250 MB</SelectItem>
                      <SelectItem value="500">500 MB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" className="w-full">
                  Clear Local Cache (12.4 MB used)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure which notifications you receive and how they are delivered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Incident Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about new traffic incidents
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.incidents} 
                      onCheckedChange={(checked) => setNotifications({...notifications, incidents: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Traffic Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Receive updates on significant traffic changes
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.traffic} 
                      onCheckedChange={(checked) => setNotifications({...notifications, traffic: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Air Quality Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Be alerted when air quality reaches concerning levels
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.airQuality} 
                      onCheckedChange={(checked) => setNotifications({...notifications, airQuality: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Public Transport Disruptions</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about public transport delays or disruptions
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.publicTransport} 
                      onCheckedChange={(checked) => setNotifications({...notifications, publicTransport: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">System Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Notifications about dashboard updates and new features
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.systemUpdates} 
                      onCheckedChange={(checked) => setNotifications({...notifications, systemUpdates: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Weekly Reports</div>
                      <div className="text-sm text-muted-foreground">
                        Receive weekly summary reports
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.weeklyReports} 
                      onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Notification Method</div>
                      <div className="text-sm text-muted-foreground">
                        How you want to receive notifications
                      </div>
                    </div>
                    <Select defaultValue="inapp">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inapp">In-app only</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push notifications</SelectItem>
                        <SelectItem value="all">All methods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Notification Priority</div>
                      <div className="text-sm text-muted-foreground">
                        Minimum priority level to receive notifications
                      </div>
                    </div>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All notifications</SelectItem>
                        <SelectItem value="low">Low and above</SelectItem>
                        <SelectItem value="medium">Medium and above</SelectItem>
                        <SelectItem value="high">High priority only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Layout Settings */}
          <TabsContent value="layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Layout</CardTitle>
                <CardDescription>
                  Customize the layout and appearance of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Default Dashboard</div>
                      <div className="text-sm text-muted-foreground">
                        Choose which dashboard to show on login
                      </div>
                    </div>
                    <Select defaultValue="main">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select dashboard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Dashboard</SelectItem>
                        <SelectItem value="traffic">Traffic Flow</SelectItem>
                        <SelectItem value="air">Air Quality</SelectItem>
                        <SelectItem value="incidents">Incidents</SelectItem>
                        <SelectItem value="transport">Public Transport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Dashboard Density</div>
                      <div className="text-sm text-muted-foreground">
                        Adjust the spacing between dashboard elements
                      </div>
                    </div>
                    <Select defaultValue="comfortable">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="mb-4 text-sm font-medium">Visible Widgets</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                        <span>Traffic Flow Charts</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-muted-foreground" />
                        <span>Air Quality Metrics</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span>Incident Reporting</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Train className="h-4 w-4 text-muted-foreground" />
                        <span>Public Transport Status</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layout className="h-4 w-4 text-muted-foreground" />
                        <span>AI Insights Panel</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  Reset to Default Layout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">admin@smartcity.gov</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium">Role</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Administrator</span>
                      <Badge className="bg-primary">Pro</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium">Password</div>
                    <div className="text-sm text-muted-foreground">Last changed 45 days ago</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col space-y-2">
                  <Button variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                  <Button variant="outline">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage API keys and access for integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">API Key</div>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      ••••••••••••••••••••••••••••••
                    </code>
                    <Button variant="outline" size="sm">
                      Show
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last used 3 days ago from 192.168.1.1
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Enable API Access</div>
                      <div className="text-sm text-muted-foreground">
                        Allow external applications to access your dashboard data
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="destructive" className="w-full">
                  Reset All Settings to Default
                </Button>
                <Button variant="outline" className="w-full text-destructive border-destructive">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
