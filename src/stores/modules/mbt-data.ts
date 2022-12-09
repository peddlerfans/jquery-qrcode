import { defineStore } from 'pinia'

interface MbtData {
    allData: any,
    editingPrimaryAw: {
        data: any,
        schema: any
    },
    editingExpectedAw: {
        data: any,
        schema: any
    },
    mbtMeta: {
        detail: any,
        customKeys: Array<string>
    }
}

export const MbtData = defineStore({
    id: 'MbtData',
    state: (): MbtData => ({
        allData: null,
        editingPrimaryAw: {
            data: null,
            schema: null
        },
        editingExpectedAw: {
            data: null,
            schema: null
        },
        mbtMeta: {
            detail: null,
            customKeys: []
        }
    }),
    getters: {
        getAllData: state => state.allData,
        getMetaData: state => state.mbtMeta,
        getPrimaryAw: state => state.editingPrimaryAw,
        getDataPoolTableColumns: state => state.allData?.dataDefinition?.data?.tableColumns || []
    },
    actions: {
        setAllData(data: any) {
            this.allData = data
        },
        setEditingPrimaryAw(data: any, key?: string) {
            if (!key) this.editingPrimaryAw = data
            else {
                // @ts-ignore
                this.editingPrimaryAw[key] = data
            }
        },
        setEditingExpectedAw(data: any) {
            this.editingExpectedAw = data
        },
        setMetaData(data: any, key?: string) {
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