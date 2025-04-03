import React, { useState } from "react"; 
import "./App.css";

// İkon importları (Kendi yollarınıza göre güncelleyin)
import airplaneIcon from "./img/airplane.png";
import hotelIcon from "./img/hotel.png";
import interviewIcon from "./img/interview.png";
import cutleryIcon from "./img/cutlery.png";
import shoppingIcon from "./img/shopping-cart (2).png";
import logo from "./img/logo.png";
const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("");

  const handleScenarioClick = (scenario: string) => {
    setSelectedScenario(scenario);
    console.log(`Scenario selected: ${scenario}`);
    // Senaryoya özel diğer işlemleri buraya ekleyebilirsiniz.
  };

  return (
    <div className="container">
      <header className="header">
    
        <h1>  <img src={logo} alt="Logo" className="logo-icon" />SpeakRight</h1>
      </header>

      <div className="main-content">
        {/* Chat Section (70%) */}
        <div className="chat-section">
          <div className="chat-history">
            <div className="message assistant-message">
              <div className="message-text">
                Welcome to SpeakRight! How can I assist you today?
              </div>
            </div>
            <div className="message user-message">
              <div className="message-text">
                I want to practice my English pronunciation.
              </div>
              <div className="suggested-correction">
                Suggested correction: practice
              </div>
            </div>
            <div className="message assistant-message">
              <div className="message-text">
                Sure! Let's start with some basic phrases. Please say: "How is the weather today?"
              </div>
            </div>
          </div>

          <div className="input-container">
            <input 
              type="text" 
              className="message-input"
              placeholder="Type or speak your message..." 
            />
            <button className="send-button">Send</button>
          </div>
        </div>

        {/* Side Panel (30%) */}
        <div className="side-panel">
          <div className="scenario-buttons">
            <h3>Scenarios</h3>
            <table className="scenario-table">
              <tbody>
                {/* Üst satır (3 buton) */}
                <tr>
                  <td>
                    <button 
                      className="scenario-btn" 
                      onClick={() => handleScenarioClick("Hotel Check-in")}
                    >
                      <img src={hotelIcon} alt="Hotel" className="scenario-icon" />
                      <span>Hotel Check-in</span>
                    </button>
                  </td>
                  <td>
                    <button 
                      className="scenario-btn" 
                      onClick={() => handleScenarioClick("Job Interview")}
                    >
                      <img src={interviewIcon} alt="Interview" className="scenario-icon" />
                      <span>Job Interview</span>
                    </button>
                  </td>
                  <td>
                    <button 
                      className="scenario-btn" 
                      onClick={() => handleScenarioClick("Airport")}
                    >
                      <img src={airplaneIcon} alt="Airport" className="scenario-icon" />
                      <span>Airport</span>
                    </button>
                  </td>
                </tr>
                
                {/* Alt satır (2 buton) */}
                <tr>
                  <td colSpan={3} className="centered-cell">
                    <div className="center-buttons">
                      <button 
                        className="scenario-btn" 
                        onClick={() => handleScenarioClick("Restaurant")}
                      >
                        <img src={cutleryIcon} alt="Restaurant" className="scenario-icon" />
                        <span>Restaurant</span>
                      </button>
                      <button 
                        className="scenario-btn" 
                        onClick={() => handleScenarioClick("Supermarket")}
                      >
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
            <h3>Voice Recording</h3>
            <div className="voice-animation">
              <div className={`sound-wave ${isRecording ? 'active' : ''}`}>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
              <button 
                className={`record-button ${isRecording ? 'recording' : ''}`}
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? '⏹' : '⏺'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
