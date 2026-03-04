import vine from '@vinejs/vine'
const registerDeckValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(2),
    description: vine.string().minLength(10),
  })
)

export { registerDeckValidator }
