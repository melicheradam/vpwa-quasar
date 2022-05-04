import { RawMessage, MessageModel, ChannelModel, ChannelModelForm, SerializedMessage } from 'src/components/models'
import { BootParams, SocketManager } from './SocketManager'
import { api } from 'src/boot/axios'
import { AxiosError } from 'axios'


// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChannelSocketManager extends SocketManager {
  public subscribe ({ store }: BootParams): void {
    const active = this.namespace.split('/').pop() as string

    this.socket.on('message', (message: MessageModel) => {
      store.commit('channels/NEW_MESSAGE', { active, message })
    })

    // get notification from websocket that a new channel was created
    // push it to store
    this.socket.on('channelCreated', (channel: ChannelModel) => {
      store.commit('channels/NEW_CHANNEL', channel)
    } )
  }

  public addMessage (message: RawMessage): Promise<SerializedMessage> {
    return this.emitAsync('addMessage', message)
  }

  // notify all listeners that a new channel was created
  public addChannel (channel: number): Promise<ChannelModel> {
    return this.emitAsync('addChannel', channel)
  }

  public loadMessages (): Promise<SerializedMessage[]> {
    console.log(this.emitAsync('loadMessages'))
    return this.emitAsync('loadMessages')
  }
}

class ChannelService {
  private channels: Map<number, ChannelSocketManager> = new Map()

  public join (id: number): ChannelSocketManager {
    console.log('joining' + String(id))
    if (this.channels.has(id)) {
      throw new Error(`User is already joined in channel "${id}"`)
    }
    
    // connect to given channel namespace
    const channel = new ChannelSocketManager(`/channels/${id}`)
    this.channels.set(id, channel)
    return channel
  }

  public leave (id: number): boolean {
    const channel = this.channels.get(id)

    if (!channel) {
      return false
    }

    // disconnect namespace and remove references to socket
    channel.destroy()
    return this.channels.delete(id)
  }

  public in (id: number): ChannelSocketManager | undefined {
    return this.channels.get(id)
  }

  async create (data: ChannelModelForm): Promise<ChannelModel> {
    const response = await api.post<ChannelModel>('channel/create', data)
    return response.data
  }

  async joindb (id: number): Promise<boolean> {
    const data = {
      channelId: id,
      //userId: userId
    }
    const response = await api.post<boolean>('channel/join', data)
    return response.data
  }

  public getChannels (): Promise<ChannelModel[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return api.get(
        'channel/getAll'
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        return Promise.reject(error)
      })
  }
}

export default new ChannelService()