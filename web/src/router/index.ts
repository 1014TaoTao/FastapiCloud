import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/user/index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/create',
    name: 'createUser',
    component: () => import('../views/user/components/add.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id/edit',
    name: 'editUser',
    component: () => import('../views/user/components/edit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id',
    name: 'userDetail',
    component: () => import('../views/user/components/detail.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 需要认证但未登录，重定向到登录页
    next({ name: 'login' })
  } else if (to.path === '/login' && isAuthenticated) {
    // 已登录但访问登录页，重定向到首页
    next({ name: 'home' })
  } else {
    // 其他情况正常导航
    next()
  }
})

export default router