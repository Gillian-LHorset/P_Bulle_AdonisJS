import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(4),
    password: vine.string().minLength(2),
  })
)

export { loginUserValidator }
