export default [
  {
    path: '/payment/list',
    name: 'payment.list',
    component: () => import('@/pages/payment/ListPage.vue'),
    meta: {
      auth: true,
      perm: 'payment.view',
    },
  },
  {
    path: '/payment/show/:id',
    name: 'payment.show',
    component: () => import('@/pages/payment/ShowPage.vue'),
    meta: {
      auth: true,
      perm: 'payment.view',
    },
  },
]
