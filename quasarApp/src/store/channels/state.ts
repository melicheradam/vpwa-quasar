import { ChannelModel, MessageModel } from 'src/components/models'

export interface ChannelsStateInterface {
  loading: boolean,
  error: Error | null,
  messages: { [channel: number]: MessageModel[] }
  channelList: ChannelModel[]
  active: number | null
}

function state (): ChannelsStateInterface {
  return {
    loading: false,
    error: null,
    messages: {},
    channelList: [],
    active: null
  }
}

export default state