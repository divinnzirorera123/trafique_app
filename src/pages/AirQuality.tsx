
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const AirQuality = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('Air Quality');
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Air Quality Page</h1>
        <p className="text-muted-foreground mt-2">
          This page will contain detailed air quality measurements, trends, and predictions.
        </p>
      </div>
    </div>
  );
};

export default AirQuality;
