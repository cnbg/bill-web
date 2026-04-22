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
  {
    path: '/district/create',
    name: 'district.create',
    component: () => import('@/pages/district/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'district.create',
    },
  },
  {
    path: '/district/edit/:id',
    name: 'district.edit',
    component: () => import('@/pages/district/EditPage.vue'),
    meta: {
      auth: true,
      perm: 'district.edit',
    },
  },
]
