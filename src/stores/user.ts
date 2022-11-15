import {getCookie, removeCookie, setCookie} from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"

export const userStore = defineStore('user', {
  state: (): Stores.user => ({
    name: '',
    age: null,
    sex: 'unknown',
    token: '',
    email: 'example@oppo.com',
    avatar_url: 'https://avatars.dicebear.com/v2/female/2fbcf95095f75f17153ca201cd277611.svg',
  }),
  actions: {
    async login(username: string, password: string) {
      const data ={username,password};
      return new Promise((resolve, reject) => {
        request.post<Stores.user>('/user/login', {
          username, password
        }).then((res:any) => {
          const { data, msg } = res
          if (data) {
            this.name = data.name
            this.age = data.age
            this.sex = data.sex
            this.token = `${username}Token`
            setCookie('token', this.token)
            resolve(msg)
          } else {
            reject(msg)
          }
        })
      })
    },
    async logout() {
      return new Promise((resolve) => {
         request.get<Stores.user>('/user/logout').then((res:any) => {
          const { msg } = res
          removeCookie('token')
          message.success(msg)
          resolve(msg)
        })
      })
    },
    async getUserInfo(token: string): Promise<string> {
      return new Promise((resolve, reject) => {
        request.get<Stores.user>('/user/info', {
          params: {
            token: token
          }
        }).then((res:any) => {
          const { data, msg } = res
          if (data) {
            this.name = data.name
            this.age = data.age
            this.sex = data.sex
            this.token = token
            setCookie('token', this.token)
            resolve(msg)
          } else {
            reject(msg)
          }
        })
      })
    },
    async getOauthUserInfo(): Promise<string> {
      return new Promise((resolve, reject) => {
        request.get<Stores.user>('/api/user_profile').then((res:any) => {
          console.log("getOauthUserInfo")
          console.log(res)
          if (!res.error) {
            this.name = res.name
            this.email = res.email
            this.avatar_url = res.avatar_url
            this.token = `${res.name}Token`
            setCookie('token', this.token)
            console.log(getCookie('token'))
            resolve('Login successful')

          } else {
            reject(res.error)
          }
        })
      })
    }
  }
})