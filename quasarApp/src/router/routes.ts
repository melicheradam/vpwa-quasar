import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    //main app pages
    children: [
      { path: '', component: () => import('src/pages/Main.vue') },

    ],
  },
  {
    path: '/login/',
    component: () => import('layouts/LoginLayout.vue'),
    //pages when logged out
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'create-user/', component: () => import('pages/Registration.vue') },
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
