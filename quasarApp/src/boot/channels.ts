/* eslint-disable @typescript-eslint/no-unused-vars */

import { boot } from 'quasar/wrappers'
import { getChannelByID } from 'src/utils/GettersHelper'

export default boot(({ app, router, store }) => {
    // something to do
    router.beforeEach((to, from, next) => {
        // change to new channel

        if (to.path.indexOf('channel') !== -1) {
            void store.dispatch('app/changeCurrentChannel', Number(to.params.channelID))
        }


        next()
    })

})

