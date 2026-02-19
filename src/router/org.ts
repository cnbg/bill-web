export default [
  {
    path: '/org/list',
    name: 'org.list',
    component: () => import('@/pages/org/ListPage.vue'),
    meta: {
      title: 'org_list',
      auth: true,
      perm: 'org.view',
    },
  },
]
