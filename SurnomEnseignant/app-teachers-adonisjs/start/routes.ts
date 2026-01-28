/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SectionsController from '#controllers/sections_controller'
import TeachersController from '#controllers/teachers_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [TeachersController, 'index']).as('home')

router.get('/teacher/:id/show', [TeachersController, 'show']).as('teacher.show')

router.delete('/teacher/:id/destroy', [TeachersController, 'destroy']).as('teacher.destroy')

router.get('/teacher/add', [TeachersController, 'create']).as('teacher.create')

router.post('/teacher/add', [TeachersController, 'store']).as('teacher.store')

// Route permettant d'afficher le formulaire permettant la mise à jour d'un enseignant
router.get('/teacher/:id/edit', [TeachersController, 'edit']).as('teacher.edit')

// Route permettant la modification de l'enseignant
router.put('/teacher/:id/update', [TeachersController, 'update']).as('teacher.update')

router.get('/sections', [SectionsController, 'show']).as('sections.show')

router.get('/sections/add', [SectionsController, 'create']).as('sections.create')

router.post('/sections/add', [SectionsController, 'store']).as('sections.store')

router.delete('/sections/:id/destroy', [SectionsController, 'destroy']).as('sections.destroy')
