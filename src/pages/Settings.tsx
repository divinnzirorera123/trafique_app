
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Settings = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('Settings');
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Settings Page</h1>
        <p className="text-muted-foreground mt-2">
          This page will contain app preferences, notifications, and user configuration options.
        </p>
      </div>
    </div>
  );
};

export default Settings;
