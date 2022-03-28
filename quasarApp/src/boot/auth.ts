/* eslint-disable @typescript-eslint/no-unused-vars */
import { boot } from 'quasar/wrappers'

export default boot(({ app, router, store }) => {
  // something to do
  router.beforeEach((to, from, next) => {
    /*
    // tu sa vzdy spytaj API ci si autorizovany, to kukne do DB ci je platna session
    if(to.fullPath !== '/login'){
        next('/login')
    }
    */
    next()
  })
  
})

