
import { Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-background/80 backdrop-blur-md border-b">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-accent">
              3
            </Badge>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
