import React from "react";

interface Message {
  sender: string;
  text: string;
}

interface Props {
  chatHistory: Message[];
}

const ChatHistory: React.FC<Props> = ({ chatHistory }) => (
  <div className="chat-history">
    {chatHistory.map((msg, index) => (
      <div
        key={index}
        className={`message ${msg.sender === "assistant" ? "assistant-message" : "user-message"}`}
      >
        <div className="message-text">{msg.text}</div>
      </div>
    ))}
  </div>
);

export default ChatHistory;
