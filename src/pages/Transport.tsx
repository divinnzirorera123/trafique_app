
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Transport = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('Public Transport');
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Public Transport Page</h1>
        <p className="text-muted-foreground mt-2">
          This page will contain detailed public transport tracking, scheduling, and optimization tools.
        </p>
      </div>
    </div>
  );
};

export default Transport;
