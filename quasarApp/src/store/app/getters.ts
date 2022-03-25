import { MessageModel } from 'src/components/models';
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';


const getters: GetterTree<AppStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  },
  getMessagesByChannel: (state: AppStateInterface) => (id: number): Array<MessageModel> => {
    return state.messages.filter(item => item.channel_id === id);
  }
};

export default getters;
