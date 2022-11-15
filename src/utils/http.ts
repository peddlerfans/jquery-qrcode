import { message } from 'ant-design-vue'
import Axios from 'axios'
import { getCookie } from '.'

const http = Axios.create({
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    // withCredentials: true,
    timeout: 60000
})

const token = getCookie('token')

http.interceptors.request.use(
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

http.interceptors.response.use(
    response => {
        const { code, msg } = response.data
        if (code == 400) {
            // message.error(`错误码${code}：${msg || '未知错误'}`, 5)
            message.error("请求失败，请重试")
            return Promise.reject(new Error("请求失败，请重试"))
        } else {
            return response
        }
    },
    error => {
        console.error(error)
        // message.error(error.message, 5)
        return Promise.reject(error)
    }
)

export default http