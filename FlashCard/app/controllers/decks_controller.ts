import Card from '#models/card'
import Categorie from '#models/categorie'
import Deck from '#models/deck'
import { registerDeckValidator } from '#validators/deck'
import {  type HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    return view.render('pages/home')
  }

  async showmydecks({ view, auth }: HttpContext) {
    const decks = await Deck.query()
      .from('decks')
      .where('user_id', auth.user!.id)
      .preload('catego')
      .orderBy('created_at', 'desc')

    return view.render('pages/decks/mydecks', { decks })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const categories = await Categorie.query()
    
    return view.render('pages/decks/create', {categories})
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!

    // validate the data, send the id of the current user for be sure it's don't create 2 decks whith the same title
    const { title, description, categorieId  } = await request.validateUsing(registerDeckValidator, {meta: {userId: user.id}})
    
    await Deck.create({ title, description, userId: user.id, categorieId })

    return response.redirect().toRoute('my-decks')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).firstOrFail()

    const cards = await Card.query().where('deck_id', params.id).orderBy('created_at', 'desc')

    return view.render('pages/decks/show', { title: 'FlashCard - ' + deck.title, deck, cards })
  }

  async edit({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('catego').firstOrFail()

    const categories = await Categorie.query()

    return view.render('pages/decks/edit', { title: 'FlashCard - ', deck, categories })
  }

  /**
   * Edit individual record
   */
  async update({ params, request, response, auth }: HttpContext) {
    const user = auth.user!

    const deckFromForm = await request.validateUsing(registerDeckValidator, {meta: {userId: user.id}})

    const deck = await Deck.query().where('id', params.id).firstOrFail()

    deck.merge(deckFromForm)
    await deck.save()

    return response.redirect().toRoute('home')
  }

  /**
   * Handle form submission for the edit action
   */
  //async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)

    await deck.delete()

    session.flash('success', `La carte a été supprimée avec succès !`)

    return response.redirect().toRoute('home')
  }
}
