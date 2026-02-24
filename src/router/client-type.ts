export default [
  {
    path: '/client-type/list',
    name: 'client-type.list',
    component: () => import('@/pages/client-type/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'client-type.view',
    },
  },
  {
    path: '/client-type/show/:id',
    name: 'client-type.show',
    component: () => import('@/pages/client-type/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'client-type.view',
    },
  },
]
