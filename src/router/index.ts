import { createRouter, createWebHistory } from 'vue-router'

import homeRoutes from './home'
import authRoutes from './auth'
import regionRoutes from './region'
import districtRoutes from './district'
import orgTypeRoutes from './orgtype'
import orgRoutes from './org'
import paymentRoutes from './payment'
import errorRoutes from './error'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
    ...regionRoutes,
    ...districtRoutes,
    ...orgTypeRoutes,
    ...orgRoutes,
    ...paymentRoutes,
    ...errorRoutes,
  ],
})

router.beforeEach((to) => {
})

export default router
