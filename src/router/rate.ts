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
    path: '/rate/create',
    name: 'rate.create',
    component: () => import('@/pages/rate/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'rate.create',
    },
  },
  {
    path: '/rate/edit/:id',
    name: 'rate.edit',
    component: () => import('@/pages/rate/EditPage.vue'),
    meta: {
      auth: true,
      perm: 'rate.edit',
    },
  },
]
