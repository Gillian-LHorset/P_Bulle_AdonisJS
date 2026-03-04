import vine from '@vinejs/vine'

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(4),
    password: vine.string().minLength(2),
  })
)

const registerUserValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(4)
      .alphaNumeric()
      .unique(async (db, value) => {
        const users = await db.from('users').where('username', value).first()
        return !users
      }),
    password: vine.string().minLength(2),
  })
)

export { loginUserValidator, registerUserValidator }
