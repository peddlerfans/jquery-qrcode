import { message } from 'ant-design-vue'
import axios from 'axios'
import { getCookie, setCookie } from '.'
// import { useRoute, useRouter } from "vue-router";
import router from '@/router'

const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  // withCredentials: true,
  timeout: 60000,
  maxContentLength: 1024 * 1024 * 20,
  maxBodyLength: 1024 * 1024 * 20
})

const token = getCookie('token')

request.interceptors.request.use(
  config => {
    if (config.headers && token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code == 400) {
      // message.error(`错误码${code}：${msg || '未知错误'}`, 5)
      message.error("请求失败，请重试")
      return Promise.reject(new Error("请求失败，请重试"))
    } else {
      return response.data
    }
  },
  error => {
        console.log('request-error')
      // let router = useRouter()
      if (error.response?.status == 401 && error.request?.custom.options.url != '/api/auth/login'){
          console.log("401##"+error.request?.custom.options.url)
          router.push({name:'Login', query:{redirect_url:window.location.href}})
      }
    return Promise.reject(error)
  }
)

export default request