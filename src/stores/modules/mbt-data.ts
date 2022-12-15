import { defineStore } from 'pinia'

interface MbtData {
    allData: any,
    editingPrimaryAw: {
        data: any,
        schema: any,
        uiParams: any,
    },
    editingExpectedAw: {
        data: any,
        schema: any,
        uiParams: any
    },
    expectedTableRow: any
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
            schema: null,
            uiParams: null
        },
        editingExpectedAw: {
            data: null,
            schema: null,
            uiParams: null
        },
        mbtMeta: {
            detail: null,
            customKeys: []
        },
        expectedTableRow: {}
    }),
    getters: {
        getAllData: state => state.allData,
        getMetaData: state => state.mbtMeta,
        getPrimaryAw: state => state.editingPrimaryAw,
        getExpectedAw: state => state.editingExpectedAw,
        getDataPoolTableColumns: state => state.allData?.dataDefinition?.data?.tableColumns || [],
        getExpectTableRow: state => state.expectedTableRow
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
        setEditingExpectedAw(data: any, key?: string) {
            if (!key) this.editingExpectedAw = data
            else {
                // @ts-ignore
                this.editingExpectedAw[key] = data
            }
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
        },
        setExpectedTableRow(row: any) {
            this.expectedTableRow = row
        },
        resetEditingExpectedAw() {
            this.editingPrimaryAw.data = null
            this.editingPrimaryAw.schema = null
            this.editingPrimaryAw.uiParams = null
        }
    }
})
