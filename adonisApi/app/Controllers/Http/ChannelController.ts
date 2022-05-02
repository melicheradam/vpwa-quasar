import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Channel from 'App/Models/Channel'
import CreateChannelValidator from 'App/Validators/CreateChannelValidator'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import { BaseModel, column, belongsTo, BelongsTo, LucidModel } from '@ioc:Adonis/Lucid/Orm'


export default class ChannelController {
  async create({ auth, request }: HttpContextContract) {
    //const data = await request.validate(RegisterUserValidator)
    //console.log(auth.use('api'))
    // TODO
    //add authentication to requests
    auth.use('api').authenticate

    const data = await request.validate(CreateChannelValidator)

    const owner = await User.findOrFail(data.owner)
    const channel = await owner.related('ownedChannels').create({
        name: data.name,
        private: data.private
    })
    /*const channel = new Channel()
    channel.name = data.name
    channel.owner = owner
    channel.private = data.private
    Logger.warn(String(channel.owner))
    */
    
    //const channel = await Channel.create(newdata)
    return channel
    //return auth.use('api').attempt(email, password)
  }
}