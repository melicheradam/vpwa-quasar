import { ChannelModel, UserModel } from 'src/components/models';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';

//fetchovanie moze ist aj sem
const actions: ActionTree<AppStateInterface, StateInterface> = {
  acceptInvite (context, payload: ChannelModel) {
    context.commit('removeChannel', payload)
    payload.state = 'joined'
    context.commit('storeChannel', payload)
  },
  declineInvite (context, payload: ChannelModel) {
    context.commit('removeChannel', payload)
  },
  leaveChannel(context){
    context.commit('removeChannel', this.state.app.currentChannel)

    // if channel is public add it to public channels
    if(!context.state.currentChannel.private){
      context.commit('storeChannel', this.state.app.currentChannel)
    }

    //also if user is owner delete whole channel
  },
  createChannel(context, payload){
    context.commit('storeChannel', payload)
  },
  changeCurrentChannel(context, channelID: number){
    const channelObj = {
      id: channelID,
      name: 'test',
      ownerId: 1,
      private: false,
      state: 'joined'
    } as ChannelModel
    context.commit('storeCurrentChannel', channelObj)
    const channelUsers = Array<UserModel>(context.state.currentUser)
    context.commit('storeChannelUsers', channelUsers)
  }

};

export default actions;
