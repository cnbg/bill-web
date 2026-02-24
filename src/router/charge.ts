export default [
  {
    path: '/charge/list',
    name: 'charge.list',
    component: () => import('@/pages/charge/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'charge.view',
    },
  },
  {
    path: '/charge/show/:id',
    name: 'charge.show',
    component: () => import('@/pages/charge/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'charge.view',
    },
  },
]
