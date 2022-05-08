import { ChannelModel, MessageModel, UserModel } from 'src/components/models'

export interface ChannelsStateInterface {
  loading: boolean,
  error: Error | null,
  messages: { [channel: number]: MessageModel[] },
  users: { [channel: number]: UserModel[]}
  publicChannels: ChannelModel[]
  joinedChannels: ChannelModel[]
  invitesChannels: ChannelModel[]
  active: number | null
  //activeChannel : ChannelModel | null
}

function state (): ChannelsStateInterface {
  return {
    loading: false,
    error: null,
    messages: {},
    users: {},
    publicChannels: [],
    joinedChannels: [],
    invitesChannels: [],
    active: null,
    //activeChannel : null
  }
}

export default state
