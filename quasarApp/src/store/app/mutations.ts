import { MessageModel, UserModel, ChannelModel, ChannelUsersModel } from 'src/components/models';
import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';

const mutation: MutationTree<AppStateInterface> = {

  TOGGLE_LEFT_DRAWER (state : AppStateInterface) {
    state.leftDrawerOpen = !state.leftDrawerOpen
  },
  TOGGLE_RIGHT_DRAWER (state : AppStateInterface) {
    state.rightDrawerOpen = !state.rightDrawerOpen
  },
  EXPAND_RIGHT_DRAWER (state : AppStateInterface) {
    state.rightDrawerOpen = true
  }
};

export default mutation;
