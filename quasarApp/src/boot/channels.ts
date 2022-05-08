/* eslint-disable @typescript-eslint/no-unused-vars */

import { boot } from 'quasar/wrappers'
import ChannelService from 'src/services/ChannelService'
import { getChannelByID } from 'src/utils/GettersHelper'

export default boot(({ app, router, store }) => {
    // something to do
    router.beforeEach((to, from, next) => {
        // change to new channel
        if (to.path.indexOf('channel') !== -1) {
            const channel = Number(to.params.channelID)
            if(!isNaN(channel)){
              void store.dispatch('channels/join', {channel: channel})
                
              store.commit('channels/SET_ACTIVE', {channel: channel})

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              if(store.state.channels.joinedChannels.length === 0)
                next({name: 'home'})

              void store.dispatch('channels/loadUsers', {channel: channel})
            }
            next()
        }

        next()
    })

})