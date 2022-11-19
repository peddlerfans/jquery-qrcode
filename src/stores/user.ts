import {getCookie, removeCookie, setCookie} from "@/utils"
import {useRouter} from "vue-router";
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"

const router=useRouter()

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





      // return new Promise((resolve, reject) => {
      //   request.post<Stores.user>('/api/auth/login', {
      //     email:username, password
      //   }).then((res:any) => {
      //     // const { data, msg } = res
      //     if (res.success) {
      //       // this.name = username
      //       // this.email = data.email || DEFAULT_EMAIL
      //       // this.avatar_url = data.avatar_url || DEFAULT_AVATAR
      //       // this.token = `${encodeURIComponent(username)}Token`
      //       //
      //       // setCookie('token', this.token)
      //       this.getOauthUserInfo().then()
      //
      //     } else {
      //       reject('Login failed!')
      //     }
      //   })
      // })
    },
    async logout() {
      return new Promise((resolve) => {
        this.name = ''
        this.email = ''
        this.avatar_url = ''
        this.token = ''
        request.post<Stores.user>('/api/auth/logout').then((res:any) => {
          const { msg } = res
          // removeCookie('token')
          message.success(msg)
          resolve(msg)
          router.push('/login')
        })
      })
    },
    // async getUserInfo(token: string): Promise<string> {
    //   return new Promise((resolve, reject) => {
    //     request.get<Stores.user>('/user/info', {
    //       params: {
    //         token: token
    //       }
    //     }).then((res:any) => {
    //       const { data, msg } = res
    //       if (data) {
    //         this.name = data.name
    //         this.age = data.age
    //         this.sex = data.sex
    //         this.token = token
    //         setCookie('token', this.token)
    //         resolve(msg)
    //       } else {
    //         reject(msg)
    //       }
    //     })
    //   })
    // },
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
            // setCookie('token', this.token)
            // console.log(getCookie('token'))

            resolve('Login successful')
          } else {
            reject(res.error)
          }
        }).catch((res:any)=>{
          console.log('catch')
          console.log(res)
          console.log(router)
          reject(res.error)
          // router.push('/login')
        })
      })
    }
  }
})