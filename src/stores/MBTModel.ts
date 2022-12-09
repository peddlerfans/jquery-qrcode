import { removeCookie, setCookie } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"
import { EnumBody } from "@babel/types"
import {realMBTUrl} from "@/appConfig";

interface IElementType {
  mbtData:mbtmodel
  attributesTem:templateattr
}
interface templateattr {
  _id:string
  name:string
  description:string
  condegen_text:string
  condegen_script:string
}
interface codegen{
  codegen_text:string
  codegen_script:string
}

interface mbtmodel{
  attributes:codegen
  dataDafinition?: any
  modelDefinition?:any
  name:string
  _id:string
  tags?:Array<string>
  description:string,
}
export const MBTStore = defineStore('mbtmodel', {
  state:  ():IElementType => {
    return {
      mbtData:{
        attributes:{
          codegen_script:'',
          codegen_text:''
        },
        dataDafinition: {},
        modelDefinition:{},
        name:"",
        _id:"",
        tags:[],
        description:"",
      },
      attributesTem:{
        _id:'',
        name:'',
        description:'',
        condegen_script:'',
        condegen_text:''
      }
    }
    
  }
  ,
  getters:{
    getDafintion:(state) => state.mbtData.dataDafinition ,
    changeTemplate(state){
    //  return state.mbtData._id

      if(state.mbtData._id.length >0 ){
        // return state.mbtData
        
        state.attributesTem._id = state.mbtData._id
        state.attributesTem.name = state.mbtData.name
        state.attributesTem.description = state.mbtData.description
      if(state.mbtData.attributes.codegen_script.length > 0){
        state.attributesTem.condegen_script = state.mbtData.attributes.codegen_script
        state.attributesTem.condegen_text = state.mbtData.attributes.codegen_text
      }
      return state.attributesTem;
      
      }else{
        if(state.attributesTem._id.length > 0){
          return state.attributesTem
        }
      }
      
    }
  },
  actions: {
    // 获取后台所有的mbt数据
    async getMbtmodel(id:any){
      let res= await request.get(`${realMBTUrl}/${id}`)
        this.mbtData={...JSON.parse(JSON.stringify(res))}
        if(this.mbtData._id.length == 0 && res.attributesTem._id.lenght > 0){
          this.attributesTem = {...res.attributesTem}
        }
        
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
