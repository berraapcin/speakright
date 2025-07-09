
# SpeakRight

**SpeakRight** is an AI-powered language learning app that helps users practice French through interactive roleplay. Whether you're preparing for a hotel check-in, a job interview, or ordering at a restaurant, SpeakRight allows you to simulate real-life conversations with AI in both voice and text format.

---

## ✨ Features

-  **Scenario Selection**: Choose from real-life scenarios like hotel check-in, job interview, airport, restaurant, and more.
-  **Start Role Play**: Once you select a scenario and click "Start Role Play", the AI responds **with voice** and **text**.
-  **Chat Interface**: All AI responses are displayed in the chat window along with their **English translations** underneath.
-  **Voice Interaction**: Speak to the AI using your microphone.
- **Text-Based Messaging**: Prefer typing? You can send text messages instead of using your voice.
-  **Audio Playback**: AI responses are also played aloud using text-to-speech.
-  **Multimodal Support**: Voice input and typed input are both supported and flexible.

---

## Preview

Here’s what the interface looks like:

![SpeakRight Preview](./img/speakright-preview.png)

---

## 🧰 Technologies Used

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **AI/LLM API**: OpenRouter API (DeepSeek model)
- **Text-to-Speech**: gTTS or AssemblyAI
- **Translation**: Integrated French–English responses
- **Env Config**: dotenv for API keys & environment management

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/speakright.git
cd speakright
```

### 2. Install dependencies (backend)

```bash
cd backend
npm install
```

### 3. Run the development server

```bash
npm run dev
```

---

## Usage Flow

1. **Select a Scenario**  
   Choose one of the predefined scenarios from the right panel.

2. **Click "Start Role Play"**  
   The AI greets you in French, and the greeting is displayed in the chat with its English translation below. The audio of the response is also played.

3. **Continue Conversation**  
   - You can **talk using your microphone**, and the AI will respond in French with translation and voice.
   - Or, you can **type your message** and click **Send**. The AI will respond just like in the voice mode.

---


