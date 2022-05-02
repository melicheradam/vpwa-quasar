import { MessageModel } from 'src/components/models'
import { MutationTree } from 'vuex'
import { ChannelsStateInterface } from './state'

const mutation: MutationTree<ChannelsStateInterface> = {
  LOADING_START (state) {
    state.loading = true
    state.error = null
  },
  LOADING_SUCCESS (state, { channel, messages }: { channel: number, messages: MessageModel[] }) {
    state.loading = false
    state.messages[channel] = messages
  },
  LOADING_ERROR (state, error: Error | null) {
    state.loading = false
    state.error = error
  },
  CLEAR_CHANNEL (state, channel: number) {
    state.active = null
    delete state.messages[channel]
  },
  SET_ACTIVE (state, channel: number) {
    state.active = channel
  },
  NEW_MESSAGE (state, { channel, message }: { channel: number, message: MessageModel }) {
    state.messages[channel].push(message)
    //const last_message = state.messages[channel][state.messages[channel].length - 1]
    /*
    //combine messages sent withing 10s
    if (state.messages[channel].length > 0 && last_message.user === message.user && message.date - last_message.date < (1000 * 10))
      state.messages[channel][state.messages[channel].length - 1].text.push(message.text[0])
    else
      state.messages[channel].push(message)
    */

  }
}

export default mutation