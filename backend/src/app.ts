
//backend/app.ts
import express from 'express'
import dotenv from 'dotenv'
import { Clients } from './types'
import { createResources } from './startup/createResources'
import { createRoutes } from './startup/createRoutes'
import cors from 'cors'
import path from 'path'

dotenv.config()

const run = async () => {
  const app = express()

  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }))

app.use('/audio', express.static(path.join(__dirname, 'clients', 'audio')))


  const clients: Clients = await createResources()

  app.use(express.json())
  app.use(createRoutes(clients))

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}

run()