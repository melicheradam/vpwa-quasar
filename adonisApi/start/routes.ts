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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import ChannelController from 'App/Controllers/Http/ChannelController'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout').middleware('auth')
  Route.get('me', 'AuthController.me').middleware('auth')
}).prefix('auth')

Route.group(() => {
  Route.post('create', 'ChannelController.create').middleware('auth')
  Route.post('join', 'ChannelController.join').middleware('auth')
  Route.delete('decline/:id', 'ChannelController.declineInvite').middleware('auth')
  Route.post('leave', 'ChannelController.leave').middleware('auth')
  Route.get('getPublic', 'ChannelController.getPublic').middleware('auth')
  Route.get('getJoined', 'ChannelController.getJoined').middleware('auth')
  Route.get('getInvites', 'ChannelController.getInvites').middleware('auth')
  Route.get('/:id/getUsers', 'ChannelController.getUsers').middleware('auth')
  Route.get('/:id/messages/:lastDate', 'ChannelController.getMoreMessages').middleware('auth')
}).prefix('channel')
