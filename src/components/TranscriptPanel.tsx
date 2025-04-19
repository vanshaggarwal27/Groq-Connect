import React, { useState } from 'react';
import { MessageSquare, Download, RefreshCw, Languages } from 'lucide-react';
import { useStore } from '../store/store';
import { translateText } from '../services/languageService';

const TranscriptPanel: React.FC = () => {
  const { transcript, participants, clearTranscript, currentLanguage, targetLanguage } = useStore();
  const [selectedText, setSelectedText] = useState('');
  const [translatedSelection, setTranslatedSelection] = useState('');
  
  const getParticipantName = (id: string): string => {
    const participant = participants.find(p => p.id === id);
    return participant ? participant.name : 'Unknown';
  };
  
  const getSentimentColor = (sentiment?: 'positive' | 'neutral' | 'negative'): string => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  const handleDownload = () => {
    const content = transcript.map(entry => (
      `[${new Date(entry.timestamp).toLocaleTimeString()}] ${getParticipantName(entry.participantId)}: ${entry.text}`
    )).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTextSelection = async () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const text = selection.toString().trim();
      setSelectedText(text);
      try {
        const translated = await translateText(text, currentLanguage, targetLanguage);
        setTranslatedSelection(translated);
      } catch (error) {
        console.error('Translation error:', error);
      }
    }
  };
  
  return (
    <div className="flex-1 bg-slate-800 p-4 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
          Transcript
        </h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleDownload}
            className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
            title="Download transcript"
          >
            <Download className="h-4 w-4" />
          </button>
          
          <button 
            onClick={clearTranscript}
            className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
            title="Clear transcript"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {selectedText && translatedSelection && (
        <div className="bg-slate-700 rounded-lg p-3 mb-4 animate-fadeIn">
          <div className="flex items-center mb-2">
            <Languages className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-sm text-gray-300">Translation</span>
          </div>
          <p className="text-sm text-white mb-1">{selectedText}</p>
          <p className="text-sm text-blue-400">{translatedSelection}</p>
        </div>
      )}
      
      <div 
        className="flex-1 overflow-y-auto space-y-4 pr-2"
        onMouseUp={handleTextSelection}
      >
        {transcript.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
            <p className="text-sm">No messages yet</p>
            <p className="text-xs">Start speaking to see transcription</p>
          </div>
        ) : (
          transcript.map((entry) => (
            <div key={entry.id} className="bg-slate-900 rounded-lg p-3 animate-fadeIn">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{getParticipantName(entry.participantId)}</span>
                <span className="text-xs text-gray-500">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              <p className={`text-sm mb-2 ${getSentimentColor(entry.sentiment)}`}>
                {entry.text}
              </p>
              
              {entry.translatedText && (
                <p className="text-sm text-gray-400 border-t border-slate-700 pt-2 mt-2">
                  {entry.translatedText}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TranscriptPanel;