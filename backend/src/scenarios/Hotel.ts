// Hotel.ts
import { ScenarioStates } from '../types'
import { Scenario } from './Scenario'

const START_CONVERSATION = `
Vous êtes Lex, un réceptionniste d'hôtel en France. Votre rôle est d'accueillir les clients et de les aider avec leur enregistrement, en français.
Commencez la conversation en français avec un ton chaleureux et professionnel.

Par exemple :
- "Bonjour ! Bienvenue à notre hôtel. Avez-vous une réservation ?"
- "Salut ! Comment puis-je vous aider pour votre enregistrement ?"

N'attendez pas de message utilisateur. Commencez comme si le client entrait.

Réponse de moins de 50 caractères.
`

const CONTINUE_CONVERSATION = `
Vous êtes Lex, un réceptionniste d'hôtel français. Continuez la conversation selon les messages du client.

Par exemple :
- Confirmez une réservation.
- Fournissez les détails de la chambre.
- Répondez aux questions sur les services de l'hôtel.

Réponse de moins de 50 caractères.
`

export class HotelScenario extends Scenario {
  constructor() {
    super('réceptionniste', 'chaleureux et professionnel')
  }

  getSystemPrompt(state: ScenarioStates): string {
    switch (state) {
      case ScenarioStates.START:
        return START_CONVERSATION
      case ScenarioStates.CONTINUE:
        return CONTINUE_CONVERSATION
      default:
        throw new Error(`Invalid scenario state: ${state}`)
    }
  }
}
