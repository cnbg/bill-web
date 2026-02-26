export default [
  {
    path: '/user/list',
    name: 'user.list',
    component: () => import('@/pages/user/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'user.view',
    },
  },
  {
    path: '/user/show/:id',
    name: 'user.show',
    component: () => import('@/pages/user/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'user.view',
    },
  },
]
