
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Incident {
  id: string;
  type: 'accident' | 'congestion' | 'construction' | 'event';
  location: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
}

interface IncidentCardProps {
  incident: Incident;
  className?: string;
}

const IncidentCard = ({ incident, className }: IncidentCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low': return 'data-pill-info';
      case 'medium': return 'data-pill-warning';
      case 'high': return 'data-pill-error';
      default: return 'data-pill-info';
    }
  };
  
  const getIncidentIcon = (type: string) => {
    switch(type) {
      case 'accident': return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'congestion': return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'construction': return <AlertTriangle className="h-5 w-5 text-info" />;
      case 'event': return <AlertTriangle className="h-5 w-5 text-accent" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  const getIncidentTitle = (type: string) => {
    switch(type) {
      case 'accident': return 'Traffic Accident';
      case 'congestion': return 'Heavy Congestion';
      case 'construction': return 'Road Construction';
      case 'event': return 'Public Event';
      default: return 'Incident';
    }
  };
  
  return (
    <div className={cn("glass-card p-4", className)}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 items-center">
          {getIncidentIcon(incident.type)}
          <h3 className="font-medium">{getIncidentTitle(incident.type)}</h3>
        </div>
        <div className={cn("data-pill", getSeverityColor(incident.severity))}>
          {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <p>{incident.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <p>{incident.time}</p>
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;
