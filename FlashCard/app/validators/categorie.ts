import vine from '@vinejs/vine'
const registerCategorieValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
  })
)

export { registerCategorieValidator }
