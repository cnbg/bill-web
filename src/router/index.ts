import { createRouter, createWebHistory } from 'vue-router'

import homeRoutes from './home'
import authRoutes from './auth'
import regionRoutes from './region'
import districtRoutes from './district'
import orgTypeRoutes from './org-type'
import orgRoutes from './org'
import roleRoutes from './role'
import clientTypeRoutes from './client-type'
import clientRoutes from './client'
import rateRoutes from './rate'
import paymentRoutes from './payment'
import chargeRoutes from './charge'
import expenseRoutes from './expense'
import balanceRoutes from './balance'
import userRoutes from './user'
import articleRoutes from './article'
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
    ...roleRoutes,
    ...clientTypeRoutes,
    ...clientRoutes,
    ...rateRoutes,
    ...paymentRoutes,
    ...chargeRoutes,
    ...expenseRoutes,
    ...balanceRoutes,
    ...userRoutes,
    ...articleRoutes,
    ...errorRoutes,
  ],
})

router.beforeEach((to) => {
})

export default router
