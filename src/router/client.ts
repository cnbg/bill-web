export default [
  {
    path: '/client/list',
    name: 'client.list',
    component: () => import('@/pages/client/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'client.view',
    },
  },
  {
    path: '/client/show/:id',
    name: 'client.show',
    component: () => import('@/pages/client/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'client.view',
    },
  },
  {
    path: '/client/create',
    name: 'client.create',
    component: () => import('@/pages/client/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'client.create',
    },
  },
]
