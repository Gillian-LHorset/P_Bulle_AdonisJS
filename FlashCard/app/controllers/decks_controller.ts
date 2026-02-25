import Card from '#models/card';
import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper';

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
    .where('user_id', auth.user.id)
    .orderBy('created_at', 'desc');

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
  async store({ request }: HttpContext) {
    const {title, description} = await request.validateUsing() //TODO : store les données dans la db
  }


  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = await Deck.query()
    .where('id', params.id)
    .firstOrFail()
    
    const cards = await Card.query()
    .where('deck_id', params.id)
    .orderBy('created_at', 'desc');


    return view.render('pages/decks/show', { title: "FlashCard - " + deck.title, deck, cards })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  //async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
