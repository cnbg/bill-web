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
  {
    path: '/client-type/create',
    name: 'client-type.create',
    component: () => import('@/pages/client-type/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'client-type.create',
    },
  },
  {
    path: '/client-type/edit/:id',
    name: 'client-type.edit',
    component: () => import('@/pages/client-type/EditPage.vue'),
    meta: {
      auth: true,
      perm: 'client-type.edit',
    },
  },
]
