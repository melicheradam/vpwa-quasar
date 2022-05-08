import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { ChannelModel, MessageModel } from 'src/components/models'

const getters: GetterTree<ChannelsStateInterface, StateInterface> = {
  joinedChannels (context){
    return Object.keys(context.messages)
  },
  activeChannelModel (context): ChannelModel{
    return context.joinedChannels.filter(item => item.id === context.active)[0]
  },
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