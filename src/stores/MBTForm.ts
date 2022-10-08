import { removeCookie, setCookie } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"
import { EnumBody } from "@babel/types"

interface IElementType {
  type:string
}
// name: "multimedia",
// description: "Play multimedia files locally",
// tags: ["Multimedia", "OS"],
// // keep modelData open right now
// modelDefinition: {  },
// dataDefinition: {
//     resources: [
//         {
//             name: "phone1",
//             type: "sut"
//         },
//         {
//             name: "phone2",
//             type: "sut"
//         }
//     ],
//     // static or dynamic(Pairwise), default is static
//     dataType: "number",

//     // either use dataUrl or data
//     dataUrl: "http://localhost",


//     data: [],
//     // meta 
//     metaTemplate: "template{}",
//     meta: []
// }
export const awStore = defineStore('aw', {
  state: (): Stores.aw => ({
    _id:'',
    name: '',
    description: '',
    tags: [],
    params: []
    
  }),
  actions: {
    // async login(username: string, password: string) {
    //   const data ={username,password};
    //   return new Promise((resolve, reject) => {
    //     request.post<Stores.user>('/user/login', {
    //       username, password
    //     }).then((res:any) => {
    //       const { data, msg } = res
    //       if (data) {
    //         this.name = data.name
    //         this.age = data.age
    //         this.sex = data.sex
    //         this.token = `${username}Token`
    //         setCookie('token', this.token)
    //         resolve(msg)
    //       } else {
    //         reject(msg)
    //       }
    //     })
    //   })
    // },
    // async logout() {
    //   return new Promise((resolve) => {
    //      request.get<Stores.user>('/user/logout').then((res:any) => {
    //       const { msg } = res
    //       removeCookie('token')
    //       message.success(msg)
    //       resolve(msg)
    //     })
    //   })
    // },
    // async getMBTInfo(elementType:IElementType): Promise<string> {
      // return new Promise((resolve, reject) => {
      //   request.get<Stores.user>('/user/info', {
      //     params: {
      //       token: token
      //     }
      //   }).then((res:any) => {
      //     const { data, msg } = res
      //     if (data) {
      //       this.name = data.name
      //       this.age = data.age
      //       this.sex = data.sex
      //       this.token = token
      //       setCookie('token', this.token)
      //       resolve(msg)
      //     } else {
      //       reject(msg)
      //     }
      //   })
      // })
    // }
  }
})