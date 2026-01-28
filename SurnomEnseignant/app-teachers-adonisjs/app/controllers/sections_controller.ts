import Section from '#models/section'
import { sectionsValidator } from '#validators/section'
import type { HttpContext } from '@adonisjs/core/http'

export default class SectionsController {
  async show({ view }: HttpContext) {
    const sections = await Section.query()

    return view.render('pages/sections/show.edge', { title: 'Affichage des sections', sections })
  }

  async create({ view }: HttpContext) {
    const sections = await Section.query()

    return view.render('pages/sections/create', { title: "Ajout d'une section", sections })
  }

  async destroy({ params, session, response }: HttpContext) {
    const section = await Section.findOrFail(params.id)

    await section.delete()

    session.flash('success', `La section ${section.name} a été supprimé avec succès !`)

    return response.redirect().toRoute('home')
  }

  async store({ request, session, response }: HttpContext) {
    const { name } = await request.validateUsing(sectionsValidator)

    // Création du nouvel enseignant
    const sections = await Section.create({
      name,
    })

    // Afficher un message à l'utilisateur
    session.flash(
      'success',
      `Le nouvel enseignant ${sections.name}
      ${sections.name} a été ajouté avec succès !`
    )
    // Rediriger vers la homepage
    return response.redirect().toRoute('sections.show')
  }
}
