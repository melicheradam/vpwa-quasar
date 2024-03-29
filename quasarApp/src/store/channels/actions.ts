import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { channelService } from 'src/services'
import { ChannelModel, RawMessage, ChannelModelForm, SerializedMessage, MessageModel } from 'src/components/models'


const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async join ({ commit }, { channel }: { channel: number}) {
    try {
      commit('LOADING_START')

      const messages = (await channelService.join(channel).loadMessages()).reverse()
      const formattedMessages = Array<MessageModel>()

      messages.forEach((message: SerializedMessage, index: number) => {
        console.log(message)
        const new_message = message as unknown as MessageModel
        new_message.contentArr = Array<string>(message.content)
        new_message.createdAt = Number(new Date(message.createdAt))

        if(index > 0){
          const last_message = formattedMessages[formattedMessages.length - 1]

          if (formattedMessages.length > 0 && last_message.user.id === message.user.id && new_message.createdAt - last_message.createdAt < (1000 * 10)){
            formattedMessages[formattedMessages.length - 1].contentArr.push(message.content)
          }
          else{
            formattedMessages.push(new_message)
          }
        }
        else{
          formattedMessages.push(new_message)
        }
      })
      commit('LOADING_SUCCESS', { channel, messages: formattedMessages })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  leave ({ getters, commit }, channel: number | null) {
    // eslint-disable-next-line
    const leaving: number[] = channel !== null ? [channel] : getters.joinedChannels
    if(channel){
      channelService.leave(channel)
      commit('CLEAR_CHANNEL', channel)
    }
    leaving.forEach((c) => {
      channelService.leave(c)
      commit('CLEAR_CHANNEL', c)
    })
  },
  async addMessage ({ commit }, { channel, message }: { channel: number, message: RawMessage }) {
    const newMessage = await channelService.in(channel)?.addMessage(message)
    if(newMessage !== undefined){
      const formattedMessage = newMessage as unknown as MessageModel
      formattedMessage.contentArr = Array<string>(newMessage.content)
      formattedMessage.createdAt = Number(new Date(newMessage.createdAt))
      commit('NEW_MESSAGE', { channel, message: formattedMessage })
    }
  },
  async create ({ commit }, channel: ChannelModelForm): Promise<ChannelModel | null> {
    try {
      //commit('LOADING_START')
      const new_channel = await channelService.create(channel)
      const messages: ChannelModel[] = []
      //commit('LOADING_SUCCESS', { new_channel, messages })
      commit('NEW_CHANNEL', {channel: new_channel, type: 'joined'})
      return new_channel
    } catch (err) {
      //commit('LOADING_ERROR', err)
      throw err
    }
  },
  async invite ({ commit }, { user, channel }: { user: string, channel : number}) {
    try {
      const retval = await channelService.invite(user, channel)
      return retval
    } catch (err) {
      throw err
    }
  },
  async joindb ({ commit }, { channel }: { channel: number}) {
    try {
      const retval = await channelService.joindb(channel)
      commit('JOIN_CHANNEL', {channel_id : channel} )
      return retval
    } catch (err) {
      throw err
    }
  },
  async declineInvite ({ commit }, { channel }: { channel: number}) {
    try {
      await channelService.declineInvite(channel)
      commit('DECLINE_INVITE', {channel_id : channel} )

    } catch (err) {
      throw err
    }
  },
  async loadChannels ({ commit }) {
    try {
      //commit('LOADING_START')
      const publicChannels = await channelService.getPublicChannels()
      const joinedChannels = await channelService.getJoinedChannels()
      const invitesChannels = await channelService.getInvitesChannels()
      commit('SET_CHANNELS', {channels: publicChannels.filter(item => !joinedChannels.some(jItem => jItem.id === item.id)), type: 'public'})
      commit('SET_CHANNELS', {channels: joinedChannels, type: 'joined'})
      commit('SET_CHANNELS', {channels: invitesChannels, type: 'invite'})
      //commit('LOADING_SUCCESS', { channel, user })
    } catch (err) {
      //commit('LOADING_ERROR', err)
      throw err
    }
  },
  async loadUsers ({ commit }, { channel }: { channel: number}) {
    try {
      //commit('LOADING_START')
      const users = await channelService.getChannelUsers(channel)

      commit('SET_USERS', {channel: channel, users: users})

      //commit('LOADING_SUCCESS', { channel, user })
    } catch (err) {
      //commit('LOADING_ERROR', err)
      throw err
    }
  },
  async leaveChannel ({ commit }, { channel }: { channel: number}) {
    try {
      //commit('LOADING_START')
      // if status true, it means that channel was destroyed, emit to all users to remove it
      // if status false, emit to all users i left the channel
      const status = await channelService.leaveChannel(channel)

      if(status){
        void channelService.channel.destroyChannel(channel)
        commit('REMOVE_CHANNEL', {channel_id: channel})
      }
      else{
        channelService.removeMember(channel)
        commit('JOINED_TO_PUBLIC', {channel_id: channel})
      }

      //commit('LOADING_SUCCESS', { channel, user })
    } catch (err) {
      //commit('LOADING_ERROR', err)
      throw err
    }
  },
  async fetchMessages ({ commit }, { channel, lastDate }: { channel: number, lastDate: number}) {
    try {
      //commit('LOADING_START')
      const messages = (await channelService.getMoreMessages(channel, lastDate)).reverse()
      messages.forEach((item) => {
        const formattedMessage = item as unknown as MessageModel
        formattedMessage.contentArr = Array<string>(item.content)
        formattedMessage.createdAt = Number(new Date(item.createdAt))
        commit('PREPEND_MESSAGE', {channel: channel, message: formattedMessage})
      })

    } catch (err) {
      //commit('LOADING_ERROR', err)
      throw err
    }
  },
}

export default actions
