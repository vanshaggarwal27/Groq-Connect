import React from 'react';
import { Mic, Globe, Settings } from 'lucide-react';
import { useStore } from '../store/store';

const Header: React.FC = () => {
  const { isRecording, processingStatus } = useStore();
  
  return (
    <header className="bg-slate-900 border-b border-slate-700 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-blue-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Groq Multilingual Meeting Assistant
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm text-gray-300">{processingStatus}</span>
          </div>
          
          <button className="p-2 rounded-full hover:bg-slate-700 transition-colors">
            <Settings className="h-5 w-5 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;