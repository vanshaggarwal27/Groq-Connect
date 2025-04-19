import React, { useRef, useEffect } from 'react';
import { User, Mic, MicOff, Camera, CameraOff } from 'lucide-react';
import Webcam from 'react-webcam';
import { Participant } from '../store/store';

interface ParticipantTileProps {
  participant: Participant;
  cameraEnabled?: boolean;
  audioEnabled?: boolean;
  stream?: MediaStream | null;
}

const ParticipantTile: React.FC<ParticipantTileProps> = ({ 
  participant, 
  cameraEnabled = false,
  audioEnabled = false,
  stream 
}) => {
  const webcamRef = useRef<Webcam>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && stream) {
      audioRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={`relative bg-slate-700 rounded-lg overflow-hidden aspect-video flex flex-col items-center justify-center shadow-md ${
      participant.speaking ? 'ring-2 ring-blue-400' : ''
    }`}>
      {cameraEnabled && stream ? (
        <Webcam
          ref={webcamRef}
          audio={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/80" />
          <div className="relative z-10 p-4 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-slate-600 flex items-center justify-center">
              <User className="h-8 w-8 text-gray-300" />
            </div>
          </div>
        </>
      )}

      <audio ref={audioRef} autoPlay playsInline hidden />
      
      <div className="absolute top-2 right-2 z-10 flex space-x-2">
        {audioEnabled ? (
          <Mic className="h-4 w-4 text-blue-400" />
        ) : (
          <MicOff className="h-4 w-4 text-gray-400" />
        )}
        {cameraEnabled ? (
          <Camera className="h-4 w-4 text-blue-400" />
        ) : (
          <CameraOff className="h-4 w-4 text-gray-400" />
        )}
      </div>
      
      <div className="absolute bottom-2 left-2 z-10">
        <p className="font-medium text-sm text-white">{participant.name}</p>
        <p className="text-xs text-gray-400">{participant.language}</p>
      </div>
      
      {participant.speaking && (
        <div className="absolute bottom-0 left-0 right-0 h-1">
          <div className="flex justify-center space-x-1 py-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="bg-blue-400 w-1 rounded-full animate-sound-wave"
                style={{ 
                  height: `${Math.random() * 12 + 4}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantTile;