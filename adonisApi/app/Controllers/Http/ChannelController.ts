import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateChannelValidator from 'App/Validators/CreateChannelValidator'
import User from 'App/Models/User'
import Logger from '@ioc:Adonis/Core/Logger'
import Channel from 'App/Models/Channel'


export default class ChannelController {
  async create({ auth, request }: HttpContextContract) {
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
    return channel
  }
  async join({ auth, request }: HttpContextContract) {
    //console.log(auth.use('api'))
    // TODO
    //add authentication to requests
    auth.use('api').authenticate
    const channel = request.input('channel_id', -1)
    try{
      const user = auth.user
      Logger.warn(String(user))
      if(user !== undefined)
        await user.related('channels').attach(channel)
      return false
    }
    catch(err){
      Logger.warn('Could not join channel' + String(channel))
      return false
    }
  }
  async getAll({ auth, request }: HttpContextContract) {

    auth.use('api').authenticate

    const publicChannels = Channel.query().where('private', false)

    return publicChannels
  }
}