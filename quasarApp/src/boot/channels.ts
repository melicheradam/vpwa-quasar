/* eslint-disable @typescript-eslint/no-unused-vars */

import { boot } from 'quasar/wrappers'
import ChannelService from 'src/services/ChannelService'
import { getChannelByID } from 'src/utils/GettersHelper'

export default boot(({ app, router, store }) => {
    // something to do
    router.beforeEach((to, from, next) => {
        // change to new channel
        if (to.path.indexOf('channel') !== -1) {
            const toChannel = Number(to.params.channelID)
            store.commit('channels/SET_ACTIVE', toChannel)
            if(!isNaN(toChannel))
                void store.dispatch('channels/loadUsers', {channel: toChannel})
        }

        next()
    })

})

