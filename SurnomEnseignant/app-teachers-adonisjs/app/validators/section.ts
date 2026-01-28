import vine from '@vinejs/vine'

const sectionsValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
  })
)
export { sectionsValidator }
