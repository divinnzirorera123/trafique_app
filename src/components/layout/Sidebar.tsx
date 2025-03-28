
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Wind, 
  AlertTriangle, 
  Train, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Dashboard',
      path: '/',
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: 'Traffic Flow',
      path: '/traffic',
    },
    {
      icon: <Wind className="h-5 w-5" />,
      label: 'Air Quality',
      path: '/air-quality',
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: 'Incidents',
      path: '/incidents',
    },
    {
      icon: <Train className="h-5 w-5" />,
      label: 'Public Transport',
      path: '/transport',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      path: '/settings',
    },
  ];

  return (
    <aside className={cn(
      "h-screen sticky top-0 z-30 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <div className={cn("flex items-center gap-2 overflow-hidden", collapsed && "opacity-0 w-0")}>
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">SC</span>
          </div>
          <span className="font-semibold whitespace-nowrap">Smart City</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "sidebar-menu-item",
              location.pathname === item.path && "active"
            )}
          >
            {item.icon}
            <span className={cn("transition-opacity", 
              collapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      
      <div className={cn(
        "p-4 border-t border-sidebar-border mt-auto",
        collapsed ? "text-center" : ""
      )}>
        <div className={cn(
          "flex items-center gap-2",
          collapsed && "justify-center"
        )}>
          <div className="h-8 w-8 bg-sidebar-accent rounded-full flex items-center justify-center">
            <span className="text-sidebar-accent-foreground font-medium">CD</span>
          </div>
          <div className={cn("flex flex-col overflow-hidden", 
            collapsed && "opacity-0 w-0 hidden"
          )}>
            <span className="text-sm font-medium">City Admin</span>
            <span className="text-xs text-muted-foreground">admin@smartcity.gov</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
