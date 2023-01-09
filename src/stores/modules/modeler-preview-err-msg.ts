import { defineStore } from 'pinia'

interface toolState {
    joinObj: any,
    visible: boolean,
    errList: any,
    check:boolean
    errmsg :any
    index : number
}

export const errTipTool = defineStore({
    id: 'err-tip-tool',
    state: (): toolState => ({
        joinObj: null,
        visible: false,
        errList: [],
        check:false,
        errmsg :null,
        index: 0
    }),
    getters: {
        getVisible: state => state.visible,
        getErrList: state => state.errList,
        getLength: state => state.errList.length,
        getCheck: state => state.check,
        getErrmsg: state => state.errmsg,
        getIndex: state => state.index
        },
    actions: {
        setErrList(arr: any) {
            this.errList = arr
        },
        setVisible(value: boolean) {
            this.visible = value
        },
        setCheck(value: boolean){
            this.check = value
        },
        setErrmsg(value :any){
            this.errmsg = value
        },
        setIndex(value: number){
            this.index = value
        }
    }
})

