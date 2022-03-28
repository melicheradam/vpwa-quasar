import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';

//fetchovanie moze ist aj sem
const actions: ActionTree<AppStateInterface, StateInterface> = {
  acceptInvite (context, payload) {
    context.commit('acceptInvite', payload)
    context.commit('declineInvite', payload)
  },
  declineInvite (context, payload) {
    context.commit('declineInvite', payload)
  },

};

export default actions;
