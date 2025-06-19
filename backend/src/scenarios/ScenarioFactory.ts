//ScenarioFactory.ts
import { SupermarketScenario } from './Supermarket'
import { RestaurantScenario } from './Restaurant'
import { Scenario } from './Scenario'
import { HotelScenario } from './Hotel'
import { JobInterviewScenario } from './JobInterview'
import { AirportScenario } from './Airport'

export class ScenarioFactory {
  static createScenario(scenario: string): Scenario {
    switch (scenario) {
      case 'supermarket':
        return new SupermarketScenario()
      case 'restaurant':
        return new RestaurantScenario()
      case 'hotel':
        return new HotelScenario()
      case 'jobinterview':
        return new JobInterviewScenario()
      case 'airport':
        return new AirportScenario()
      default:
        throw new Error(`Scenario "${scenario}" not found.`)
    }
  }
}