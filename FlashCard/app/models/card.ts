import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, } from '@adonisjs/lucid/orm'
import Deck from './deck.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare cardId: number

  @column()
  declare rectoText: string

  @column()
  declare versoText: string

  // foreignKey
  @column()
  declare deckId: number

  // link to the deckId
  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}