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
    const channel = request.input('channelId', -1)
    try{
      const user = auth.use('api').user
      if(user !== undefined){
        await user.related('channels').attach([channel])
      }
      return true
    }
    catch(err){
      Logger.error('Could not join channel' + String(channel))
      throw err
    }
  }
  async leave({ auth, request }: HttpContextContract) {
    //console.log(auth.use('api'))
    // TODO
    //add authentication to requests
    auth.use('api').authenticate()
    const channelId = request.input('channelId', -1)
    try{
      const user = auth.user
      const channel = await Channel.findOrFail(channelId)
      // destroy channel and return true
      if(user?.id === channel.ownerId){
        channel.delete()
        return true
      }
      // just remove record from channels_users
      await user?.related('channels').detach([channelId])
      return false
    }
    catch(err){
      Logger.error('Could not leave channel' + String(channelId))
      throw err
    }
  }
  async getPublic({ auth, request }: HttpContextContract) {

    auth.use('api').authenticate()

    const publicChannels = await Channel.query().where('private', false)

    return publicChannels
  }
  async getJoined({ auth, request }: HttpContextContract) {

    auth.use('api').authenticate()

    auth.user?.load('channels')
    const joinedChannels = await auth.user?.related('channels').query()
    
    return joinedChannels
  }
  async getInvites({ auth, request }: HttpContextContract) {

    auth.use('api').authenticate()

    auth.user?.load('invites')
    const invitedChannels = auth.user?.related('invites').query()

    return invitedChannels
  }
  async getUsers({ auth, request, params }: HttpContextContract) {

    auth.use('api').authenticate()

    const channelUsers = (await Channel.findOrFail(params.id)).related('users').query()

    return channelUsers
  }
}