export default [
  {
    path: '/balance/list',
    name: 'balance.list',
    component: () => import('@/pages/balance/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'balance.view',
    },
  },
  {
    path: '/balance/show/:id',
    name: 'balance.show',
    component: () => import('@/pages/balance/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'balance.view',
    },
  },
]
