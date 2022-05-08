import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import type { MessageRepositoryContract } from '@ioc:Repositories/MessageRepository'
import { inject } from '@adonisjs/core/build/standalone'
import Channel from 'App/Models/Channel'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'

export default class ChannelController {

  //new channel was created
  public async addChannel({ params, socket, auth }: WsContextContract, channel_id: number) {
    const new_channel = await Channel.find(channel_id)
    socket.broadcast.emit('channelCreated', new_channel)
    return new_channel
  }

  public async destroyChannel({ params, socket, auth }: WsContextContract, channel: number) {
    //const message = await this.messageRepository.create(params.id, auth.user!.id)
    // broadcast message to other users in channel
    socket.broadcast.emit('channelDestroyed', channel)
    // return message to sender
    return true
  }

  public async addMember({ params, socket, auth}: WsContextContract) {
    socket.broadcast.emit('addedMember', auth.user)

    return auth.user
  }

  public async removeMember({ params, socket, auth}: WsContextContract) {
    socket.broadcast.emit('removedMember', auth.user)

    return auth.user
  }

  public async addInvite({ params, socket, auth}: WsContextContract, {channelId, nickName}: {channelId: number, nickName: string}) {
    const channel = await Channel.findOrFail(channelId)
    socket.broadcast.emit('addedInvite', {channel: channel, nickName: nickName})

    return auth.user
  }
}