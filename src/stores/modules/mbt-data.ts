import { defineStore } from 'pinia'
import _ from "lodash";
import { generateSchema } from "@/utils/jsonschemaform";
import InputSelectItem from "@/components/basic/itea-schema-item/input-select-item.vue";
import ConditionItem from '@/components/basic/itea-schema-item/condition-item.vue'

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
        aw: any,
        isAssert?: boolean
        assertDesc?: string
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
    ifsaveMbt: boolean,
    isUpdataAw: boolean
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
        ifsaveMbt: false,
        isUpdataAw: false
    }),
    getters: {
        getAllData: state => state.allData,
        getMetaData: state => state.mbtMeta,
        getPrimaryAw: state => state.editingPrimaryAw,
        getPrimaryAwSchema: state => {
            const row = state.editingPrimaryAw.aw
            if (!row) return false
            // @ts-ignore
            return state.handleSchema(row, '1')
        },
        getPrimaryAwData: state => state.editingPrimaryAw.aw,
        getPrimaryAwSchemaValue: state => state.editingPrimaryAw.data,
        getExpectedAw: state => state.editingExpectedAw,
        getExpectedAwSchema: state => {
            const row = state.editingExpectedAw.aw
            if (!row) return false
            // @ts-ignore
            return state.handleSchema(row, '2')
        },
        getExpectedAwData: state => state.editingExpectedAw.aw,
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
        getifsaveMbt: state => state.ifsaveMbt,
        getUpdateAw: state => state.isUpdataAw
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
        setIfsaveMbt(data: boolean) {
            this.ifsaveMbt = data
        },
        // params: type '1': primary  '2': expected
        handleSchema(row: any, type: string) {
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
            if (row.returnType && type === '1') {
                Object.assign(schema.properties, {
                    variable: {
                        title: '返回变量名',
                        type: 'string'
                    }
                })
            }
            console.log(schema)
            // @ts-ignore
            return this.data2schema(schema, {}, type)
        },
        data2schema(awSchema: any, uiSchema: any, type: string) {
            // 获取属性里面可自定义的表单项
            let customInSchema: any = this.getCustomItems(awSchema)
            customInSchema.forEach((a: any) => {
                let prop = awSchema.properties
                let options: Array<any> = []
                /**
                 * 相关组件的传参
                 * SUT 类型
                 * condition 类型
                 * 默认其他
                 * */
                switch (a.type) {
                    case 'SUT': {
                        options = this.getDataPoolResource.map((b: any) => {
                            return {
                                value: `{{${b.alias}}}`,
                                label: b.alias
                            }
                        })
                        if (uiSchema) {
                            uiSchema[a.title] = {
                                "ui:widget": InputSelectItem,
                                "ui:options": options
                            }
                        }
                        a.type = 'string'
                        break
                    }
                    case 'condition': {
                        const options = this.getAwParamsOption(type, a.title)
                        if (uiSchema) {
                            uiSchema[a.title] = {
                                "ui:widget": type === '2' ? ConditionItem : InputSelectItem,
                                "ui:options": options,
                                "ui:rulesData": [{
                                    relation: 'AND',
                                    id: 1,
                                    conditions: [
                                        {
                                            name: '',
                                            operator: '',
                                            value: undefined,
                                            selectvalues: 'AND',
                                        },
                                    ],
                                    children: [],
                                }]
                            }
                        }
                        a.type = 'string'
                        break
                    }
                    default: {
                        options = this.getAwParamsOption(type, a.title)
                        if (uiSchema) {
                            uiSchema[a.title] = {
                                "ui:widget": InputSelectItem,
                                "ui:options": options
                            }
                        }
                        break
                    }
                }
                if (prop[a.title]?.custom) {
                    // SUT 类型做标记
                    let isSutType = a.type === 'SUT' || prop[a.title].AWType === 'SUT'
                    prop[a.title] = {
                        "title": a.title,
                        "type": "string",
                        "patternProperties": false,
                        "AWType": isSutType ? 'SUT' : 'string'
                    }
                }
            })
            return {
                schema: awSchema,
                uiSchema
            }
        },
        // 获取 schema.properties 里面自定义编辑的元素
        getCustomItems(awSchema: any) {
            let arr: any = []
            for (let key in awSchema.properties) {
                const tar = awSchema.properties[key]
                if (!tar.hasOwnProperty('ui:hidden') && !tar.hasOwnProperty('readOnly') && tar.title !== '返回变量名') {
                    arr.push(tar)
                }
            }
            return arr
        },
        setUpdateAw(value: boolean) {
            this.isUpdataAw = value
        },
        /**
         * 可选参数名，包括：
         * 自身设置的枚举值
         * Data Pool 的数据
         * 返回变量名
         * */
        getAwParamsOption(type: string, title: string) {
            const res: Array<any> = []
            let aw: any
            let options: Array<any> = []
            // 自身枚举值
            if (type === '1') {
                aw = this.getPrimaryAwData
            } else if (type === '2') {
                aw = this.getExpectedAwData
            }
            if (aw) {
                options = (aw?.params || []).filter((a: any) => a.name === title)
                options = options[0]?.enum || []
                // 枚举值无 type 类型，默认返回 string
                options = options.map((a: any) => {
                    return {
                        label: a,
                        value: a,
                        type: 'string'
                    }
                })
            }
            res.push({
                label: '枚举值',
                options
            })
            // Data Pool 数据
            res.push({
                label: 'Data Pool',
                // 目前 dynamic 的数据类型未返回，而 static 和 directly 没有注定类型，默认全返回 string
                options: this.getDataPoolTableColumns.map((a: any) => {
                    return {
                        value: `{{${a.title}}}`,
                        label: a.title
                    }
                }).filter((b: any) => b.label !== 'action' && b.label !== 'key')
            })
            // 返回变量名
            res.push({
                label: '返回变量名',
                options: this.getAllCustomVar()
            })
            return res.filter((a: any) => a.options.length)
        },
        // 获取当前模型所有带有 变量 属性并有 值 的数据
        // 只有 aw 版本为 version 3.0 以上才支持
        getAllCustomVar () {
            const cell = this.getShowData
            if (_.isEmpty(cell)) return []
            let arr = cell.graph.getCells()
            arr = arr.filter((a: any) => a.attributes.type === 'itea.mbt.test.MBTAW')
            let temp: Array<any> = []
            arr.forEach((b: any) => {
                let type = b.attributes.prop?.custom?.step?.aw?.returnType
                if (Array.isArray(type)) type = type[0] || ''
                const schemaVal = b.attributes.prop?.custom?.step?.data
                if (schemaVal?.variable) {
                    temp.push({
                        label: schemaVal.variable,
                        value: `{{{${schemaVal.variable}}}`,
                        type: type ? type : 'string'
                    })
                }
            })
            return temp
        },
        hasCondition() {
            // @ts-ignore
            const aw = this.getExpectedAwData
            if (!aw?.params?.length) return false
            return aw.params.some((b: any) => b.type === 'condition')
        }
    }
})


