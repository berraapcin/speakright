import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

export async function askAI(message: string, prompt: Message[] | string): Promise<string> {
  try {
    const messages: Message[] = Array.isArray(prompt)
      ? [...prompt, { role: "user", content: message }]
      : [
          { role: "system", content: prompt },
          { role: "user", content: message },
        ];

    const response = await openai.chat.completions.create({
      model: "openrouter/deepseek-chat",
      messages,
    });

    return response.choices[0].message.content || "Yanıt alınamadı.";
  } catch (error) {
    console.error("OpenAI Hatası:", error);
    throw error;
  }
}
