/*
|--------------------------------------------------------------------------
| Websocket events
|--------------------------------------------------------------------------
|
| This file is dedicated for defining websocket namespaces and event handlers.
|
*/

import Ws from '@ioc:Ruby184/Socket.IO/Ws'
import Logger from '@ioc:Adonis/Core/Logger'


// this is dynamic namespace, in controller methods we can use params.name
Ws.namespace('channels/:id')
  // .middleware('channel') // check if user can join given channel
  .on('loadMessages', 'MessageController.loadMessages')
  .on('addMessage', 'MessageController.addMessage')
  .connected(({ socket }) => {
    Logger.info('new websocket connection: ' + (socket.id))
  })

Ws.namespace('/')
  .connected(({ socket }) => {
    Logger.info('new websocket connection: ', socket.id)
  })
  .disconnected(({ socket }, reason) => {
    Logger.info('websocket disconnecting: ', socket.id, reason)
  })
  .on('hello', ({ socket }, msg: string) => {
    Logger.info('websocket greeted: ', socket.id, msg)
    return 'hi'
  })
