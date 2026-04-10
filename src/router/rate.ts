export default [
  {
    path: '/rate/list',
    name: 'rate.list',
    component: () => import('@/pages/rate/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'rate.view',
    },
  },
  {
    path: '/rate/show/:id',
    name: 'rate.show',
    component: () => import('@/pages/rate/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'rate.view',
    },
  },
]
