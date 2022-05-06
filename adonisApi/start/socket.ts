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
import wsConfig from 'Config/socket'


// this is dynamic namespace, in controller methods we can use params.name
Ws.namespace('channels/:id')
  // .middleware('channel') // check if user can join given channel
  .on('loadMessages', 'MessageController.loadMessages')
  .on('addMessage', 'MessageController.addMessage')


Ws.namespace('channel')
  // .middleware('channel') // check if user can join given channel
  .on('addChannel', 'ChannelController.addChannel')
  .on('removeChannel', 'ChannelController.removeChannel')


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
