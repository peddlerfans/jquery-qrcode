import { removeCookie, setCookie } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"
import { EnumBody } from "@babel/types"
import {realMBTUrl} from "@/appConfig";
import { func } from "vue-types"

interface IElementType {
  type:string
}
interface mbtmodel {
  attributes?:any
  dataDafinition?: any
  modelDefinition?:any
  name?:string
  _id?:string
  tags?:Array<string>
  description?:string
}
export const MBTStore = defineStore('mbtmodel', {
  state:  () => {
    return {
      aa:{
        attributes:{},
        dataDafinition: {},
        modelDefinition:{},
        name:"",
        _id:"",
        tags:[],
        description:""
      }
    }
    
  }
  ,
  getters:{
    getAw:(state) => state
  },
  actions: {
    // 获取后台所有的mbt数据
    getMbtmodel(id:any){
      request.get(`${realMBTUrl}/${id}`).then((res)=>{
        this.aa=JSON.parse(JSON.stringify(res))
        return res
      })
      
    },
    // 添加和修改link的函数
    
  }
})

export default MBTStore