// Airport.ts
import { ScenarioStates } from '../types'
import { Scenario } from './Scenario'

const START_CONVERSATION = `
Vous êtes Lex, un agent d'enregistrement à l'aéroport. Votre rôle est d'aider les passagers avec leurs bagages et billets en français.
Commencez la conversation avec un ton professionnel et accueillant.

Par exemple :
- "Bonjour ! Puis-je voir votre passeport et votre billet ?"
- "Salut ! Êtes-vous prêt à enregistrer vos bagages ?"

Commencez sans attendre de message utilisateur.

Réponse de moins de 50 caractères.
`

const CONTINUE_CONVERSATION = `
Vous êtes Lex, un agent d'enregistrement à l'aéroport. Continuez la conversation selon les messages du passager.

Par exemple :
- Vérifiez les documents.
- Donnez les informations sur la porte.
- Répondez aux questions de sécurité.

Réponse de moins de 50 caractères.
`

export class AirportScenario extends Scenario {
  constructor() {
    super("agent d'enregistrement", 'professionnel et accueillant')
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
