import Card from '#models/card'
import Deck from '#models/deck'
import { registerCardValidator } from '#validators/card'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class CardsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const cards = await Card.query().orderBy('createdAt', 'desc')

    return view.render('pages/home', { cards })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/cards/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!

    const { rectoText, versoText } = await request.validateUsing(registerCardValidator)

    const card = await Card.create({ rectoText, versoText, deckId: user.id })

    return response.redirect().toRoute('decks.show', { id: user.id })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const card = await Card.query().where('id', params.id).firstOrFail()

    return view.render('pages/cards/edit', { card })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const cardFromForm = await request.validateUsing(registerCardValidator)

    const card = await Card.query().where('id', params.id).firstOrFail()

    card.merge(cardFromForm)
    await card.save()

    return response.redirect().toRoute('home')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const card = await Card.findOrFail(params.id)

    await card.delete()

    session.flash('success', `La carte a été supprimée avec succès !`)

    return response.redirect().toRoute('home')
  }
}
