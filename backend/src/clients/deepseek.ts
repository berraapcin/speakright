import { ChatCompletionMessageParam } from 'openai/resources'
import OpenAI from 'openai'

export class DeepseekClient {
  private openai: OpenAI

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("❌ DeepseekClient: API key is missing.")
    }

    this.openai = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    })
  }

  public async completion(messages: ChatCompletionMessageParam[]): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528:free', 
        messages,
      })

      const reply = response.choices[0]?.message?.content?.trim()
      if (!reply) {
        console.warn("⚠️ Deepseek response empty or undefined.")
        return "Üzgünüm, şu anda bir yanıt üretemiyorum."
      }

      return reply
    } catch (error: any) {
      console.error("❌ Deepseek API error:")
      if (error.response) {
        console.error("Status:", error.response.status)
        console.error("Data:", error.response.data)
      } else if (error.message) {
        console.error("Message:", error.message)
      } else {
        console.error(error)
      }

      throw new Error("Deepseek AI yanıt oluşturamadı.")
    }
  }
}
