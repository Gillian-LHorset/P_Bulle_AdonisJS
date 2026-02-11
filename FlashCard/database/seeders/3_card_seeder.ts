import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Card from '#models/card'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Card.createMany([
      { cardId: 1, rectoText: 'hello', versoText: 'world', deckId: 1 },
      { cardId: 2, rectoText: 'bonjour', versoText: 'monde', deckId: 1 },
      { cardId: 3, rectoText: 'guten tag', versoText: 'welt', deckId: 1 },
      { cardId: 4, rectoText: 'goodbye', versoText: 'world', deckId: 2 },
      { cardId: 5, rectoText: 'au revoir', versoText: 'monde', deckId: 2 },
      { cardId: 6, rectoText: 'auf wiedersehen', versoText: 'welt', deckId: 2 },
    ])
  }
}
