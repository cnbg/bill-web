export default [
  {
    path: '/region/list',
    name: 'region.list',
    component: () => import('@/pages/region/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'region.view',
    },
  },
  {
    path: '/region/show/:id',
    name: 'region.show',
    component: () => import('@/pages/region/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'region.view',
    },
  },
]
