import React, { useState } from 'react';
import { Plus, Languages, Users } from 'lucide-react';
import { useStore } from '../store/store';

const ControlPanel: React.FC = () => {
  const { 
    currentLanguage, 
    targetLanguage, 
    supportedLanguages,
    setCurrentLanguage,
    setTargetLanguage,
    addParticipant
  } = useStore();
  
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [newParticipantLanguage, setNewParticipantLanguage] = useState('en-US');
  
  const handleAddParticipant = () => {
    if (newParticipantName.trim()) {
      addParticipant(newParticipantName, newParticipantLanguage);
      setNewParticipantName('');
      setShowAddParticipant(false);
    }
  };
  
  return (
    <div className="bg-slate-900 border-b border-slate-700 p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium flex items-center">
          <Languages className="h-5 w-5 mr-2 text-purple-400" />
          Language Settings
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">You speak</label>
          <select 
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
          >
            {supportedLanguages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Translate to</label>
          <select 
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
          >
            {supportedLanguages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium flex items-center">
            <Users className="h-5 w-5 mr-2 text-teal-400" />
            Participants
          </h2>
          
          <button 
            onClick={() => setShowAddParticipant(!showAddParticipant)}
            className="text-sm px-2 py-1 rounded flex items-center text-teal-400 hover:bg-slate-800"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
        
        {showAddParticipant && (
          <div className="bg-slate-800 rounded-md p-3 mb-3 animate-fadeIn">
            <input
              type="text"
              placeholder="Participant name"
              value={newParticipantName}
              onChange={(e) => setNewParticipantName(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm mb-2"
            />
            
            <div className="flex space-x-2">
              <select
                value={newParticipantLanguage}
                onChange={(e) => setNewParticipantLanguage(e.target.value)}
                className="flex-1 bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm"
              >
                {supportedLanguages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleAddParticipant}
                className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-md text-sm transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;