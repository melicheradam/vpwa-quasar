import { MessageModel, UserModel, ChannelModel } from 'components/models';

export interface AppStateInterface {
  messages: Array<MessageModel>,
  currentUser: UserModel,
  channels_invites: Array<ChannelModel>,
  channels_joined: Array<ChannelModel>,
}

export function appState (): AppStateInterface {
  return {
    messages: Array<MessageModel>(),
    currentUser: {
      id: 1000,
      username: 'MyUserName',
      firstname: 'Foo',
      lastname: 'Bar',
      email: 'custom@custom.com',
    },
    channels_invites: Array<ChannelModel>(),
    channels_joined: Array<ChannelModel>(),
  }
}

export default appState;
