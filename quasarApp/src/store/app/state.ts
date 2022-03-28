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
      username: 'MyUserName',
      firstname: 'Foo',
      lastname: 'Bar',
      email: 'custom@custom.com',
      status: 'online'
    },
    channels_invites: Array<ChannelModel>(),
    channels_joined: Array<ChannelModel>(),
    channels_public: Array<ChannelModel>(),
    currentChannel: {
      id: 0,
      name: 'channel0',
      owner_id: -1,
      private: false,
      state: 'joined',
    },
    currentChannelUsers: Array<UserModel>(
        { id: -1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'grey-5' },
        { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'positive' },
        { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'positive' },
        { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'negative' },
        { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'grey-5' }),
  }
}

export default appState;
