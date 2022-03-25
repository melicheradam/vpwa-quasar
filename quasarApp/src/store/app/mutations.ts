import { MessageModel, UserModel } from 'src/components/models';
import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';

const mutation: MutationTree<AppStateInterface> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },
  storeMessage (state: AppStateInterface, messageObj: MessageModel) {
    //check if own last message is within minute
    const last_message = state.messages[state.messages.length - 1]
    if (state.messages.length > 0)
      console.log(last_message.date - messageObj.date)

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
     * User when logging user in,
     * Add fetching of channels joined by user
     * 
     *  */
    state.currentUser = userObj
  }

};

export default mutation;
