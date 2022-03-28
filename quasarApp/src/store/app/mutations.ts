import { MessageModel, UserModel, ChannelModel, ChannelUsersModel } from 'src/components/models';
import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';

const mutation: MutationTree<AppStateInterface> = {

  storeMessage (state: AppStateInterface, messageObj: MessageModel) {
    //check if own last message is within minute
    const last_message = state.messages[state.messages.length - 1]

    if (state.messages.length > 0 && last_message.user === messageObj.user && messageObj.date - last_message.date < (1000 * 10))
      state.messages[state.messages.length - 1].text.push(messageObj.text[0])
    else
      state.messages.push(messageObj)
  },
  storeAllMessages (state: AppStateInterface, messageArr: MessageModel[]) {
    state.messages = messageArr
  },
  storeCurrentUser (state: AppStateInterface, userObj: UserModel) {
    /**
     * Used when logging user in,
     * Add fetching of channels joined by user
     *  */
    state.currentUser = userObj
  },
  storeChannel (state: AppStateInterface, channelObj: ChannelModel) {
    if (channelObj.type === 'invite')
      state.channels_invites.push(channelObj)
    else if (channelObj.type === 'joined')
      state.channels_joined.push(channelObj)
  },
  storeCurrentChannel (state: AppStateInterface, channelObj: ChannelUsersModel) {
    /**
     * Add fetching of users in the current channel
     *  */
    channelObj.users = Array<UserModel>(state.currentUser, { id: 1, username: 'test', firstname: 'testtt', lastname: 'asdfasdf', email: 'asdfadfgdfg', status: 'positive' })
    state.currentChannel = channelObj
  },

  declineInvite (state: AppStateInterface, dataObj: ChannelModel) {
      console.log('pes')
      state.channels_invites = state.channels_invites.filter(function (Channel : ChannelModel) : boolean {
        return Channel.id !== dataObj.id;
      })
  },
  acceptInvite (state: AppStateInterface, dataObj: ChannelModel) {
    dataObj.type = 'joined';
    state.channels_joined.push(dataObj);
  }
};

export default mutation;
