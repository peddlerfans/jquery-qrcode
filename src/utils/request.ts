import { message } from 'ant-design-vue'
import axios from 'axios'
import { getCookie, setCookie } from '.'
import { useRouter } from "vue-router"

const router=useRouter()

const go2login=()=>{
    router.push('/login')
}

const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  // withCredentials: true,
  timeout: 60000
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

      // if (error.response?.status == 401 && error.request?.custom.options.url == '/api/auth/login'){
      //     console.log("401")
      //     setCookie('redirect_url',window.location.href)
      //     go2login()
      // }
    return Promise.reject(error)
  }
)

export default request