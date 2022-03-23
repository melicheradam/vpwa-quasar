import { MessageModel } from 'src/components/models';
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MessagesStateInterface } from './state';


const getters: GetterTree<MessagesStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  },
  getMessagesByChannel:(state: MessagesStateInterface) => (id:number): Array<MessageModel> => {
      return state.messages.filter(item => item.channel_id === id);
  }
};

export default getters;
