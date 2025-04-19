export interface GroqResponse {
  id: string;
  content: string;
  created: number;
}

export interface TranscriptionResult {
  text: string;
  confidence: number;
  languageCode: string;
}

export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

export interface SpeechRecognitionError {
  error: string;
  message: string;
}

export interface MeetingSummary {
  keyPoints: string[];
  actionItems: string[];
  duration: number;
  participantCount: number;
}

export interface VisualContent {
  description: string;
  objects: string[];
  textContent?: string;
}