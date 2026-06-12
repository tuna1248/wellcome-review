

import React, { useEffect, useState } from 'react';
import ReputationView from './views/ReputationView';

const App: React.FC = () => {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, []);

  if (hasToken === null) {
    return null; // or a loading spinner
  }

  if (!hasToken) {
    return null; // Sayfa açılmasın
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="w-full max-w-[1600px] mx-auto">
        <ReputationView />
      </div>
    </div>
  );
};

export default App;