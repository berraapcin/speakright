import React from "react";
import SpeechWave from "./SpeechWave"; // ✅ yeni bileşeni import et

interface Props {
  isRecording: boolean;
  toggleRecording: () => void;
  startRolePlay: () => void;
}

const VoiceSection: React.FC<Props> = ({ isRecording, toggleRecording, startRolePlay }) => (
  <div className="voice-section">
    <div className="start-roleplay-wrapper">
      <button className="start-roleplay-button" onClick={startRolePlay}>
         Start Role Play
      </button>
    </div>

    <div className="voice-animation">
      <SpeechWave isPlaying={isRecording} /> {/* ✅ Ses dalgalarını göster */}
      <button
        className={`record-button ${isRecording ? "recording" : ""}`}
        onClick={toggleRecording}
      >
        {isRecording ? "⏹" : "⏺"}
      </button>
    </div>
  </div>
);

export default VoiceSection;