// 高亮提示完后要清理，label要转成rulesData（其实后台只需要存入label，rulesData都是

// {
//     "type": "Program",
//     "body": [
//        {
//           "type": "ExpressionStatement",
//           "expression": {
//              "type": "LogicalExpression",
//              "operator": "OR",
//              "conditionleft": {
//                 "type": "LogicalExpression",
//                 "operator": "OR",
//                 "conditionleft": {
//                    "type": "LogicalExpression",
//                    "operator": "AND",
//                    "conditionleft": {
//                       "type": "LogicalExpression",
//                       "operator": "AND",
//                       "conditionleft": {
//                          "type": "BinaryExpression",
//                          "operator": "==",
//                          "left": {
//                             "type": "Identifier",
//                             "name": "LeftRightMove"
//                          },
//                          "right": {
//                             "type": "Literal",
//                             "value": "-20°"
//                          }
//                       },
//                       "conditionright": {
//                          "type": "BinaryExpression",
//                          "operator": "==",
//                          "left": {
//                             "type": "Identifier",
//                             "name": "ExceptResult"
//                          },
//                          "right": {
//                             "type": "Literal",
//                             "value": "65537"
//                          }
//                       }
//                    },
//                    "conditionright": {
//                       "type": "BinaryExpression",
//                       "operator": "==",
//                       "left": {
//                          "type": "Identifier",
//                          "name": "is_support"
//                       },
//                       "right": {
//                          "type": "Literal",
//                          "value": "False"
//                       }
//                    }
//                 },
//                 "conditionright": {
//                    "type": "BinaryExpression",
//                    "operator": "==",
//                    "left": {
//                       "type": "Identifier",
//                       "name": "is_explorer"
//                    },
//                    "right": {
//                       "type": "Literal",
//                       "value": "False"
//                    }
//                 }
//              },
//              "conditionright": {
//                 "type": "LogicalExpression",
//                 "operator": "AND",
//                 "conditionleft": {
//                    "type": "BinaryExpression",
//                    "operator": "==",
//                    "left": {
//                       "type": "Identifier",
//                       "name": "ExceptResult"
//                    },
//                    "right": {
//                       "type": "Literal",
//                       "value": "null"
//                    }
//                 },
//                 "conditionright": {
//                    "type": "LogicalExpression",
//                    "operator": "AND",
//                    "conditionleft": {
//                       "type": "BinaryExpression",
//                       "operator": "==",
//                       "left": {
//                          "type": "Identifier",
//                          "name": "DownUpMove"
//                       },
//                       "right": {
//                          "type": "Literal",
//                          "value": "-20°"
//                       }
//                    },
//                    "conditionright": {
//                       "type": "BinaryExpression",
//                       "operator": "==",
//                       "left": {
//                          "type": "Identifier",
//                          "name": "Brightness"
//                       },
//                       "right": {
//                          "type": "Literal",
//                          "value": "1000lux"
//                       }
//                    }
//                 }
//              }
//           }
//        }
//     ]
//  }
