import React from "react";

interface Props {
  isRecording: boolean;
  toggleRecording: () => void;
}

const VoiceSection: React.FC<Props> = ({ isRecording, toggleRecording }) => (
  <div className="voice-section">
    <div>
      <button>Commencer le jeu de rôle</button>
    </div>
    <div className="voice-animation">
      <div className={`sound-wave ${isRecording ? "active" : ""}`}>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <button className={`record-button ${isRecording ? "recording" : ""}`} onClick={toggleRecording}>
        {isRecording ? "⏹" : "⏺"}
      </button>
    </div>
  </div>
);

export default VoiceSection;
