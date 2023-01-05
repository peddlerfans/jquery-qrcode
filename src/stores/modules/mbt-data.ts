import { defineStore } from 'pinia'
import _ from "lodash";
import {generateSchema} from "@/utils/jsonschemaform";
import schemaItem from "@/components/basic/itea-schema-item/input-select-item.vue";

const defaultAWSchema = {
    title: "AW",
    type: "object",
    description: '',
    properties: {
        _id: {
            type: "string",
            "ui:hidden": true,
            required: true,
        }
    }
}

interface MbtData {
    allData: any,
    editingPrimaryAw: {
        data: any,
        schema: any,
        uiParams: any,
        aw: any
    },
    editingExpectedAw: {
        data: any,
        schema: any,
        uiParams: any,
        aw: any
    },
    expectedTableRow: any
    mbtMeta: {
        detail: any,
        customKeys: Array<string>
    }
    LinkData: {
        linkSchemaValue: any
        rulesData: any,
        description: string
    },
    groupData: {
        schema: any,
        data: any,
        description: string,
    },
    sectionData: any,
    awDescription: string,
    showSchema: boolean
    showData: any
    ifsaveMbt:boolean
}

export const MbtData = defineStore({
    id: 'MbtData',
    state: (): MbtData => ({
        allData: {
            dataDefinition: {
                data: {}
            }
        },
        editingPrimaryAw: {
            data: null,
            schema: null,
            uiParams: null,
            aw: null
        },
        editingExpectedAw: {
            data: null,
            schema: null,
            uiParams: null,
            aw: null
        },
        mbtMeta: {
            detail: null,
            customKeys: []
        },
        LinkData: {
            linkSchemaValue: null,
            rulesData: null,
            description: ''
        },
        groupData: {
            schema: null,
            data: null,
            description: '',
        },
        sectionData: {},
        expectedTableRow: {},
        awDescription: '',
        showSchema: false,
        showData: {},
        ifsaveMbt:false
    }),
    getters: {
        getAllData: state => state.allData,
        getMetaData: state => state.mbtMeta,
        getPrimaryAw: state => state.editingPrimaryAw,
        getPrimaryAwSchema: state => {
            const row = state.editingPrimaryAw.aw
            if (!row) return false
            // @ts-ignore
            return state.handleSchema(row)
        },
        getPrimaryAwSchemaValue: state => state.editingPrimaryAw.data,
        getExpectedAw: state => state.editingExpectedAw,
        getExpectedAwSchema: state => {
            const row = state.editingExpectedAw.aw
            if (!row) return false
            // @ts-ignore
            return state.handleSchema(row)
        },
        getExpectedAwSchemaValue: state => state.editingExpectedAw.data,
        getDataPoolTableColumns: state => state.allData?.dataDefinition?.data?.tableColumns || [],
        getDataPoolResource: state => state.allData?.dataDefinition?.resources || [],
        getDataPoolTableData: state => state.allData?.dataDefinition?.data?.tableData || [],
        getExpectTableRow: state => state.expectedTableRow,
        getLinkData: state => state.LinkData,
        getGroupData: state => state.groupData,
        getSectionData: state => state.sectionData,
        getDescription: state => state.awDescription,
        getVisible: state => state.showSchema,
        getShowData: state => state.showData,
        getifsaveMbt :state => state.ifsaveMbt
    },
    actions: {
        setAllData(data: any) {
            this.allData = data
        },
        setDescription(str: string) {
            this.awDescription = str
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
        setDataDefinition(data: any) {
            this.allData.dataDefinition.data = data
        },
        setLinkData(data: any, key: string) {
            if (!key) this.LinkData = data
            else {
                // @ts-ignore
                this.LinkData[key] = data
            }
        },
        setGroupData(data: any, key?: string) {
            if (!key) this.groupData = data
            else {
                // @ts-ignore
                this.groupData[key] = data
            }
        },
        setSectionData(data: any, key?: string) {
            if (!key) this.sectionData = data
            else {
                // @ts-ignore
                this.sectionData[key] = data
            }
        },
        resetEditingExpectedAw() {
            this.showData = {}
            this.awDescription = ''
        },
        setVisible(flag: boolean) {
            this.showSchema = flag
        },
        setData(data: any) {
            this.showData = data
        },
        setIfsaveMbt(data:boolean){
            this.ifsaveMbt = data
        },
        handleSchema (row: any) {
            let schema = _.cloneDeep(defaultAWSchema)
            schema.title = row.name
            schema.description = row.description
            if (_.isArray(row.params) && row.params.length > 0) {
                let appEndedSchema = generateSchema(row.params)
                appEndedSchema.forEach((a: any) => {
                    Object.keys(a).forEach((b: any) => {
                        a[b].custom = 'awParams'
                    })
                })
                appEndedSchema.forEach((field: any) => {
                    Object.assign(schema.properties, field)
                })
            }
            // schema添加path
            Object.assign(schema.properties, {
                    path: {
                        title: 'path',
                        type: 'string',
                        readOnly:'true'
                    }
                }
            )
            // @ts-ignore
            return this.data2schema(schema, {})
        },
        data2schema (awSchema: any, uiSchema?: any) {
            // 可选参数名
            let enumList: Array<any> = []
            enumList = this.getDataPoolTableColumns.map((a: any) => {
                return {
                    value: `{{${a.title}}}`,
                    label: a.title
                }
            })
            let sutEnumList: Array<any> = []
            sutEnumList = this.getDataPoolResource.map((a: any) => {
                return {
                    value: `{{${a.alias}}}`,
                    label: a.alias
                }
            })
            // 获取属性里面可自定义的表单项
            let customInSchema: any = this.getCustomItems(awSchema)
            customInSchema.forEach((a: any) => {
                let prop = awSchema.properties
                const isSutType = a.type === 'SUT' || prop[a.title].AWType === 'SUT'
                prop[a.title] = {
                    "title": a.title,
                    "type": "string",
                    "patternProperties": false,
                    "AWType": isSutType ? 'SUT' : 'string'
                }
                if (uiSchema) {
                    uiSchema[a.title] = {
                        "ui:widget": schemaItem,
                        "ui:options": isSutType ? sutEnumList : enumList
                    }
                }
            })
            return {
                schema: awSchema,
                uiSchema
            }
        },
        // 获取 schema.properties 里面自定义编辑的元素
        getCustomItems (awSchema: any) {
            let arr: any = []
            for (let key in awSchema.properties) {
                const tar = awSchema.properties[key]
                if (!tar.hasOwnProperty('ui:hidden') && !tar.hasOwnProperty('readOnly') && tar.title !== '变量') {
                    arr.push(tar)
                }
            }
            return arr
        }
    }
})
