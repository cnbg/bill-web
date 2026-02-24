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
]
