import { MessageModel, UserModel, ChannelModel } from 'components/models';

export interface AppStateInterface {
  messages: Array<MessageModel>,
  currentUser: UserModel,
  channels_invites: Array<ChannelModel>,
  channels_joined: Array<ChannelModel>,
  channels_public: Array<ChannelModel>,
  currentChannel: ChannelModel,
  currentChannelUsers: Array<UserModel>
}

export function appState (): AppStateInterface {
  return {
    messages: Array<MessageModel>(),
    currentUser: {
      id: 10,
      userName: 'MyUserName',
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'custom@custom.com',
      status: 'online'
    },
    channels_invites: Array<ChannelModel>(),
    channels_joined: Array<ChannelModel>(),
    channels_public: Array<ChannelModel>(),
    currentChannel: {
      id: 0,
      name: 'channel0',
      ownerId: -1,
      private: false,
      state: 'joined',
    },
    currentChannelUsers: Array<UserModel>()
  }
}

export default appState;
