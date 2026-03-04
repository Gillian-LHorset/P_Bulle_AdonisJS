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

router.get('/', [DecksController, 'index']).as('home').use(middleware.guest())

// show the list of decks
router.get('/mydecks', [DecksController, 'showmydecks']).as('my-decks').use(middleware.auth())

// show a deck
router.get('/decks/show/:id', [DecksController, 'show']).as('decks.show').use(middleware.auth())

// add a deck
router.get('/decks/add', [DecksController, 'create']).as('decks.create').use(middleware.auth())

router.post('/decks/add', [DecksController, 'store']).as('decks.store').use(middleware.auth())

// add a card
router.get('/cards/add', [CardsController, 'create']).as('cards.create').use(middleware.auth())

router.post('/cards/add', [CardsController, 'store']).as('cards.store').use(middleware.auth())

// delete a card
router
  .delete('/cards/destroy/:id', [CardsController, 'destroy'])
  .as('cards.destroy')
  .use(middleware.auth())

// auth
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
