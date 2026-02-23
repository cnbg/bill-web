import { createRouter, createWebHistory } from 'vue-router'

import homeRoutes from './home'
import authRoutes from './auth'
import regionRoutes from './region'
import orgRoutes from './org'
import paymentRoutes from './payment'
import errorRoutes from './error'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
    ...regionRoutes,
    ...orgRoutes,
    ...paymentRoutes,
    ...errorRoutes,
  ],
})

router.beforeEach((to) => {
})

export default router
