import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Deck.createMany([
      { deckId: 1, title: 'hello world', description: 'révisez vos hello world' },
      { deckId: 2, title: 'goodbye world', description: 'révisez vos goodbye world' },
    ])
  }
}
