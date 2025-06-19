import React, { useState } from 'react';

interface VoiceChatProps {
  selectedScenario: string;
  onNewMessage: (message: { user: string; aiFrench: string; aiEnglish: string; audio: string }) => void;
  isRecording: boolean;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ selectedScenario, onNewMessage }) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.start();
      setIsRecording(true);

      recorder.ondataavailable = (e) => setChunks((prev) => [...prev, e.data]);

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.mp3');
        formData.append('scenarioName', selectedScenario);

        try {
          const response = await fetch('http://localhost:3001/converse/audio', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();

          onNewMessage({
            user: '[User voice input]',
            aiFrench: data.frenchText,
            aiEnglish: data.englishText,
            audio: data.audio,
          });

          const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
          audio.play();
        } catch (error) {
          console.error('Error sending audio:', error);
        }

        setChunks([]);
      };

      setMediaRecorder(recorder);
    } catch (err) {
      console.error("Recording permission denied or error:", err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
        {isRecording ? '⏹ Stop Recording' : '🎙 Start Recording'}
      </button>
    </div>
  );
};

export default VoiceChat;
