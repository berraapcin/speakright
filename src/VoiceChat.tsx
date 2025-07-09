import React, { useEffect, useRef, useState } from "react";

interface VoiceChatProps {
  selectedScenario: string;
  onNewMessage: (message: {
    user: string;
    aiFrench: string;
    aiEnglish: string;
    audio: string;
  }) => void;
  isRecording: boolean;
}

const VoiceChat: React.FC<VoiceChatProps> = ({
  selectedScenario,
  onNewMessage,
  isRecording,
}) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: "audio/mp3" });
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.mp3");
          formData.append("scenarioName", selectedScenario);

          try {
            const response = await fetch("http://localhost:3001/converse/audio", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();

            onNewMessage({
              user: data.userText || "[User voice input]",
              aiFrench: data.frenchText,
              aiEnglish: data.englishText,
              audio: data.audio,
            });

            const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
            audio.play().catch((err) => console.error("Playback error:", err));
          } catch (error) {
            console.error("Error sending audio:", error);
          }
        };

        recorder.start();
      } catch (err) {
        console.error("Recording permission denied or error:", err);
      }
    };

    const stopRecording = () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        streamRef.current?.getTracks().forEach((track) => track.stop());
        setMediaRecorder(null);
        streamRef.current = null;
      }
    };

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => {
      stopRecording();
    };
  }, [isRecording, selectedScenario]);

  return null;
};

export default VoiceChat;
