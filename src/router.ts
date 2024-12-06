import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Orders from './views/Orders.vue'
import Login from './views/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
