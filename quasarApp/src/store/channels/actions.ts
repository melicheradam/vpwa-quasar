import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { channelService } from 'src/services'
import { ChannelModel, RawMessage, ChannelModelForm, SerializedMessage, MessageModel } from 'src/components/models'

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async join ({ commit }, channel: number) {
    try {
      commit('LOADING_START')
      const messages = await channelService.join(channel).loadMessages()
      const formattedMessages = Array<MessageModel>()

      messages.forEach((message: SerializedMessage, index: number) => {
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
    //const leaving: number[] = channel !== null ? [channel] : getters.joinedChannels
    if(channel){
      channelService.leave(channel)
      commit('CLEAR_CHANNEL', channel)
    }
    /*leaving.forEach((c) => {
      channelService.leave(c)
      commit('CLEAR_CHANNEL', c)
    })*/
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
      commit('LOADING_START')
      const new_channel = await channelService.create(channel)
      const messages: ChannelModel[] = []
      commit('LOADING_SUCCESS', { new_channel, messages })
      return new_channel
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  async joindb ({ commit }, { channel }: { channel: number}) {
    try {
      //commit('LOADING_START')
      const retval = await channelService.joindb(channel)
      //commit('LOADING_SUCCESS', { channel, user })
    } catch (err) {
      //commit('LOADING_ERROR', err)
      throw err
    }
  },
  async loadChannels ({ commit }) {
    try {
      //commit('LOADING_START')
      const retval = await channelService.getChannels()
      console.log(retval)
      retval.forEach(element => {
        commit('NEW_CHANNEL', element)
      });
      //commit('LOADING_SUCCESS', { channel, user })
    } catch (err) {
      //commit('LOADING_ERROR', err)
      throw err
    }
  },
}

export default actions