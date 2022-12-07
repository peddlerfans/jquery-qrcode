import {getCookie, removeCookie, setCookie} from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"


const DEFAULT_AVATAR='https://avatars.dicebear.com/v2/female/2fbcf95095f75f17153ca201cd277611.svg'
const DEFAULT_EMAIL='example@oppo.com'

export const userStore = defineStore('user', {

  state: (): Stores.user => ({
    name: '',
    token: '',
    email: '',
    avatar_url: '',
  }),
  actions: {
    async login(username: string, password: string) {
      // const data ={username,password};
      try{
        let res:any = await request.post<Stores.user>('/api/auth/login', {
          email:username, password
        })
        if (res.success){
          let res1 = await this.getUserInfo()
          console.log(res1)
          return res1
        }
      }catch (e) {
        console.log(e)
      }

    },
    async logout() {
      return new Promise((resolve) => {
        this.name = ''
        this.email = ''
        this.avatar_url = ''
        this.token = ''
        request.post<Stores.user>('/api/auth/logout').then((res:any) => {
          // const { msg } = res
          console.log('logout')
          console.log(res)
          removeCookie('redirect_url')
          message.success("Logout successful")
          resolve("Logout successful")
          // router.push('/login')
        })
      })
    },
    async getUserInfo(): Promise<string> {
      return new Promise((resolve, reject) => {
        request.get<Stores.user>('/api/user_profile').then((res:any) => {
          console.log("getOauthUserInfo")
          console.log(res)
          if (!res.error) {
            this.name = res.name
            this.email = res.email
            this.avatar_url = res.avatar_url || DEFAULT_AVATAR
            this.token = `${encodeURIComponent(res.name)}`

            resolve('Login successful')
          } else {
            reject(res.error)
          }
        }).catch((res:any)=>{
          console.log('catch')
          console.log(res)
          reject('User not logged, please login')
        })
      })
    }
  }
})