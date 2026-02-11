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

router.get('/', [DecksController, 'index']).as('home')

router.get('/decks/show/:id', [DecksController, 'show']).as('decks.show')

router.get('/decks/add', [DecksController, 'create']).as('decks.create')

router.get('/login', [AuthController, 'login_index']).as('auth.login')

router.post('/login', [AuthController, 'login']).as('auth.login-post')

router.post('/logout', [AuthController, 'logout']).as('auth.logout')
