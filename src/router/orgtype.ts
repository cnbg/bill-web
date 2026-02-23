export default [
  {
    path: '/orgtype/list',
    name: 'org-type.list',
    component: () => import('@/pages/orgtype/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'org-type.view',
    },
  },
  {
    path: '/orgtype/show/:id',
    name: 'org-type.show',
    component: () => import('@/pages/orgtype/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'org-type.view',
    },
  },
]
