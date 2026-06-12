

import React from 'react';
import ReputationView from './views/ReputationView';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="w-full max-w-[1600px] mx-auto">
        <ReputationView />
      </div>
    </div>
  );
};

export default App;