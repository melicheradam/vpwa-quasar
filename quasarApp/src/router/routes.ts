import { RouteRecordRaw } from 'vue-router';
import { Store } from 'vuex';

const makeRoutes = (store: Store<any>): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      name: 'home',
      component: () => import('layouts/MainLayout.vue'),
      redirect: () => ({ name: 'channel' })
    },
    {
      path: '/auth',
      component: () => import('layouts/LoginLayout.vue'),
      //pages when logged out
      children: [
        { path: 'login', name: 'login', meta: { guestOnly: true }, component: () => import('pages/Login.vue') },
        { path: 'register', name: 'register', meta: { guestOnly: true }, component: () => import('pages/Registration.vue') },
      ],
    },
    {
      path: '/channel',
      component: () => import('layouts/MainLayout.vue'),
      name: 'channel',
      meta: { requiresAuth: true },
      //pages when logged out
      children: [
        { path: '', meta: { requiresAuth: true }, component: () => import('src/pages/Main.vue')},
        { path: ':channelID', meta: { requiresAuth: true }, component: () => import('src/pages/Main.vue'),
          beforeEnter: (to, from, next) => {

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
          },
          
        },
      ],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/Error404.vue'),
    },
  ];
  return routes
}

export default makeRoutes;
