import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { channelService } from 'src/services'
import { RawMessage } from 'src/components/models'

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async join ({ commit }, channel: number) {
    try {
      commit('LOADING_START')
      const messages = await channelService.join(channel).loadMessages()
      commit('LOADING_SUCCESS', { channel, messages })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  leave ({ getters, commit }, channel: number | null) {
    //const leaving: number[] = channel !== null ? [channel] : getters.joinedChannels
    if(channel)
      channelService.leave(channel)
    /*leaving.forEach((c) => {
      channelService.leave(c)
      commit('CLEAR_CHANNEL', c)
    })*/
  },
  async addMessage ({ commit }, { channel, message }: { channel: number, message: RawMessage }) {
    const newMessage = await channelService.in(channel)?.addMessage(message)
    commit('NEW_MESSAGE', { channel, message: newMessage })
  }
}

export default actions