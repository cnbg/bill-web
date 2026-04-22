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
  {
    path: '/region/create',
    name: 'region.create',
    component: () => import('@/pages/region/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'region.create',
    },
  },
  {
    path: '/region/edit/:id',
    name: 'region.edit',
    component: () => import('@/pages/region/EditPage.vue'),
    meta: {
      auth: true,
      perm: 'region.edit',
    },
  },
]
