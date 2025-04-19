import React from 'react';
import { useEffect } from 'react';
import { useStore } from './store/store';
import Header from './components/Header';
import MeetingSpace from './components/MeetingSpace';
import ControlPanel from './components/ControlPanel';
import TranscriptPanel from './components/TranscriptPanel';

function App() {
  const { initializeApp } = useStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 md:w-2/3 p-4">
          <MeetingSpace />
        </div>
        <div className="md:w-1/3 bg-slate-800 flex flex-col">
          <ControlPanel />
          <TranscriptPanel />
        </div>
      </main>
    </div>
  );
}

export default App;