export interface Language {
  code: string;
  name: string;
}

// Supported languages data
const languages: Language[] = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'fr-FR', name: 'French (France)' },
  { code: 'de-DE', name: 'German (Germany)' },
  { code: 'it-IT', name: 'Italian (Italy)' },
  { code: 'ja-JP', name: 'Japanese (Japan)' },
  { code: 'ko-KR', name: 'Korean (South Korea)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ru-RU', name: 'Russian (Russia)' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' }
];

export const getSupportedLanguages = async (): Promise<Language[]> => {
  // In a real app, this would be fetched from an API
  return Promise.resolve(languages);
};

export const translateText = async (
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> => {
  // This would call Groq's translation API in a production app
  // For now, we'll simulate a translation by adding a prefix
  return Promise.resolve(`[Translated from ${sourceLanguage} to ${targetLanguage}] ${text}`);
};

export const detectLanguage = async (text: string): Promise<string> => {
  // This would use Groq's language detection in a production app
  // For now, we'll just return English
  return Promise.resolve('en-US');
};

export const analyzeSentiment = async (text: string): Promise<'positive' | 'neutral' | 'negative'> => {
  // This would use Groq's sentiment analysis in a production app
  // For now, we'll return a random sentiment
  const sentiments = ['positive', 'neutral', 'negative'] as const;
  const randomIndex = Math.floor(Math.random() * 3);
  return Promise.resolve(sentiments[randomIndex]);
};