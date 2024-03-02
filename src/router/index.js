import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Front',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFound.vue')
      },
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
      },
      {
        path: 'blog',
        component: () => import('@/views/UserBlog.vue')
      },
      {
        path: 'article/:articleId',
        component: () => import('@/views/UserArticle.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('@/views/UserCheckout.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('@/views/UserProduct.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'order',
        component: () => import('../views/dashboard/OrderView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/dashboard/ProductsView.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/dashboard/CouponView.vue')
      },
      {
        path: 'blog',
        component: () => import('../views/dashboard/ArticleView.vue')
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
