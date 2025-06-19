import React from "react";

interface Props {
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}

const MessageInput: React.FC<Props> = ({ userMessage, setUserMessage, onSend }) => (
  <div className="input-container">
    <input
      type="text"
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)}
      className="message-input"
      placeholder="Tapez ou parlez votre message..."
    />
    <button className="send-button" onClick={onSend}>
      Envoyer
    </button>
  </div>
);

export default MessageInput;
