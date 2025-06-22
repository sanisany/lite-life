import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "login",
      path: "/login",
      component: () => import('@/views/login/Index.vue')
    },
    {
      name: "logout",
      path: "/logout",
      component: () => import('@/views/logout/Index.vue')
    },
    {
      name: "base",
      path: "/",
      component: () => import('@/layouts/baseLayout/Index.vue'),
      children:[
        {
          name: "dashboard",
          path: "/dashboard",
          component: () => import('@/views/dashboard/Index.vue')
        }
      ]
    }
  ],
})

export default router
