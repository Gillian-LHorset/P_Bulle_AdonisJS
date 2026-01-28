import Section from '#models/section'
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
}
