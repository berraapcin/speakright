// components/VoiceChat.tsx
import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import axios from "axios";

interface VoiceChatProps {
  selectedScenario: string;
  onNewMessage: (sender: string, text: string) => void;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ selectedScenario, onNewMessage }) => {
  const [isListening, setIsListening] = useState(false);
  const { speak } = useSpeechSynthesis();
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript && isListening) {
      handleSend(transcript);
      setIsListening(false);
    }
  }, [listening]);

  const handleStartRecording = () => {
    resetTranscript();
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: false, language: "en-US" });
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    onNewMessage("user", text);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: text,
        scenario: selectedScenario,
      });

      const reply = response.data.reply;

      onNewMessage("assistant", reply);

      speak({ text: reply }); // AI'nin sesli konuşması
    } catch (error) {
      console.error("AI error:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={handleStartRecording}>
        🎤 {isListening ? "Listening..." : "Speak"}
      </button>
      {transcript && isListening && <p>📝 {transcript}</p>}
    </div>
  );
};

export default VoiceChat;
