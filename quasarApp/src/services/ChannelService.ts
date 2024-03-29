import { RawMessage, MessageModel, ChannelModel, ChannelModelForm, SerializedMessage, UserModel } from 'src/components/models'
import { BootParams, SocketManager } from './SocketManager'
import { api } from 'src/boot/axios'
import { AxiosError } from 'axios'


// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChannelSocketManager extends SocketManager {
  public subscribe ({ store }: BootParams): void {
    const active = this.namespace.split('/').pop() as string

    this.socket.on('message', (message: SerializedMessage) => {
      const new_message = message as unknown as MessageModel
      new_message.contentArr = Array<string>(message.content)
      new_message.createdAt = Number(new Date(message.createdAt))
      store.commit('channels/NEW_MESSAGE', {channel: active, message: new_message})
    })

    this.socket.on('addedMember', (user: UserModel) => {
      store.commit('channels/ADD_USER', {channel: active, user: user})
    })

    this.socket.on('removedMember', (user: UserModel) => {
      store.commit('channels/REMOVE_USER', {channel: active, user: user})
    })
  }

  public addMessage (message: RawMessage): Promise<SerializedMessage> {
    return this.emitAsync('addMessage', message)
  }

  public loadMessages (): Promise<SerializedMessage[]> {
    return this.emitAsync('loadMessages')
  }
  public addMember(): Promise<UserModel> {
    return this.emitAsync('addMember')
  }

  public removeMember(): Promise<UserModel> {
    return this.emitAsync('removeMember')
  }
}

class ChannelOpsSocketManager extends SocketManager {
  public subscribe ({ store, router }: BootParams): void {

    // get notification from websocket that a new channel was created
    // push it to store
    this.socket.on('channelCreated', (channel: ChannelModel) => {
      if(!channel.private)
        store.commit('channels/NEW_CHANNEL', {channel: channel, type: 'public'})
    })

    this.socket.on('channelDestroyed', (channel_id: number) => {
      store.commit('channels/REMOVE_CHANNEL', {channel_id: channel_id})
      void router.push('/channel')
    })

    this.socket.on('userOnline', (user: UserModel) => {
      store.commit('channels/SET_STATUS', {user: user, new_status: 'green'})
    })

    this.socket.on('userOffline', (user: UserModel) => {
      store.commit('channels/SET_STATUS', {user: user, new_status: 'grey'})
    })

    this.socket.on('addedInvite', ({channel, nickName}: {channel: ChannelModel, nickName: string}) => {
      console.log(store.state.auth.user?.nickName)
      console.log(nickName)
      if(store.state.auth.user?.nickName === nickName){
        //store.commit('channels/REMOVE_CHANNEL', {channel_id: channel.id})
        store.commit('channels/NEW_CHANNEL', {channel: channel, type: 'invite'})
      }
      
    })
  }

  // notify all listeners that a new channel was created
  public addChannel (channel: number): Promise<ChannelModel> {
    return this.emitAsync('addChannel', channel)
  }

  public destroyChannel (channel: number): Promise<ChannelModel> {
    return this.emitAsync('destroyChannel', channel)
  }

  // notify all listeners that a new channel was created
  public addInvite (data: {channelId: number, nickName: string}): Promise<ChannelModel> {
    return this.emitAsync('addInvite', data)
  }


}

class ChannelService {
  private channels: Map<number, ChannelSocketManager> = new Map()
  public channel = new ChannelOpsSocketManager('/channel')

  public join (id: number): ChannelSocketManager {
    if(isNaN(id))
      throw new Error('Channel id is not a number!')

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

  async invite (user: string, channel: number): Promise<boolean> {
    const data = {
      channelId : channel,
      nickName : user
    }
    const response = await api.post<boolean>('channel/invite', data)
    void this.channel.addInvite(data)
    return true
  }

  async create (data: ChannelModelForm): Promise<ChannelModel> {
    const response = await api.post<ChannelModel>('channel/create', data)
    void this.channel.addChannel(response.data.id)
    return response.data
  }
  async leaveChannel (channel: number): Promise<boolean>{
    const data = {
      channelId: channel
    }
    const response = await api.post<boolean>('channel/leave', data)
    //void this.channel.addChannel(response.data.id)

    return Boolean(response.data)
  }
  public addMember (id: number) {
    const channel = this.channels.get(id)

    if (!channel) {
      console.log('CANNOT ADD MEMBER, CHANNEL DOES NOT EXIST YET')
      return false
    }
    void channel.addMember()
  }

  public removeMember (id: number) {
    const channel = this.channels.get(id)

    if (!channel) {
      console.log('CANNOT REMOVE MEMBER, CHANNEL DOES NOT EXIST YET')
      return false
    }
    void channel.removeMember()
  }

  async joindb (id: number): Promise<boolean> {
    const data = {
      channelId: id,
    }
    const response = await api.post<boolean>('channel/join', data)
    return response.data
  }
  async declineInvite (id: number): Promise<boolean> {
    const response = await api.delete<boolean>('channel/decline/'+String(id))
    return response.data
  }

  public getPublicChannels (): Promise<ChannelModel[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return api.get(
        'channel/getPublic'
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        return Promise.reject(error)
      })
  }
  public getInvitesChannels (): Promise<ChannelModel[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return api.get(
        'channel/getInvites'
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        return Promise.reject(error)
      })
  }
  public getJoinedChannels (): Promise<ChannelModel[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return api.get(
        'channel/getJoined'
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        return Promise.reject(error)
      })
  }
  public getChannelUsers (id: number): Promise<UserModel[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return api.get(
        'channel/' + String(id) + '/getUsers'
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        return Promise.reject(error)
      })
  }
  public getMoreMessages (id: number, lastDate: number): Promise<SerializedMessage[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return api.get(
        'channel/' + String(id) + '/messages/' + String(lastDate)
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        return Promise.reject(error)
      })
  }
}

export default new ChannelService()
