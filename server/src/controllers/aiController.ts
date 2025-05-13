import { Request, Response } from "express";
import { askAI } from "../services/aiService";
import { hotelScenario } from "../scenarios/hotelScenario";

export const chatWithScenario = async (req: Request, res: Response) => {
  const { message, scenario } = req.body;

  try {
    const prompt = getScenarioPrompt(scenario);
    const reply = await askAI(message, prompt);
    res.json({ reply });
  } catch (error) {
    console.error("AI Hatası:", error);
    res.status(500).json({ error: "AI ile bağlantı kurulamadı." });
  }
};

function getScenarioPrompt(scenario: string): string {
  switch (scenario) {
    case "Hotel Check-in":
   
      return JSON.stringify(hotelScenario);
    default:
      return "You are a helpful English conversation partner.";
  }
}
