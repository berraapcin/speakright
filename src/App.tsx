import React, { useState } from "react";
import "./App.css";
import VoiceAnimation from "./VoiceVisualizer";
import airplaneIcon from "./img/airplane.png";
import hotelIcon from "./img/hotel.png";
import interviewIcon from "./img/interview.png";
import cutleryIcon from "./img/cutlery.png";
import shoppingIcon from "./img/shopping-cart (2).png";
import logo from "./img/logo.png";
import axios from "axios"; 
import VoiceChat from "./VoiceChat";
const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);

  const handleScenarioClick = (scenario: string) => {
    setSelectedScenario(scenario);
    console.log(`Scenario selected: ${scenario}`);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim() || !selectedScenario) {
      alert("Please select a scenario and type a message.");
      return;
    }


    setChatHistory(prev => [...prev, { sender: "user", text: userMessage }]);

    try {
      const response = await axios.post("http://localhost:3001/chat", {
        message: userMessage,
        scenario: selectedScenario,
      });

      const aiReply = response.data.reply;

      // AI cevabını ekle
      setChatHistory(prev => [...prev, { sender: "user", text: userMessage }, { sender: "assistant", text: aiReply }]);
      
      setUserMessage(""); // input'u temizle
    } catch (error) {
      console.error("Chat error:", error);
      alert("An error occurred while connecting to the AI.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-title">
          <img src={logo} alt="Logo" className="logo-icon" />
          <h1>SpeakRight</h1>
        </div>
      </header>

      <div className="main-content">
        {/* Chat Section */}
        <div className="chat-section">
          <div className="chat-history">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "assistant" ? "assistant-message" : "user-message"}`}>
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="message-input"
              placeholder="Type or speak your message..."
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <div className="scenario-buttons">
            <h3>Scenarios</h3>
            <table className="scenario-table">
              <tbody>
                <tr>
                  <td>
                    <button className="scenario-btn" onClick={() => handleScenarioClick("Hotel Check-in")}>
                      <img src={hotelIcon} alt="Hotel" className="scenario-icon" />
                      <span>Hotel Check-in</span>
                    </button>
                  </td>
                  <td>
                    <button className="scenario-btn" onClick={() => handleScenarioClick("Job Interview")}>
                      <img src={interviewIcon} alt="Interview" className="scenario-icon" />
                      <span>Job Interview</span>
                    </button>
                  </td>
                  <td>
                    <button className="scenario-btn" onClick={() => handleScenarioClick("Airport")}>
                      <img src={airplaneIcon} alt="Airport" className="scenario-icon" />
                      <span>Airport</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="centered-cell">
                    <div className="center-buttons">
                      <button className="scenario-btn" onClick={() => handleScenarioClick("Restaurant")}>
                        <img src={cutleryIcon} alt="Restaurant" className="scenario-icon" />
                        <span>Restaurant</span>
                      </button>
                      <button className="scenario-btn" onClick={() => handleScenarioClick("Supermarket")}>
                        <img src={shoppingIcon} alt="Supermarket" className="scenario-icon" />
                        <span>Supermarket</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="voice-section">
            <div className="voice-animation">
              <div className={`sound-wave ${isRecording ? "active" : ""}`}>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
              <button
                className={`record-button ${isRecording ? "recording" : ""}`}
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? "⏹" : "⏺"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
