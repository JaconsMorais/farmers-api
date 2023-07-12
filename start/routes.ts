/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({
    index: ['auth'],
    show: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })

Route.post('login', 'AuthController.store')
Route.delete('login', 'AuthController.destroy').middleware('auth')
Route.get('login', 'AuthController.index').middleware('auth')

Route.resource('/users/:userId/producers', 'ProducersController')
  .apiOnly()
  .where('userId', Route.matchers.uuid())
  .where('id', Route.matchers.uuid())
  .middleware({
    index: ['auth'],
    show: ['auth'],
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })

Route.resource('/producers/:producerId/farm', 'FarmsController').apiOnly().middleware({
  index: ['auth'],
  show: ['auth'],
  store: ['auth'],
  update: ['auth'],
  destroy: ['auth'],
})

Route.resource('/cultures', 'CulturesController').apiOnly().middleware({
  index: ['auth'],
  show: ['auth'],
  store: ['auth'],
  update: ['auth'],
  destroy: ['auth'],
})

Route.get('/users/:userId/statistics/total-farms', 'StatisticsController.totalFarms').middleware('auth')
Route.get('/users/:userId/statistics/total-areas', 'StatisticsController.totalAreas').middleware('auth')
Route.get('/users/:userId/statistics/total-producers-by-state', 'StatisticsController.totalStateProducers').middleware('auth')
Route.get('/users/:userId/statistics/total-producers-by-use', 'StatisticsController.totalAreaUse').middleware('auth')