import { defineStore } from "pinia"
// import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"
import { COMPARISON_BINARY_OPERATORS } from "@babel/types"

interface State {
  awname?:string,
  aw?:Stores.aw
}
export const awStore = defineStore('aw', {
  state:  ():State => {
    return {
      awname:'',
      aw: {
        _id:'',
        name:'',
        description:''
      }
    }
    
  }
  ,
  getters:{
    getAw:(state) => state
  },
  actions: {
    
    getAwInfo(state:Stores.aw): Stores.aw {
      // console.log('get aw in store:',state);
      return state
      
    },
    // getAwByName(awname:string){
    //   if(awname == state.name){
    //     return state

    //   }
    // },
    setAWInfo(newstate:Stores.aw):Stores.aw {
      // console.log('set aw store:',newstate)
      return newstate
    }
  }
})