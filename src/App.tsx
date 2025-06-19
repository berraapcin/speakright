// App.tsx
import React, { useState } from "react";
import "./App.css";
import airplaneIcon from "./img/airplane.png";
import hotelIcon from "./img/hotel.png";
import interviewIcon from "./img/interview.png";
import cutleryIcon from "./img/cutlery.png";
import shoppingIcon from "./img/shopping-cart (2).png";
import logo from "./img/logo.png";
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
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR"; // French voice
    window.speechSynthesis.speak(utterance);
  };

  const handleScenarioClick = async (scenario: string) => {
    setSelectedScenario(scenario);
    setChatHistory([]);
    console.log(`Scenario selected: ${scenario}`);

    try {
      const response = await axios.post("http://localhost:3001/converse/text", {
        scenarioName: scenario,
        text: "",
      });

      const aiReply = response.data.frenchText || `Bonjour ! Scénario: ${scenario}`;

      setChatHistory([{ sender: "assistant", text: aiReply }]);
      speak(aiReply);
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

      setChatHistory((prev) => [
        ...prev,
        { sender: "assistant", text: `🇫🇷 ${aiFrench}\n🇬🇧 ${aiEnglish}` },
      ]);

      setUserMessage("");
      speak(aiFrench);
    } catch (error) {
      console.error("Chat error:", error);
      alert("An error occurred while connecting to the AI.");
    }
  };

  const handleNewVoiceMessage = (message: { user: string; aiFrench: string; aiEnglish: string; audio: string }) => {
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: message.user },
      { sender: "assistant", text: `🇫🇷 ${message.aiFrench}\n🇬🇧 ${message.aiEnglish}` },
    ]);

    speak(message.aiFrench);
  };

  return (
      <div className="container">
      <Header />
      <div className="main-content">
        <div className="chat-section">
          <ChatHistory chatHistory={chatHistory} />
          <MessageInput userMessage={userMessage} setUserMessage={setUserMessage} onSend={handleSendMessage} />
          {selectedScenario && (
            <VoiceChat selectedScenario={selectedScenario} onNewMessage={handleNewVoiceMessage} isRecording={isRecording} />
          )}
        </div>
        <div className="side-panel">
          <ScenarioSelector onSelectScenario={handleScenarioClick} />
          <VoiceSection isRecording={isRecording} toggleRecording={() => setIsRecording(!isRecording)} />
        </div>
      </div>
    </div>
  );
};

export default App;
