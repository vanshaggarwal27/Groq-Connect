import { create } from 'zustand';
import { getSupportedLanguages } from '../services/languageService';

export interface Participant {
  id: string;
  name: string;
  speaking: boolean;
  language: string;
}

export interface TranscriptEntry {
  id: string;
  participantId: string;
  text: string;
  translatedText: string | null;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface AppState {
  initialized: boolean;
  isRecording: boolean;
  currentLanguage: string;
  targetLanguage: string;
  supportedLanguages: { code: string; name: string }[];
  participants: Participant[];
  transcript: TranscriptEntry[];
  currentMessage: string;
  processingStatus: string;
  
  initializeApp: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  setCurrentLanguage: (code: string) => void;
  setTargetLanguage: (code: string) => void;
  addParticipant: (name: string, language: string) => void;
  removeParticipant: (id: string) => void;
  updateSpeakingStatus: (id: string, speaking: boolean) => void;
  addTranscriptEntry: (participantId: string, text: string) => void;
  clearTranscript: () => void;
  setProcessingStatus: (status: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  initialized: false,
  isRecording: false,
  currentLanguage: 'en-US',
  targetLanguage: 'es-ES',
  supportedLanguages: [],
  participants: [
    { id: '1', name: 'You', speaking: false, language: 'en-US' }
  ],
  transcript: [],
  currentMessage: '',
  processingStatus: 'Ready',
  
  initializeApp: async () => {
    const languages = await getSupportedLanguages();
    set({ 
      supportedLanguages: languages,
      initialized: true 
    });
  },
  
  startRecording: () => set({ isRecording: true }),
  
  stopRecording: () => set({ isRecording: false }),
  
  setCurrentLanguage: (code: string) => set({ currentLanguage: code }),
  
  setTargetLanguage: (code: string) => set({ targetLanguage: code }),
  
  addParticipant: (name: string, language: string) => {
    const { participants } = get();
    set({
      participants: [
        ...participants, 
        { 
          id: Date.now().toString(), 
          name, 
          speaking: false, 
          language 
        }
      ]
    });
  },
  
  removeParticipant: (id: string) => {
    const { participants } = get();
    set({
      participants: participants.filter(p => p.id !== id)
    });
  },
  
  updateSpeakingStatus: (id: string, speaking: boolean) => {
    const { participants } = get();
    set({
      participants: participants.map(p => 
        p.id === id ? { ...p, speaking } : p
      )
    });
  },
  
  addTranscriptEntry: (participantId: string, text: string) => {
    const { transcript } = get();
    set({
      transcript: [
        ...transcript,
        {
          id: Date.now().toString(),
          participantId,
          text,
          translatedText: null,
          timestamp: new Date(),
          sentiment: 'neutral'
        }
      ]
    });
  },
  
  clearTranscript: () => set({ transcript: [] }),
  
  setProcessingStatus: (status: string) => set({ processingStatus: status })
}));