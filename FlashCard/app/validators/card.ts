import Card from '#models/card'
import { dd } from '@adonisjs/core/services/dumper'
import vine from '@vinejs/vine'
const registerCardValidator = vine.withMetaData<{ deckId: number }>().compile(
  vine.object({
    rectoText: vine
      .string()
      .minLength(2)
      .unique(async (db, value, field) => {
        const currentDeckId = field.meta.deckId

        // check if the card is already present to the current deck
        const existingDeck = await Card.query()
          .where('rectoText', value)
          .where('deckId', currentDeckId)
          .first()

        // retrun if the deck exist
        return existingDeck === null
      }),
    versoText: vine.string().minLength(2),
  })
)

export { registerCardValidator }
