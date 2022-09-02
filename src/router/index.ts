import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'
<<<<<<< HEAD
import mbtmodeler from '@/views/mbtmodeler.vue'
import mbtstore from '@/views/mbtstore.vue'
import { GithubOutlined, TableOutlined, HomeOutlined, BlockOutlined } from '@ant-design/icons-vue'
=======
import {
  GithubOutlined, TableOutlined, HomeOutlined, BlockOutlined, ExportOutlined, FireOutlined,
  DotChartOutlined, BarChartOutlined, FieldBinaryOutlined, LineChartOutlined,
  AppstoreAddOutlined, ProfileOutlined, LayoutOutlined, ApiOutlined, ApartmentOutlined
} from '@ant-design/icons-vue'
>>>>>>> cfb6473... 解析树形数据渲染表格

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
<<<<<<< HEAD
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
=======
>>>>>>> cfb6473... 解析树形数据渲染表格
    }
  ]
}




<<<<<<< HEAD
=======

>>>>>>> cfb6473... 解析树形数据渲染表格
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
<<<<<<< HEAD
  }

=======
  },

  {
    path: '/mbtstore',
    name: 'Mbtstore',
    component: Layout,
    redirect: { name: 'mbtstore' },
    meta: { breadcrumb: false },
    children: [
      {
        path: 'index',
        name: 'mbtstore',
        component: () => import('@/views/mbtstore.vue'),
        meta: { title: 'MBTStore', icon: AppstoreAddOutlined, keepAlive: true }
      }
    ]

  },
  {
    path: '/templatemanager',
    name: 'Templatemanager',
    component: Layout,
    redirect: { name: 'Templatemanager' },
    meta: { breadcrumb: false },
    children: [
      {
        path: 'index',
        name: 'Templatemanager',
        component: () => import('@/views/templatemanager.vue'),
        meta: { title: 'Template Manager', icon: ProfileOutlined, keepAlive: true }
      }
    ]
  }

  ,
  {
    path: '/awmodeler',
    name: 'Awmodeler',
    component: Layout,
    redirect: { name: 'awmodeler' },
    meta: { breadcrumb: false },
    children: [
      {
        path: 'index',
        name: 'awmodeler',
        component: () => import('@/views/awmodeler.vue'),
        meta: { title: 'AWModeler', icon: ApiOutlined, keepAlive: true }
      }
    ]
  }
  ,

  {
    path: '/account',
    name: 'Account',
    component: Layout,
    redirect: { name: 'account' },
    meta: { breadcrumb: false },
    children: [
      {
        path: 'index',
        name: 'account',
        component: () => import('@/views/account.vue'),
        meta: { title: 'Account', icon: ApartmentOutlined, keepAlive: true }
      }
    ]
  }
  ,
  {
    path: '/mbtmodeler',
    name: 'Mbtmodeler',
    component: Layout,
    redirect: { name: 'mbtmodeler' },    
    children: [
      {
        path: 'index',
        name: 'templatemanager',
        component: () => import('@/views/mbtmodeler.vue'),
        meta: { hidden: true, title: 'MBTModeler', icon: LayoutOutlined }
      }
    ]

  }
>>>>>>> cfb6473... 解析树形数据渲染表格
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [dashboardRoute, ...routes, ...constantRoutes]
})

export default router