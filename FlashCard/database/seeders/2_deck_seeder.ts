import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Deck.createMany([
      { id: 1, title: 'hello world', description: 'révisez vos hello world', userId: 1 },
      { id: 2, title: 'goodbye world', description: 'révisez vos goodbye world', userId: 1 },
      { id: 3, title: 'théophile jeu de mot', description: 'révisez vos jeux de mot avec le prénom théophile', userId: 2 },
    ])
  }
}
