import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Front',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: '/admin/order',
        component: () => import('../views/dashboard/OrderView.vue')
      },
      {
        path: '/admin/products',
        component: () => import('../views/dashboard/ProductsView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/dashboard/UserLogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
