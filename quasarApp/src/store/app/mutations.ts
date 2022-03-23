import { MessageModel } from 'src/components/models';
import { MutationTree } from 'vuex';
import { MessagesStateInterface } from './state';

const mutation: MutationTree<MessagesStateInterface> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },
  storeMessage(state: MessagesStateInterface, messageObj: MessageModel) {
    state.messages.push(messageObj)
  },
  storeAllMessages(state: MessagesStateInterface, messageArr: MessageModel[]) {
    state.messages = messageArr
  }
};

export default mutation;
