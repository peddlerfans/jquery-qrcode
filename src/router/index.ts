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
      meta: { title: 'Dashboard', icon: HomeOutlined }
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
    name: 'awmodeler',
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
    name: 'templatemanager',
    component: Layout,
    redirect: { name: 'staticTemplate' },
    meta: { title:'Template Manager',icon:ExportOutlined,breadcrumb: false },
    children: [
      {
        path: 'meta',
        name: 'metaTemplate',
        component: () => import('@/views/metatemplate.vue'),
        meta: { title: 'Meta Template', icon: FieldBinaryOutlined, keepAlive: true }
      },
      {
        path: 'static',
        name: 'staticTemplate',
        component: () => import('@/views/statictemplate.vue'),
        meta: { title: 'Static Template', icon: LineChartOutlined, keepAlive: true }
      },{
        path: 'dynamic',
        name: 'pairwiseTemplate',
        component: () => import('@/views/dynamictemplate.vue'),
        meta: { title: 'Dynamic Template', icon: FireOutlined, keepAlive: true }
      },{
        path: 'codegen',
        name: 'codegenTemplate',
        component: () => import('@/views/codegentemplate.vue'),
        meta: { title: 'Codegen Template', icon: CodeOutlined, keepAlive: true }
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
    name: 'mbtmodeler',
    component: Layout,
    redirect: { name: 'mbtmodeler' },    
    children: [
      {
        path: ':_id/:name',
        name: 'mbtmodeler',
        component: () => import('@/views/mbtmodeler.vue'),
        meta: { hidden: true, title: 'Mbtmodeler', icon: LayoutOutlined }
      }
    ], 
    beforeEnter(to,form,next){
      let pathname =`${to.params.name}`;
      if(to.path==`/mbtmodeler/${to.params._id}/`+encodeURIComponent(pathname)){
          
        to.meta.title=`MBTModel `+pathname
       
        }
        next()
      }
  },
  {
    path: '/metaModeler',
    name: 'MetaModeler',
    component: Layout,
    redirect: { name: 'metaModeler' },    
    children: [
      {
        path: ':_id/:name',
        name: 'metaModeler',
        component: () => import('@/views/metaModel.vue'),
        meta: { hidden: true, title: 'MetaModel', icon: LayoutOutlined }
      }
    ],
    beforeEnter(to,form,next){
    if(to.params._id && to.params.name){
      to.meta.title=`MetaModel ${to.params.name}`
      }
      next()
    }
  },
  {
    path: '/dynamicModeler',
    name: 'DynamicModeler',
    component: Layout,
    redirect: { name: 'dynamicModeler' },
    children: [
      {
        path: ':_id/:name',
        name: 'dynamicModeler',
        component: () => import('@/views/dynamicModel.vue'),
        meta: { hidden: true, title: 'DynamicModeler', icon: LayoutOutlined }
      }
    ],
    beforeEnter(to,form,next){
      if(to.params._id && to.params.name){
        to.meta.title=`dynamicModeler ${to.params.name}`
      }
      next()
    }
  },
  {
    path: '/staticModeler',
    name: 'staticmodeler',
    component: Layout,
    redirect: { name: 'staticmodeler' },    
    children: [
      {
        path: ':_id/:name',
        name: 'staticmodeler',
        component: () => import('@/views/statictemplateModeler.vue'),
        meta: { hidden: true, title: 'Static Template Modeler', icon: LayoutOutlined }
      }
    ], 
    beforeEnter(to,form,next){
      let pathname =`${to.params.name}`;
      if(to.path==`/staticModeler/${to.params._id}/`+encodeURIComponent(pathname)){
          
        to.meta.title=`Static `+pathname
       
        }
        next()
      }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [dashboardRoute, ...routes, ...constantRoutes]
})

export default router