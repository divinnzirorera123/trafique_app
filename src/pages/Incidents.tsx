
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Incidents = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('Incidents');
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Incidents Page</h1>
        <p className="text-muted-foreground mt-2">
          This page will contain detailed incident reports, statistics, and response management.
        </p>
      </div>
    </div>
  );
};

export default Incidents;
