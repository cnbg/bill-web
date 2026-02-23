export default [
  {
    path: '/district/list',
    name: 'district.list',
    component: () => import('@/pages/district/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'district.view',
    },
  },
  {
    path: '/district/show/:id',
    name: 'district.show',
    component: () => import('@/pages/district/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'district.view',
    },
  },
]
