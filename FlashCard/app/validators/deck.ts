import Deck from '#models/deck'
import vine from '@vinejs/vine'
// using MetaData for transmet the id of the user
const registerDeckValidator = vine.withMetaData<{ userId: number }>().compile(
  vine.object({
    title: vine
      .string()
      .minLength(2)
      .unique(async (db, value, field) => {
        const currentUserId = field.meta.userId
        const existingDeck = await Deck.query()
          .where('title', value)
          .where('userId', currentUserId)
          .first()

        // return if the deck exist
        return existingDeck === null
      }),
    description: vine.string().minLength(10),
    categorieId: vine.number(),
  })
)

const modifyDeckValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(2),
    description: vine.string().minLength(10),
    categorie_id: vine.number(),
  })
)

export { registerDeckValidator, modifyDeckValidator }
