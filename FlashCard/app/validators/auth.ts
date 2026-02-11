import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(4),
    password: vine.string().minLength(2),
  })
)

const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(4), // TODO : verifier que le champs est unique dans la db
    password: vine.string().minLength(2),
  })
)

export { loginUserValidator, registerUserValidator }
