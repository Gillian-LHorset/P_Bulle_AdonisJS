import Card from '#models/card'
import Categorie from '#models/categorie'
import Deck from '#models/deck'
import User from '#models/user'
import { registerDeckValidator } from '#validators/deck'
import { Redirect, type HttpContext } from '@adonisjs/core/http'
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
    return view.render('pages/decks/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!

    const { title, description } = await request.validateUsing(registerDeckValidator)

    const deck = await Deck.create({ title, description, userId: user.id })

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

  async editView({ params, view }: HttpContext) {
    const deck = await Deck.query().where('id', params.id).preload('catego').firstOrFail()

    const categories = await Categorie.query()

    return view.render('pages/decks/edit', { title: 'FlashCard - ', deck, categories })
  }

  /**
   * Edit individual record
   */
  async edit({ params, request }: HttpContext) {
    const data = request.all()

    return { post: { id: params.id, ...data } }
  }

  /**
   * Handle form submission for the edit action
   */
  //async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
