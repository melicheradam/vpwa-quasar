import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import type { MessageRepositoryContract } from '@ioc:Repositories/MessageRepository'
import { inject } from '@adonisjs/core/build/standalone'
import Channel from 'App/Models/Channel'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'

export default class ActivityController {

  //user status changed
  public async setOnline({ params, socket, auth }: WsContextContract, channel_id: number) {
    socket.broadcast.emit('userOnline', auth.user)
    return auth.user
  }
  public async setOffline({ params, socket, auth }: WsContextContract, channel_id: number) {
    socket.broadcast.emit('userOffline', auth.user)
    return auth.user
  }

}