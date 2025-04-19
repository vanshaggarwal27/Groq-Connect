import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, Send } from 'lucide-react';
import { useStore } from '../store/store';
import ParticipantTile from './ParticipantTile';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MeetingSpace: React.FC = () => {
  const { 
    participants, 
    isRecording, 
    startRecording, 
    stopRecording,
    addTranscriptEntry,
    currentLanguage
  } = useStore();

  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [message, setMessage] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startMedia = useCallback(async (video: boolean = false) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video
      });
      setMediaStream(stream);
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      return null;
    }
  }, []);

  const stopMedia = useCallback(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  }, [mediaStream]);

  const toggleCamera = async () => {
    if (cameraOn) {
      stopMedia();
      setCameraOn(false);
    } else {
      const stream = await startMedia(true);
      if (stream) setCameraOn(true);
    }
  };

  const toggleMic = async () => {
    const newState = !micOn;
    setMicOn(newState);
    
    if (newState) {
      const stream = await startMedia(false);
      if (stream) {
        startRecording();
        if (browserSupportsSpeechRecognition) {
          SpeechRecognition.startListening({ continuous: true, language: currentLanguage });
        }
      }
    } else {
      stopMedia();
      stopRecording();
      if (browserSupportsSpeechRecognition) {
        SpeechRecognition.stopListening();
      }
    }
  };

  const toggleVideo = () => setVideoOn(prev => !prev);

  const handleSendMessage = () => {
    if (message.trim()) {
      addTranscriptEntry('1', message);
      setMessage('');
    }
  };

  useEffect(() => {
    if (transcript) {
      addTranscriptEntry('1', transcript);
      resetTranscript();
    }
  }, [transcript, addTranscriptEntry]);

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-xl p-4 h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {participants.map((participant) => (
          <ParticipantTile 
            key={participant.id} 
            participant={participant}
            cameraEnabled={participant.id === '1' ? cameraOn : false}
            audioEnabled={participant.id === '1' ? micOn : false}
            stream={participant.id === '1' ? mediaStream : null}
          />
        ))}
      </div>
      
      <div className="bg-slate-900 rounded-lg p-4 space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full ${cameraOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'} transition-colors`}
          >
            <Camera className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full ${micOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'} transition-colors`}
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>
          
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${videoOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'} transition-colors`}
          >
            {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingSpace;