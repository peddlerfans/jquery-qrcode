import { defineStore } from 'pinia'

interface MbtData {
    editingPrimaryAw: any,
    editingExpectedAw: any,
    mbtMeta: {
        detail: any,
        customKeys: Array<string>
    }
}

export const MbtData = defineStore({
    id: 'MbtData',
    state: (): MbtData => ({
        editingPrimaryAw: null,
        editingExpectedAw: null,
        mbtMeta: {
            detail: null,
            customKeys: []
        }
    }),
    getters: {
        getMetaData: state => state.mbtMeta
    },
    actions: {
        setEditingPrimaryAw(data: any) {
            this.editingPrimaryAw = data
        },
        setEditingExpectedAw(data: any) {
            this.editingExpectedAw = data
        },
        setMetaData(data: any, key: string) {
            if (!key) this.mbtMeta = data
            else {
                // @ts-ignore
                this.mbtMeta[key] = data
            }
        },
        checkMetaFormItemIsCustom(str: string, val: any) {
            let temp = this.mbtMeta.detail.filter((a: any) => a.description === str || a.name === str)[0]
            if (!temp) return false
            let enums = temp.enum
            return !enums.includes(val)
        }
    }
})