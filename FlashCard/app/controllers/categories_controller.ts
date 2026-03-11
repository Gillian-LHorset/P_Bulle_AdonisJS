import Categorie from '#models/categorie'
import { registerCategorieValidator } from '#validators/categorie'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class CategoriesController {
  async show({ view }: HttpContext) {
    const categories = await Categorie.query()

    return view.render('pages/categories/show', { title: 'FlashCard - Catégories', categories })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/categories/create')
  }

  async store({ request, response, session }: HttpContext) {
    const { name } = await request.validateUsing(registerCategorieValidator)

    await Categorie.create({ name })

    session.flash('success', `La nouvelle catégorie ${name} a été créer avec succès !`)

    return response.redirect().toRoute('categorie.show')
  }

  async edit({ params }: HttpContext) {}

  async destroy({ params, session, response }: HttpContext) {
    const categorie = await Categorie.findOrFail(params.id)

    await categorie.delete()

    session.flash('success', `La catégorie a été supprimé avec succès !`)

    return response.redirect().toRoute('categorie.show')
  }
}
