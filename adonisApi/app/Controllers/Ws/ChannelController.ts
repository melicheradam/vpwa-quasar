import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import type { MessageRepositoryContract } from '@ioc:Repositories/MessageRepository'
import { inject } from '@adonisjs/core/build/standalone'
import Channel from 'App/Models/Channel'
import Logger from '@ioc:Adonis/Core/Logger'


// inject repository from container to controller constructor
// we do so because we can extract database specific storage to another class
// and also to prevent big controller methods doing everything
// controler method just gets data (validates it) and calls repository
// also we can then test standalone repository without controller
// implementation is bind into container inside providers/AppProvider.ts
@inject(['Repositories/MessageRepository'])
export default class ChannelController {
  constructor (private messageRepository: MessageRepositoryContract) {}

  //new channel was created
  public async addChannel({ params, socket, auth }: WsContextContract, channel_id: number) {
    const new_channel = await Channel.find(channel_id)
    socket.broadcast.emit('channelCreated', new_channel)
    return new_channel
  }

  public async removeChannel({ params, socket, auth }: WsContextContract) {
    //const message = await this.messageRepository.create(params.id, auth.user!.id)
    // broadcast message to other users in channel
    socket.broadcast.emit('channelRemoved', params.id)
    // return message to sender
    return true
  }
}