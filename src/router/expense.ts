export default [
  {
    path: '/expense/list',
    name: 'expense.list',
    component: () => import('@/pages/expense/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'expense.view',
    },
  },
  {
    path: '/expense/show/:id',
    name: 'expense.show',
    component: () => import('@/pages/expense/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'expense.view',
    },
  },
  {
    path: '/expense/create',
    name: 'expense.create',
    component: () => import('@/pages/expense/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'expense.create',
    },
  },
  {
    path: '/expense/edit/:id',
    name: 'expense.edit',
    component: () => import('@/pages/expense/EditPage.vue'),
    meta: {
      auth: true,
      perm: 'expense.edit',
    },
  },
]
