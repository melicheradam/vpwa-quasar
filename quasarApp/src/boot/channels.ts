import { boot } from 'quasar/wrappers'
import { getChannelByID } from 'src/utils/GettersHelper'

export default boot(({ app, router, store }) => {
    // something to do
    router.beforeEach((to, from, next) => {
        // change to new channel

        if (to.path.indexOf('channel') !== -1) {
            const serverObj = getChannelByID(Number(to.params.channelID))

            store.commit('app/storeCurrentChannel', serverObj)
        }


        next()
    })

})

