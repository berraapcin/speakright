
//gTTS.ts
import { existsSync, mkdirSync } from 'fs'
// @ts-ignore
import gTTS from 'gtts'
import { join } from 'path'

export class GTTSClient {
  private language: string

  constructor(language: string = 'fr') {
    this.language = language
  }

  public async convertTextToAudio(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const gtts = new gTTS(text, this.language)

      const audioDir = join(__dirname, 'audio')
      const fileName = `${Date.now()}.mp3`
      const fullPath = join(audioDir, fileName)

      if (!existsSync(audioDir)) {
        mkdirSync(audioDir, { recursive: true })
      }

      gtts.save(fullPath, (err: any) => {
        if (err) {
          console.error('Error converting text to audio:', err)
          reject(err)
        } else {
          console.log('Audio file saved:', fullPath)
          resolve(`audio/${fileName}`) 
        }
      })
    })
  }
}
