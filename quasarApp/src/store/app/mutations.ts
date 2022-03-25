import { MessageModel } from 'src/components/models';
import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';

const mutation: MutationTree<AppStateInterface> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },
  storeMessage (state: AppStateInterface, messageObj: MessageModel) {
    state.messages.push(messageObj)
  },
  storeAllMessages (state: AppStateInterface, messageArr: MessageModel[]) {
    state.messages = messageArr
  }
};

export default mutation;
