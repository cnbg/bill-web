export default [
  {
    path: '/article/list',
    name: 'article.list',
    component: () => import('@/pages/article/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'article.view',
    },
  },
  {
    path: '/article/show/:id',
    name: 'article.show',
    component: () => import('@/pages/article/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'article.view',
    },
  },
  {
    path: '/article/create',
    name: 'article.create',
    component: () => import('@/pages/article/CreatePage.vue'),
    meta: {
      auth: true,
      perm: 'article.create',
    },
  },
  {
    path: '/article/edit/:id',
    name: 'article.edit',
    component: () => import('@/pages/article/EditPage.vue'),
    meta: {
      auth: true,
      perm: 'article.edit',
    },
  },
]
