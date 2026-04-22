export default [
  {
    path: '/role/list',
    name: 'role.list',
    component: () => import('@/pages/role/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'role.view',
    },
  },
  {
    path: '/role/show/:id',
    name: 'role.show',
    component: () => import('@/pages/role/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'role.view',
    },
  },
  {
    path: '/role/create',
    name: 'role.create',
    component: () => import('@/pages/role/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'role.create',
    },
  },
  {
    path: '/role/edit/:id',
    name: 'role.edit',
    component: () => import('@/pages/role/EditPage.vue'),
    meta: {
      auth: true,
      perm: 'role.edit',
    },
  },
]
