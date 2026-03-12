/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import CardsController from '#controllers/cards_controller'
import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CategoriesController from '#controllers/categories_controller'

router.get('/', [DecksController, 'index']).as('home').use(middleware.guest())

// about decks

// show the list of decks
router.get('/mydecks', [DecksController, 'showmydecks']).as('my-decks').use(middleware.auth())

// show a deck
router.get('/decks/show/:id', [DecksController, 'show']).as('decks.show').use(middleware.auth())

// modify a deck
router.get('/decks/edit/:id', [DecksController, 'edit']).as('decks.edit').use(middleware.auth())

// update a deck
router
  .any('/decks/update/:id', [DecksController, 'update'])
  .as('decks.update')
  .use(middleware.auth()) // le patch ne fonctionne pas mais post arrive à acceder au controller

// add a deck
router.get('/decks/add', [DecksController, 'create']).as('decks.create').use(middleware.auth())

router.post('/decks/add', [DecksController, 'store']).as('decks.store').use(middleware.auth())

// delete a cards
router
  .any('/decks/destroy/:id', [DecksController, 'destroy']) // seul le type any marche
  .use(middleware.auth())
  .as('decks.destroy')

// about card

// add a card
router.get('/cards/add', [CardsController, 'create']).as('cards.create').use(middleware.auth())

router.post('/cards/add', [CardsController, 'store']).as('cards.store').use(middleware.auth())

// delete a cards
router
  .any('/cards/destroy/:id', [CardsController, 'destroy']) // seul le type any marche
  .use(middleware.auth())
  .as('cards.destroy')

// edit view
router.get('/cards/edit/:id', [CardsController, 'edit']).as('cards.edit').use(middleware.auth())

//update a card
router
  .any('/cards/update/:id', [CardsController, 'update']) // .patch ne fonctionne pas mais .any marche
  .as('cards.update')
  .use(middleware.auth())

// about categories

// categories
router.get('/categorie', [CategoriesController, 'show']).as('categorie.show')

// router.any parce que router.delete ne marche pas
router.any('/categorie/destroy/:id', [CategoriesController, 'destroy']).as('categorie.destroy')

router.get('/catergorie/create', [CategoriesController, 'create']).as('categorie.create')

router.post('/catergorie/create', [CategoriesController, 'store']).as('categorie.store')

// about auth

router.get('/login', [AuthController, 'login_index']).as('auth.login').use(middleware.guest())

router.post('/login', [AuthController, 'login']).as('auth.login-post').use(middleware.guest())

router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())

router
  .get('/register', [AuthController, 'register_index'])
  .as('auth.register')
  .use(middleware.guest())

router
  .post('/register', [AuthController, 'register'])
  .as('auth.register-post')
  .use(middleware.guest())
