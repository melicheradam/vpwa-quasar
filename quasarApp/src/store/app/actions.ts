import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MessagesStateInterface } from './state';

//fetchovanie moze ist aj sem
const actions: ActionTree<MessagesStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
