import Card from '#models/card'
import vine from '@vinejs/vine'
const registerCardValidator = vine.withMetaData<{ deckId: number }>().compile(
  vine.object({
    rectoText: vine.string().minLength(2).unique(async (db, value, field) => {
            const currentDeckId = field.meta.deckId
            
            const existingDeck = await Card.query()
              .where('rectoText', value)
              .where('deckId', currentDeckId)
              .first()
            
            return existingDeck === null 
          }),
    versoText: vine.string().minLength(2),
  })
)

export { registerCardValidator }
