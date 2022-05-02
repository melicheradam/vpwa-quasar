import { MessageModel } from 'src/components/models'

export interface ChannelsStateInterface {
  loading: boolean,
  error: Error | null,
  messages: { [channel: number]: MessageModel[] }
  active: number | null
}

function state (): ChannelsStateInterface {
  return {
    loading: false,
    error: null,
    messages: {},
    active: null
  }
}

export default state