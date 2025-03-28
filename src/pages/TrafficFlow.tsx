
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const TrafficFlow = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('Traffic Flow');
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Traffic Flow Page</h1>
        <p className="text-muted-foreground mt-2">
          This page will contain detailed traffic flow analysis, maps, and forecasts.
        </p>
      </div>
    </div>
  );
};

export default TrafficFlow;
