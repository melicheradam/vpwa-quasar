import { RawMessage, MessageModel } from 'src/components/models'
import { BootParams, SocketManager } from './SocketManager'

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChannelSocketManager extends SocketManager {
  public subscribe ({ store }: BootParams): void {
    const channel = this.namespace.split('/').pop() as string

    this.socket.on('message', (message: MessageModel) => {
      store.commit('channels/NEW_MESSAGE', { channel, message })
    })
  }

  public addMessage (message: RawMessage): Promise<MessageModel> {
    return this.emitAsync('addMessage', message)
  }

  public loadMessages (): Promise<MessageModel[]> {
    return this.emitAsync('loadMessages')
  }
}

class ChannelService {
  private channels: Map<number, ChannelSocketManager> = new Map()

  public join (id: number): ChannelSocketManager {
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
}

export default new ChannelService()