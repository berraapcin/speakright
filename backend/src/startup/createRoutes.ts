import { Router, Request, Response } from 'express'
import multer from 'multer'
import { AudioToTextService } from '../services/AudioToTextService'
import { ConversationService } from '../services/ConversationService'
import { readFileSync } from 'fs'
import path from 'path'

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.mp3'
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`
    cb(null, filename)
  },
})

const upload = multer({ storage })

export const createRoutes = (clients: any) => {
  const router = Router()
  const apiKey = process.env.AUDIO_API_KEY || ''
  const audioToTextService = new AudioToTextService(apiKey)
  const conversationService = new ConversationService(clients)

router.post('/converse/audio', upload.single('audio'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send({ error: 'No audio file uploaded' })
    return
  }

  try {
    const audioFilePath = req.file.path
    const scenarioName = req.body.scenarioName

    const transcribedText = await audioToTextService.convertAudioToText(audioFilePath)

    const { audioFilePath: responseAudioPath, text, translation } =
      await conversationService.converse(scenarioName, [
        { role: 'user', content: transcribedText },
      ])

    const absolutePath = path.join(__dirname, '..', 'clients', responseAudioPath)
    const audioFile = readFileSync(absolutePath)

    res.setHeader('Content-Type', 'application/json')
    res.send({
      audio: audioFile.toString('base64'),
      frenchText: text,
      englishText: translation,
      audioFilePath: responseAudioPath,
      userText: transcribedText 
    })
  } catch (error) {
    console.error('Error in /converse/audio:', error)
    res.status(500).send({ error: 'Failed to process audio' })
  }
})


  router.post('/converse/text', async (req: Request, res: Response) => {
    try {
      const scenarioName = req.body.scenarioName
      const userText = req.body.text || 'hello'

      const { audioFilePath: responseAudioPath, text, translation } =
        await conversationService.converse(scenarioName, [
          { role: 'user', content: userText },
        ])

      const absolutePath = path.join(__dirname, '..', 'clients', responseAudioPath)
      const audioFile = readFileSync(absolutePath)

      res.setHeader('Content-Type', 'application/json')
      res.send({
        audio: audioFile.toString('base64'),
        frenchText: text,
        englishText: translation,
        audioFilePath: responseAudioPath,
      })
    } catch (error) {
      console.error('Error in /converse/text:', error)
      res.status(500).send({ error: 'Failed to generate response' })
    }
  })

  return router
}
