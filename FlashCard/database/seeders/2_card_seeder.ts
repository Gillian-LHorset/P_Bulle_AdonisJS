import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Card from '#models/card'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Card.createMany([
        {cardId: 1, rectoText: 'hello', versoText: 'world', deckId: 1},
        {cardId: 2, rectoText: 'bonjour', versoText: 'monde', deckId: 1},
        {cardId: 3, rectoText: 'guten tag', versoText: 'welt', deckId: 1}
    ])
  }
}