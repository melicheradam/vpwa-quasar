import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { MessageModel } from 'src/components/models'

const getters: GetterTree<ChannelsStateInterface, StateInterface> = {
  joinedChannels (context){
    return Object.keys(context.messages)
  },
  /*publicChannels (context){
    return context.channelList
  },*/
  currentMessages (context): MessageModel[] | []{
    return context.active !== null ? context.messages[context.active] : []
  },
  lastMessageOf (context) {
    return (channel: number) => {
      const messages = context.messages[channel]
      return messages.length > 0 ? messages[messages.length - 1] : null
    }
  }
}

export default getters