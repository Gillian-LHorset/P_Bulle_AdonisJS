import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import User from '#models/user'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AuthController {
  async login_index({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async register_index({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async login({ request, auth, session, response }: HttpContext) {
    const { username, password } = await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user, !!request.input('remember_me'))

    session.flash('success', `L'utilisateur ${user.username} s'est connecté avec succès`)

    return response.redirect().toRoute('home')
  }

  async logout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', "L'utilisateur s'est déconnecté avec succès")

    return response.redirect().toRoute('home')
  }

  async register({ request, auth, session, response }: HttpContext) {
    const {username, password} = await request.validateUsing(registerUserValidator)

    const user = await User.create({username, password})

    await auth.use('web').login(user)

    session.flash("success", "Register complet")
    return response.redirect().toRoute('home')
  }
}
