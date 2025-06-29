import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      name: "header-only",
      path: "/",
      component: () => import('@/layouts/HeaderOnlyLayout.vue'),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import('@/views/Login.vue')
        },
        {
          name: "register",
          path: "/register",
          component: () => import('@/views/Register.vue')
        },
        {
          name: "reset",
          path: "/reset",
          component: () => import('@/views/ForgetPassword.vue')
        },
        {
          name: "logout",
          path: "/logout",
          component: () => import('@/views/Logut.vue')
        },
        {
          name: "404",
          path: "/:pathMatch(.*)*",
          component: () => import('@/views/NotFound.vue')
        },
      ]
    },
    {
      name: "base",
      path: "/",
      component: () => import('@/layouts/ManagementLayout.vue'),
      children: [
        {
          name: "dashboard",
          path: "/dashboard",
          component: () => import('@/views/dashboard/Index.vue')
        }
      ]
    }
  ],
})

// 路由前置守卫
const whiteList = ['/login', '/register', '/forgetPassword', '/logout', '/404']

const isUserLoggedIn = () => {
  // 这里可以根据实际情况修改，比如检查 localStorage 中的 token
  return !!localStorage.getItem('token')
}

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next()
  } else if (isUserLoggedIn()) {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath } // 记录用户原本要访问的路由
    })
  }
})
export default router
