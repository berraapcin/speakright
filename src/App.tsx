import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import VoiceChat from "./VoiceChat";
import Header from "./components/Header";
import ScenarioSelector from "./components/ScenarioSelect";
import ChatHistory from "./components/ChatHistory";
import MessageInput from "./components/MessageInput";
import VoiceSection from "./components/VoiceSection";

const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: string; text: string; translation?: string }[]
  >([]);

  const playAudioFromPath = async (audioPath: string) => {
    try {
      const audio = new Audio(`http://localhost:3001/${audioPath}`);
      await audio.play();
      console.log("Playing audio:", audio.src);
    } catch (e) {
      console.error("Audio play error:", e);
    }
  };

  const handleScenarioClick = (scenario: string) => {
    setSelectedScenario(scenario);
    setChatHistory([]);
    console.log(`Scenario selected: ${scenario}`);
  };

  const startConversation = async () => {
    if (!selectedScenario) {
      alert("Please select a scenario first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/converse/text", {
        scenarioName: selectedScenario,
        text: "",
      });

const aiReply = response.data.frenchText || `Bonjour ! Scénario: ${selectedScenario}`;
const translation = response.data.englishText;
const audioPath = response.data.audioFilePath?.replace(/\\/g, "/");

setChatHistory([{ sender: "assistant", text: aiReply, translation }]);


      if (audioPath) {
        await playAudioFromPath(audioPath);
      } else {
        console.warn("No audio path received from backend.");
      }
    } catch (error) {
      console.error("Initial AI message error:", error);
      alert("Could not fetch AI message.");
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim() || !selectedScenario) {
      alert("Please select a scenario and type a message.");
      return;
    }

    setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);

    try {
      const response = await axios.post("http://localhost:3001/converse/text", {
        scenarioName: selectedScenario,
        text: userMessage,
      });

      const aiFrench = response.data.frenchText;
      const aiEnglish = response.data.englishText;
      const audioPath = response.data.audioFilePath?.replace(/\\/g, "/");

      setChatHistory((prev) => [
        ...prev,
        { sender: "assistant", text: aiFrench, translation: aiEnglish },
      ]);

      setUserMessage("");

      if (audioPath) {
        await playAudioFromPath(audioPath);
      } else {
        console.warn("No audio path received for user message.");
      }
    } catch (error) {
      console.error("Chat error:", error);
      alert("An error occurred while connecting to the AI.");
    }
  };

  const handleNewVoiceMessage = (message: {
    user: string;
    aiFrench: string;
    aiEnglish: string;
    audio: string;
  }) => {
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: message.user },
      { sender: "assistant", text: message.aiFrench, translation: message.aiEnglish },
    ]);

    try {
      const audio = new Audio(`data:audio/mp3;base64,${message.audio}`);
      audio.play().catch((e) => console.error("Voice audio error:", e));
    } catch (e) {
      console.error("Voice playback failed:", e);
    }
  };

  const handleStartRolePlay = () => {
    startConversation();
  };

  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <div className="chat-section">
          <ChatHistory chatHistory={chatHistory} />
          <MessageInput
            userMessage={userMessage}
            setUserMessage={setUserMessage}
            onSend={handleSendMessage}
          />
          {selectedScenario && (
            <VoiceChat
              selectedScenario={selectedScenario}
              onNewMessage={handleNewVoiceMessage}
              isRecording={isRecording}
            />
          )}
        </div>
        <div className="side-panel">
          <ScenarioSelector onSelectScenario={handleScenarioClick} />
          <VoiceSection
            isRecording={isRecording}
            toggleRecording={() => setIsRecording(!isRecording)}
            startRolePlay={handleStartRolePlay}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
