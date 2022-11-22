import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'
import {
  GithubOutlined, TableOutlined, HomeOutlined, BlockOutlined, ExportOutlined, FireOutlined,
  DotChartOutlined, BarChartOutlined, FieldBinaryOutlined, LineChartOutlined,
  AppstoreAddOutlined, CodeOutlined, LayoutOutlined, ApiOutlined, ApartmentOutlined
} from '@ant-design/icons-vue'

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
      meta: { title: 'component.route.dashboard', icon: HomeOutlined }
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
  },


  {
    path: '/awmodeler',
    name: 'Awmodeler',
    component: Layout,
    redirect: { name: 'awmodeler' },
    meta: { title: 'component.route.awModeler', icon: ApiOutlined },
    children: [
      {
        path: 'index',
        name: 'awmodeler',
        component: () => import('@/views/awmodeler.vue'),
        meta: { title: 'component.route.awModeler', icon: ApiOutlined, keepAlive: true }
      }
    ]
  }
  ,


  {
    path: '/mbtstore',
    name: 'Mbtstore',
    component: Layout,
    redirect: { name: 'mbtstore' },
    meta: { title: 'component.route.mtbStore', icon: AppstoreAddOutlined },
    children: [
      {
        path: 'index',
        name: 'mbtstore',
        component: () => import('@/views/mbtstore.vue'),
        meta: { title: 'component.route.mtbStore', icon: AppstoreAddOutlined, keepAlive: true }
      }
    ]

  },
  {
    path: '/templatemanager',
    name: 'templatemanager',
    component: Layout,
    redirect: { name: 'staticTemplate' },
    meta: { title: 'component.route.templateManager', icon: ExportOutlined },
    children: [
      {
        path: 'meta',
        name: 'metaTemplate',
        component: () => import('@/views/metatemplate.vue'),
        meta: { title: 'component.route.metaTemplate', icon: FieldBinaryOutlined, keepAlive: true }
      },
      {
        path: 'static',
        name: 'staticTemplate',
        component: () => import('@/views/statictemplate.vue'),
        meta: { title: 'component.route.staticTemplate', icon: LineChartOutlined, keepAlive: true }
      }, {
        path: 'dynamic',
        name: 'pairwiseTemplate',
        component: () => import('@/views/dynamictemplate.vue'),
        meta: { title: 'component.route.dynamicTemplate', icon: FireOutlined, keepAlive: true }
      }, {
        path: 'codegen',
        name: 'codegenTemplate',
        component: () => import('@/views/codegentemplate.vue'),
        meta: { title: 'component.route.codegenTemplate', icon: CodeOutlined, keepAlive: true }
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
        meta: { title: 'component.route.account', icon: ApartmentOutlined, keepAlive: true }
      }
    ]
  }
  ,
  {
    path: '/awupdate',
    name: 'AWupdate',
    component: Layout,
    redirect: { name: 'awupdate' },
    meta: { hidden: true },
    children: [
      {
        path: ':_id/:name/:awupdate/:mbtid?/:mbtname?',
        name: 'awupdate',
        component: () => import('@/views/updateAw.vue'),
        meta: { title: 'UpdateAw', icon: AppstoreAddOutlined, keepAlive: true }
      }
    ],
    beforeEnter(to, form, next) {
      if (to.params.awupdate == "mbtAW") {
        to.meta.title = `MbtUpdateAw-${to.params.name}`
      } else if (to.params.awupdate == "awmodeler") {
        to.meta.title = `AwUpdate-${to.params.name}`
      }
      next()
    }
  },
  {
    path: '/mbtmodeler',
    name: 'Mbtmodeler',
    component: Layout,
    redirect: { name: 'mbtmodeler' },
    meta: { hidden: true },
    children: [
      {
        path: ':_id/:name',
        name: 'mbtmodeler',
        component: () => import('@/views/mbtmodeler.vue'),
        meta: { title: 'mbtModel', icon: AppstoreAddOutlined, keepAlive: true }
      }
    ],
    beforeEnter(to, form, next) {
      let pathname = `${to.params.name}`;
      if (to.params._id) {

        to.meta.title = pathname

      }
      next()
    }
  },
  {
    path: '/metaModeler',
    name: 'MetaModeler',
    component: Layout,
    redirect: { name: 'metaModeler' },
    meta: { hidden: true },
    children: [
      {
        path: ':_id/:name',
        name: 'metaModeler',
        component: () => import('@/views/metaModel.vue'),
        meta: { hidden: true, title: 'MetaModel', icon: LayoutOutlined }
      }
    ],
    beforeEnter(to, form, next) {
      if (to.params._id && to.params.name) {
        to.meta.title = `MetaModel ${to.params.name}`
      }
      next()
    }
  },
  {
    path: '/dynamicModeler',
    name: 'DynamicModeler',
    component: Layout,
    redirect: { name: 'dynamicModeler' },
    meta: { hidden: true },
    children: [
      {
        path: ':_id/:name',
        name: 'dynamicModeler',
        component: () => import('@/views/dynamicModel.vue'),
        meta: { hidden: true, title: 'DynamicModeler', icon: LayoutOutlined }
      }
    ],
    beforeEnter(to, form, next) {
      if (to.params._id && to.params.name) {
        to.meta.title = `${to.params.name}`
      }
      next()
    }
  },
  {
    path: '/staticModeler',
    name: 'staticmodeler',
    component: Layout,
    redirect: { name: 'staticmodeler' },
    meta: { hidden: true },
    children: [
      {
        path: ':_id/:name',
        name: 'staticmodeler',
        component: () => import('@/views/statictemplateModeler.vue'),
        meta: { hidden: true, title: 'Static Template Modeler', icon: LayoutOutlined }
      }
    ],
    beforeEnter(to, form, next) {
      let pathname = `${to.params.name}`;
      if (to.path == `/staticModeler/${to.params._id}/` + encodeURIComponent(pathname)) {

        to.meta.title = `Static ` + pathname

      }
      next()
    }
  },
  {
    path: '/codegenModeler',
    name: 'CodegenModeler',
    component: Layout,
    redirect: { name: 'codegenModeler' },
    meta: { hidden: true },
    children: [
      {
        path: ':_id/:name',
        name: 'codegenModeler',
        component: () => import('@/views/codegenModel.vue'),
        meta: { hidden: true, title: 'CodegenModeler', icon: LayoutOutlined }
      }
    ],
    beforeEnter(to, form, next) {
      if (to.params._id && to.params.name) {
        to.meta.title = `${to.params.name}`
      }
      next()
    }
  },
  {
    path: '/codegenModeler',
    name: 'CodegenModeler',
    component: Layout,
    redirect: { name: 'codegenModeler' },
    meta: { hidden: true },
    children: [
      {
        path: ':_id/:name',
        name: 'codegenModeler',
        component: () => import('@/views/codegenModel.vue'),
        meta: { hidden: true, title: 'CodegenModeler', icon: LayoutOutlined }
      }
    ],
    beforeEnter(to, form, next) {
      if (to.params._id && to.params.name) {
        to.meta.title = `${to.params.name}`
      }
      next()
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Layout,
    meta: { title:'Settings',icon:ExportOutlined },
    children: [
      {
        path: 'webHook',
        name: 'webHook',
        component: () => import('@/views/settings/webHook.vue'),
        meta: { title: 'component.route.webHook', icon: FieldBinaryOutlined, keepAlive: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [dashboardRoute, ...routes, ...constantRoutes]
})

export default router
