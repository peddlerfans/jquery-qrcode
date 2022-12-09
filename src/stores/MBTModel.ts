import { removeCookie, setCookie } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"
import { EnumBody } from "@babel/types"
import {realMBTUrl} from "@/appConfig";

interface IElementType {
  mbtData:mbtmodel
}
interface templateattr {
  _id:string
  name:string
  descriptions:string
  condegen_text:string
  condegen_script:string
}
interface mbtmodel{
  attributes?:any
  dataDafinition?: any
  modelDefinition?:any
  name?:string
  _id?:string
  tags?:Array<string>
  description?:string,
  attributesTem:templateattr
}
export const MBTStore = defineStore('mbtmodel', {
  state:  ():IElementType => {
    return {
      mbtData:{
        attributes:{},
        dataDafinition: {},
        modelDefinition:{},
        name:"",
        _id:"",
        tags:[],
        description:"",
        attributesTem:{
          _id:"",
          name:'',
          descriptions:'',
          condegen_script:'',
          condegen_text:''
        }
      }
      
    }
    
  }
  ,
  getters:{
    getDafintion:(state) => state.mbtData.dataDafinition ,
    // changeTemplate(state){
    //   if(state.mbtData._id){
    //     state.mbtData.attributesTem._id = state.mbtData._id
    //   }
      
    // }
  },
  actions: {
    // 获取后台所有的mbt数据
    getMbtmodel(id:any){
      request.get(`${realMBTUrl}/${id}`).then((res)=>{
        this.mbtData=JSON.parse(JSON.stringify(res))
      })
      
    },
    // 添加和修改link的函数
    
  }
})

export default MBTStore



//  选择AW、 选择预期 修改Aw
// 点击上一个  aw之后，新加的一个aw无法编辑


// cd 文件夹
//crontab-1  修改每天修改信息
// less pull 进入文件中查看
// vim 为编辑文件内容
//ls -ltr查看当前文件夹中的文件
//zai  code下直接执行  ./redeploy.sh
