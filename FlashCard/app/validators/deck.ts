import Deck from '#models/deck'
import vine from '@vinejs/vine'
// using MetaData for transmet the id of the user
const registerDeckValidator = vine.withMetaData<{ userId: number }>().compile(
  vine.object({
    title: vine.string().minLength(2).unique(async (db, value, field) => {
        const currentUserId = field.meta.userId
        
        const existingDeck = await Deck.query()
          .where('title', value)
          .where('userId', currentUserId)
          .first()
        
        return existingDeck === null 
      }),
    description: vine.string().minLength(10),
    categorieId: vine.number(),
  })
)

export { registerDeckValidator }
