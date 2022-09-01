import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'
import mbtmodeler from '@/views/mbtmodeler.vue'
import mbtstore from '@/views/mbtstore.vue'
import { GithubOutlined, TableOutlined, HomeOutlined, BlockOutlined } from '@ant-design/icons-vue'

export const dashboardRoute: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  meta: { breadcrumb: false },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard.vue'),
      meta: { title: 'Dashboard', icon: HomeOutlined }
    },
    {
      path: 'mbtstore',
      name: 'mbtstore',
      component: () => import('@/views/mbtstore.vue'),
      meta: { title: 'MBTStore', icon: TableOutlined }
    },
    {
      path: 'templatemanager',
      name: 'templatemanager',
      component: () => import('@/views/templatemanager.vue'),
      meta: { title: 'Template Manager', icon: TableOutlined }
    },
    // {
    //   path: 'mbtmodeler',
    //   name: 'mbtmodeler',
    //   component: () => import('@/views/mbtmodeler.vue'),
    //   // meta: { title: 'MBTModeler', icon: TableOutlined }
    // },

    {
      path: 'awmodeler',
      name: 'awmodeler',
      component: () => import('@/views/awmodeler.vue'),
      meta: { title: 'AWModeler', icon: BlockOutlined }
    }
  ]
}




const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true, title: '页面跳转', hiddenTab: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true, title: '404' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true },
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true, title: '登录' }
  }

]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [dashboardRoute, ...routes, ...constantRoutes]
})

export default router