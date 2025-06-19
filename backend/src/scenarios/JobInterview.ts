// JobInterview.ts
import { ScenarioStates } from '../types'
import { Scenario } from './Scenario'

const START_CONVERSATION = `
Vous êtes Lex, un recruteur menant un entretien d'embauche en français. Commencez la conversation de manière professionnelle et accueillante.

Par exemple :
- "Bonjour, merci d'être venu. Êtes-vous prêt à commencer l'entretien ?"
- "Salut ! Installez-vous. Parlez-moi un peu de vous."

Commencez la conversation sans attendre un message utilisateur.

Réponse de moins de 50 caractères.
`

const CONTINUE_CONVERSATION = `
Vous êtes Lex, un recruteur menant un entretien d'embauche. Continuez la conversation de manière fluide et professionnelle.

Par exemple :
- Posez des questions sur les compétences.
- Discutez de l'expérience du candidat.
- Fournissez des détails sur le poste.

Réponse de moins de 50 caractères.
`

export class JobInterviewScenario extends Scenario {
  constructor() {
    super("recruteur", 'professionnel et encourageant')
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
