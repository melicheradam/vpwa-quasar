import {MessageModel, User} from 'components/models';

export interface MessagesStateInterface{
  messages: Array<MessageModel>,
}

export function messagesState(): MessagesStateInterface{
    return {
      messages: Array<MessageModel>()
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

export default messagesState;
