import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import type { MessageRepositoryContract } from '@ioc:Repositories/MessageRepository'
import { inject } from '@adonisjs/core/build/standalone'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'


// inject repository from container to controller constructor
// we do so because we can extract database specific storage to another class
// and also to prevent big controller methods doing everything
// controler method just gets data (validates it) and calls repository
// also we can then test standalone repository without controller
// implementation is bind into container inside providers/AppProvider.ts
@inject(['Repositories/MessageRepository'])
export default class MessageController {
  constructor (private messageRepository: MessageRepositoryContract) {}

  public async loadMessages({ params }: WsContextContract) {
    //Logger.info(String(this.messageRepository.getAll(params.id)))
    return this.messageRepository.getAll(params.id)
  }

  public async addMessage({ params, socket, auth }: WsContextContract, content: string) {
    const message = await this.messageRepository.create(params.id, auth.user!.id, content)
    // broadcast message to other users in channel
    socket.broadcast.emit('message', message)
    // return message to sender
    return message
  }
  public async addMemeber({ socket, auth}: WsContextContract) {
    const user = await User.find(auth.user!.id)
    socket.broadcast.emit('addedMember', user)
  }
}
