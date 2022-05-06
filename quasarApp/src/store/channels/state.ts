import { ChannelModel, MessageModel } from 'src/components/models'

export interface ChannelsStateInterface {
  loading: boolean,
  error: Error | null,
  messages: { [channel: number]: MessageModel[] }
  publicChannels: ChannelModel[]
  joinedChannels: ChannelModel[]
  invitesChannels: ChannelModel[]
  active: number | null
}

function state (): ChannelsStateInterface {
  return {
    loading: false,
    error: null,
    messages: {},
    publicChannels: [],
    joinedChannels: [],
    invitesChannels: [],
    active: null
  }
}

export default state