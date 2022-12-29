import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { appTitle } from './appConfig'
import {getCookie, removeCookie, setCookie} from './utils'
import { userStore } from './stores/user'
import { message } from 'ant-design-vue'
import request from "@/utils/request";
import {Stores} from "../types/stores";
import {i18n} from '@/locales'

NProgress.configure({ showSpinner: false })

const { t } = i18n.global

const whitelist: string[] = ['/login', '/404']
let scrollTimeout: any | null = null
let contentWindowDom: HTMLElement | null = null

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 设置页面标题
  document.title = `${t(to.meta.title as string)}-${appTitle}`
  // 路径命中白名单，放行通过
  if (whitelist.includes(to.path)){
    next()
  } else {
    const user = userStore()
// console.log("permission check")
//     console.log(user)
    if (!user.name) {
      try {
        console.log("no user name")
        await user.getUserInfo()
        // console.log(user)
        next()
      } catch (e) {
        console.log(e)
        // message.warning('User not logged, please login')
        // removeCookie('token') // 清除cookie
        next('/login')
      }
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
  scrollTimeout && clearTimeout(scrollTimeout)
  if (from.path === '/') return
  scrollTimeout = setTimeout(() => {
    if (contentWindowDom) {
      contentWindowDom.scrollTo({ top: 0, left: 0 })
      return
    }
    contentWindowDom = document.querySelector('#content-window')
    if (contentWindowDom) {
      contentWindowDom.scrollTo({ top: 0, left: 0 })
    }
  }, 350)
})
