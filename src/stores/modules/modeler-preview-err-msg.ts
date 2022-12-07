import { defineStore } from 'pinia'

interface toolState {
    joinObj: any,
    visible: boolean,
    errList: [
        err?: string,
        reason?: string
    ]
}

export const errTipTool = defineStore({
    id: 'err-tip-tool',
    state: (): toolState => ({
        joinObj: null,
        visible: false,
        errList: []
    }),
    getters: {
        getVisible: state => state.visible,
        getErrList: state => state.errList,
        getLength: state => state.errList.length
    },
    actions: {
        setErrList(arr: any) {
            this.errList = arr
        },
        setVisible(value: boolean) {
            this.visible = value
        }
    }
})