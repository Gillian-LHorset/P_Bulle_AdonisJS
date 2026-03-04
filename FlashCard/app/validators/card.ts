import vine from '@vinejs/vine'
const registerCardValidator = vine.compile(
  vine.object({
    rectoText: vine.string().minLength(2),
    versoText: vine.string().minLength(2),
  })
)

export { registerCardValidator }
