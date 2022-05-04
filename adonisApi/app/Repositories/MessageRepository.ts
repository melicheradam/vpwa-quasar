import type { MessageRepositoryContract, SerializedMessage } from '@ioc:Repositories/MessageRepository'
import Channel from 'App/Models/Channel'
import Logger from '@ioc:Adonis/Core/Logger'


export default class MessageRepository implements MessageRepositoryContract {
  public async getAll(channelId: number): Promise<SerializedMessage[]> {
    Logger.info('OKOOKOK')
    const channel = await Channel.query()
      .where('id', channelId)
      .preload('messages', (messagesQuery) => messagesQuery.preload('user'))
      .firstOrFail()
    Logger.info(String(channel.messages))
    return channel.messages.map((message) => message.serialize() as SerializedMessage)
  }

  public async create(channelId: number, userId: number, content: string): Promise<SerializedMessage> {
    const channel = await Channel.findByOrFail('id', channelId)
    const message = await channel.related('messages').create({ userId: userId, content })
    await message.load('user')

    return message.serialize() as SerializedMessage
  }
}