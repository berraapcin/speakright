import { DeepseekClient } from "../clients/deepseek"
import { GTTSClient } from "../clients/gTTS"
import { Clients } from "../types"
import dotenv from "dotenv"

dotenv.config()

export async function createResources(): Promise<Clients> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing in .env file")
  }

  const deepseekClient = new DeepseekClient(apiKey)
  const gttsClient = new GTTSClient()

  return {
    deepseek: deepseekClient,
    gTTS: gttsClient
  }
}
