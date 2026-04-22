export default [
  {
    path: '/org-type/list',
    name: 'org-type.list',
    component: () => import('@/pages/org-type/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'org-type.view',
    },
  },
  {
    path: '/org-type/show/:id',
    name: 'org-type.show',
    component: () => import('@/pages/org-type/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'org-type.view',
    },
  },
  {
    path: '/org-type/create',
    name: 'org-type.create',
    component: () => import('@/pages/org-type/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'org-type.create',
    },
  },
  {
    path: '/org-type/edit/:id',
    name: 'org-type.edit',
    component: () => import('@/pages/org-type/EditPage.vue'),
    meta: {
      auth: true,
      perm: 'org-type.edit',
    },
  },
]
