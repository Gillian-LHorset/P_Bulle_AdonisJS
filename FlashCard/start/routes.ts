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

router.get('/mydecks', [DecksController, 'showmydecks']).as('my-decks').use(middleware.auth())

router.get('/decks/show/:id', [DecksController, 'show']).as('decks.show').use(middleware.auth())

router.get('/decks/add', [DecksController, 'create']).as('decks.create').use(middleware.auth())

router.get('/login', [AuthController, 'login_index']).as('auth.login').use(middleware.guest())

router.post('/login', [AuthController, 'login']).as('auth.login-post').use(middleware.guest())

router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())

router.get('/register', [AuthController, 'register_index']).as('auth.register').use(middleware.guest())

router.post('/register', [AuthController, 'register']).as('auth.register-post').use(middleware.guest())
