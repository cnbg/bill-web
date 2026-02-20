export default [
  {
    path: '/org/list',
    name: 'org.list',
    component: () => import('@/pages/org/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'org.view',
    },
  },
  {
    path: '/org/show/:id',
    name: 'org.show',
    component: () => import('@/pages/org/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'org.view',
    },
  },
]
