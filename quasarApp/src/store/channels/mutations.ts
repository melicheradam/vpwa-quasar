import { ChannelModel, MessageModel, UserModel } from 'src/components/models'
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
    if(state.messages[channel].length === 0){
      state.messages[channel].push(message)
      return
    }

    const last_message = state.messages[channel][state.messages[channel].length - 1]

    //combine messages sent withing 10s
    if (state.messages[channel].length > 0 && last_message.user.id === message.user.id && message.createdAt - last_message.createdAt < (1000 * 10))
      state.messages[channel][state.messages[channel].length - 1].contentArr.push(message.contentArr[0])
    else
      state.messages[channel].push(message)


  },
  NEW_CHANNEL (state, { channel, type }: { channel: ChannelModel, type: string }) {
    if(type === 'public')
      state.publicChannels.push(channel)
    if(type === 'invite')
      state.invitesChannels.push(channel)
    if(type === 'joined')
      state.joinedChannels.push(channel)

  },
  SET_CHANNELS (state, { channels, type }: { channels: ChannelModel[], type: string }){
    if(type === 'public')
      state.publicChannels = channels
    if(type === 'invite')
      state.invitesChannels = channels
    if(type === 'joined')
      state.joinedChannels = channels
  },
  REMOVE_CHANNEL (state, { channel_id }: { channel_id: number}){
    state.invitesChannels.filter(item => item.id !== channel_id)
    state.joinedChannels.filter(item => item.id !== channel_id)
    state.publicChannels.filter(item => item.id !== channel_id)
  },
  JOIN_CHANNEL(state, {channel_id}: {channel_id: number}){
    const channel = state.publicChannels.filter(item => item.id === channel_id)
    state.joinedChannels.push(channel[0])
    state.publicChannels = state.publicChannels.filter(item => item.id !== channel_id)
  },
  SET_USERS(state, { channel, users }: { channel: number, users: UserModel[] }){
    state.users[channel] = users
  },
  ADD_USER(state, { channel, user }: { channel: number, user: UserModel }){
    state.users[channel].push(user)
  }
}

export default mutation
