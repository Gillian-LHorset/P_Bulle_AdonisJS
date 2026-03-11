import Categorie from '#models/categorie'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    Categorie.createMany([{ name: 'Géoraphie' }, { name: 'test' }])
  }
}
