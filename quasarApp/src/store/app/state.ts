import { MessageModel, UserModel, ChannelModel, ChannelUsersModel } from 'components/models';

export interface AppStateInterface {
  messages: Array<MessageModel>,
  currentUser: UserModel,
  channels_invites: Array<ChannelModel>,
  channels_joined: Array<ChannelModel>,
  currentChannel: ChannelUsersModel
}

export function appState (): AppStateInterface {
  return {
    messages: Array<MessageModel>(),
    currentUser: {
      id: -1,
      username: 'MyUserName',
      firstname: 'Foo',
      lastname: 'Bar',
      email: 'custom@custom.com',
      status: 'online'
    },
    channels_invites: Array<ChannelModel>(),
    channels_joined: Array<ChannelModel>(),
    currentChannel: {
      id: 0,
      name: 'channel0',
      owner_id: -1,
      type: 'joined',
      private: true,
      users: Array<UserModel>(
        { id: -1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'grey-5' },
        { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'positive' },
        { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'positive' },
        { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'negative' },
        { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'grey-5' }),
    }
  }
}

export default appState;
