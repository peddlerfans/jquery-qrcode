import { removeCookie, setCookie } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"

export const userStore = defineStore('user', {
  state: (): Stores.user => ({
    name: '',
    age: null,
    sex: 'unknown',
    token: ''
  }),
  actions: {
    async login(username: string, password: string) {
      const data ={username,password};
      return new Promise((resolve, reject) => {

        // request({
        //   url: '/user/login',
        //   method: 'post',
        //   data
        // }).then((res:any) => {
        //   const { data, msg } = res
        //   if (data) {
        //     this.name = data.name
        //     this.age = data.age
        //     this.sex = data.sex
        //     this.token = `${username}Token`
        //     setCookie('token', this.token)
        //     resolve(msg)
        //   } else {
        //     reject(msg)
        //   }
        // })


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
        // request<Stores.user>({
        //   url: '/user/logout',
        //   method: 'get',
          
        // }).then((res:any) => {
        //   const { msg } = res
        //   removeCookie('token')
        //   message.success(msg)
        //   resolve(msg)
        // })
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
        // request<Stores.user>({
        //   url: '/user/logout',
        //   method: 'get',
        //   params: {
        //     token: token
        //   }
        // }).then((res:any) => {
        //   const { data, msg } = res
        //   if (data) {
        //     this.name = data.name
        //     this.age = data.age
        //     this.sex = data.sex
        //     this.token = token
        //     setCookie('token', this.token)
        //     resolve(msg)
        //   } else {
        //     reject(msg)
        //   }
        // })
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
    }
  }
})