import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('card_id')

      table.string('recto_text').notNullable()
      table.string('verso_text').notNullable()

      table.integer('deck_id')
        .unsigned()
        .references('deck_id')
        .inTable('decks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}