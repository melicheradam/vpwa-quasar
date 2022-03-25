import { MessageModel, User, ChannelModel } from 'components/models';

export interface AppStateInterface {
  messages: Array<MessageModel>,
  currentUser: User,
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

/*
export function currentUser(): User{
return {
  email: '',
  username: 'foobar',
  firstname: 'Fooo',
  lastname: 'Bar',
  id: 0
}
}*/

export default appState;
