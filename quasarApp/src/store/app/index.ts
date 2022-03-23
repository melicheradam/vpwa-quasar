import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { MessagesStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const appModule: Module<MessagesStateInterface, StateInterface> = {
  namespaced: true,
  actions: actions,
  getters: getters,
  mutations: mutations,
  state
};

export default appModule;
