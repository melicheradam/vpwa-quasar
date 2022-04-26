import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
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
      { path: ':channelID', meta: { requiresAuth: true }, component: () => import('src/pages/Main.vue')},
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
