import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: () => ({ name: 'login' })
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    meta: { guestOnly: true },
    //pages when logged out
    children: [
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register/', name: 'register', component: () => import('pages/Registration.vue') },
    ],
  },
  {
    path: '/channel',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    //pages when logged out
    children: [
      { path: ':channelID',component: () => import('src/pages/Main.vue')},
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
